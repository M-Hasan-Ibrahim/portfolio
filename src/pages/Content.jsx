import { useEffect, useMemo, useState } from "react";
import CvViewer from "../components/CvViewer.jsx";
import PageShell from "../components/PageShell.jsx";
import contentPosts from "../data/contentPosts.json";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const formatDate = (dateValue) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));

function PostMedia({ post }) {
  return post.image ? (
    <img alt={post.title} className="content-post__image" src={asset(post.image)} />
  ) : (
    <div className="content-post__placeholder">Text post</div>
  );
}

function PostBody({ post }) {
  return (
    <div className="content-post__body">
      <div className="content-post__meta">
        <span>{formatDate(post.date)}</span>
        {post.clickable && <strong>Open</strong>}
      </div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default function Content() {
  const posts = useMemo(
    () => [...contentPosts].sort((first, second) => new Date(second.date) - new Date(first.date)),
    [],
  );
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPost]);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const handleClickablePostKeyDown = (event, post) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPost(post);
    }
  };

  return (
    <PageShell eyebrow="Personal Feed" title="Content">
      <section className="content-feed" aria-label="Content posts">
        {posts.map((post) =>
          post.clickable ? (
            <article
              className="content-post content-post--clickable"
              key={post.id}
              onClick={() => openPost(post)}
              onKeyDown={(event) => handleClickablePostKeyDown(event, post)}
              role="button"
              tabIndex="0"
            >
              <PostMedia post={post} />
              <PostBody post={post} />
            </article>
          ) : (
            <article className="content-post" key={post.id}>
              <PostMedia post={post} />
              <PostBody post={post} />
            </article>
          ),
        )}
      </section>

      {selectedPost && (
        <div className="content-modal" onClick={() => setSelectedPost(null)} role="presentation">
          <section
            aria-labelledby="content-feature-title"
            aria-modal="true"
            className="content-feature"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="content-feature__header">
              <span>{formatDate(selectedPost.date)}</span>
              <button onClick={() => setSelectedPost(null)} type="button">
                Close
              </button>
            </div>
            <div className="content-feature__intro">
              <PostMedia post={selectedPost} />
              <div className="content-feature__copy">
                <h2 id="content-feature-title">{selectedPost.title}</h2>
                <p>{selectedPost.body}</p>
              </div>
            </div>
            {selectedPost.detailType === "cv" && (
              <div className="content-feature__cv">
                <CvViewer />
              </div>
            )}
          </section>
        </div>
      )}
    </PageShell>
  );
}
