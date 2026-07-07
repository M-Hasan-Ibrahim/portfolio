import Home from "../pages/Home.jsx";
import Projects from "../pages/Projects.jsx";
import Courses from "../pages/Courses.jsx";
import Certificates from "../pages/Certificates.jsx";
import Contacts from "../pages/Contacts.jsx";
import Cv from "../pages/Cv.jsx";

const asset = (filePath) => `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/, "")}`;

export const routes = [
  {
    path: "/",
    label: "Home",
    description: "Start here with a quick introduction.",
    image: asset("assets/images/hero-background.png"),
    Component: Home,
  },
  {
    path: "/projects",
    label: "Projects",
    description: "Selected builds, experiments, and case studies.",
    image: asset("assets/images/hero-background.png"),
    Component: Projects,
  },
  {
    path: "/courses",
    label: "Courses",
    description: "Academic work and technical subjects taken.",
    image: asset("assets/images/profile-placeholder.png"),
    Component: Courses,
  },
  {
    path: "/certificates",
    label: "Certificates",
    description: "Verified credentials, badges, and training certificates.",
    image: asset("assets/images/profile-placeholder.png"),
    Component: Certificates,
  },
  {
    path: "/contacts",
    label: "Contacts",
    description: "Social links, email, and phone details.",
    image: asset("assets/images/hero-background.png"),
    Component: Contacts,
  },
  {
    path: "/cv",
    label: "CV",
    description: "Full resume preview as a PDF document.",
    image: asset("assets/images/profile-placeholder.png"),
    Component: Cv,
  },
];
