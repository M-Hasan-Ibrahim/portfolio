import { useLayoutEffect } from "react";

/*
 * Scroll reveal
 * -------------
 * Any element with a `data-reveal` attribute starts hidden and springs into
 * place when it enters the viewport. Variants are chosen with the attribute
 * value (see the "Scroll reveal" section in global.css):
 *
 *   data-reveal="up" | "fade" | "zoom" | "left" | "right" | "backdrop"
 *
 * - Direction is picked from where the element sits on screen: items on the
 *   left fly in from the left, items on the right from the right, centred
 *   ones rise straight up. Scrolling back up, items drop in from above.
 * - Elements entering together (same frame) are staggered top-to-bottom,
 *   left-to-right, so grids and lists cascade in.
 * - With REPLAY_ON_REENTER, an element that fully leaves the screen resets,
 *   so it animates again every time you scroll back to it. Elements inside a
 *   container marked `data-reveal-once` skip this and animate a single time
 *   (used by the project pop-up).
 * - A MutationObserver picks up elements added later (route changes,
 *   filtered lists, modals, imperatively created nodes), so components only
 *   need to add the attribute.
 */

const REPLAY_ON_REENTER = true;

const REVEAL_SELECTOR = "[data-reveal]";
const ONCE_SELECTOR = "[data-reveal-once]";
const STAGGER_MS = 110;
const MAX_TOTAL_STAGGER_MS = 900;
// How far from the screen centre (as a fraction of its width) an element's
// centre must be before it counts as "left" or "right".
const SIDE_THRESHOLD = 0.08;

const byVisualOrder = (first, second) => {
  const firstBox = first.boundingClientRect;
  const secondBox = second.boundingClientRect;
  const topDifference = Math.round(firstBox.top) - Math.round(secondBox.top);

  return topDifference || firstBox.left - secondBox.left;
};

const sideOf = (box) => {
  const viewportWidth = window.innerWidth || 1;
  const offset = (box.left + box.width / 2 - viewportWidth / 2) / viewportWidth;

  if (offset < -SIDE_THRESHOLD) return -1;
  if (offset > SIDE_THRESHOLD) return 1;
  return 0;
};

export default function useScrollReveal() {
  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const rootElement = document.documentElement;
    rootElement.classList.add("reveal-enabled");

    // Triggers the entrance a little before the element is fully on screen.
    const enterObserver = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(byVisualOrder);
        const step =
          entering.length > 1
            ? Math.min(STAGGER_MS, MAX_TOTAL_STAGGER_MS / (entering.length - 1))
            : 0;

        entering.forEach((entry, index) => {
          const element = entry.target;
          const box = entry.boundingClientRect;
          const enteredFromAbove = box.top < (entry.rootBounds?.top ?? 0);

          enterObserver.unobserve(element);
          element.style.setProperty("--reveal-delay", `${Math.round(index * step)}ms`);
          element.style.setProperty("--reveal-side", String(sideOf(box)));
          element.style.setProperty("--reveal-dir", enteredFromAbove ? "-1" : "1");
          element.setAttribute("data-revealed", "");
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    // Resets an element once it is completely off screen, so it replays.
    const exitObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        if (entry.isIntersecting || !element.hasAttribute("data-revealed")) return;

        element.removeAttribute("data-revealed");
        enterObserver.observe(element);
      });
    });

    const watch = (element) => {
      if (!element.hasAttribute("data-revealed")) {
        enterObserver.observe(element);
      }
      // Anything inside a [data-reveal-once] container animates a single time.
      if (REPLAY_ON_REENTER && !element.closest(ONCE_SELECTOR)) {
        exitObserver.observe(element);
      }
    };

    const unwatch = (element) => {
      enterObserver.unobserve(element);
      exitObserver.unobserve(element);
    };

    const forEachRevealElement = (node, callback) => {
      if (!(node instanceof Element)) return;

      if (node.matches(REVEAL_SELECTOR)) callback(node);
      node.querySelectorAll(REVEAL_SELECTOR).forEach(callback);
    };

    forEachRevealElement(document.body, watch);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (!node.isConnected) forEachRevealElement(node, unwatch);
        });
        mutation.addedNodes.forEach((node) => forEachRevealElement(node, watch));
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      enterObserver.disconnect();
      exitObserver.disconnect();
      rootElement.classList.remove("reveal-enabled");
    };
  }, []);
}
