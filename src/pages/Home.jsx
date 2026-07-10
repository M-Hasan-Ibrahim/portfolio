import { useEffect, useState } from "react";
import { profile } from "../data/data.js";
import "../styles/Home.css";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const heroBackground = asset("assets/images/profile_background.png");
const profileImage = asset("assets/images/profile_picture.jpeg");

const personalStatement = [
  "I am Mohamad Hassan Ibrahim, a Lebanese Software Engineer born in Lebanon on November 7, 2003. My academic journey started at the Lebanese University, Faculty of Engineering III, where I studied Telecommunication and Computer Engineering from 2021 to 2025. During those years, I built a strong foundation in software engineering, computer networks, telecommunications, programming, and problem-solving. I graduated with an average of 80/100, placing me among the top-ranked students in my class, which gave me the opportunity to join the double-degree program between the Lebanese University and Telecom Paris.",
  "In 2025, I moved to France to continue my studies at Telecom Paris. I first specialized in Signal Processing and Artificial Intelligence, as well as 3D and Interactive Systems, before moving toward Software Engineering. This path helped me explore different sides of technology: AI, interactive systems, graphics, full-stack development, and product-oriented engineering. Over time, I realized that what excites me most is not only the theory behind technology, but the moment when an idea becomes a real product that people can actually use.",
  "I respect research and enjoy working on research-oriented problems when they are useful or necessary, but I do not see myself as someone who wants to spend all his time in purely theoretical work. I am more motivated by building things that can be tested, improved, shipped, and used in real life. I like projects where the result is not just a document or a model, but something practical that helps people, saves time, improves an experience, or makes a difficult task easier.",
  "A common idea behind most of my work is reducing complexity. Whether I am building an AI-assisted application, designing an immersive VR interaction, developing a full-stack platform, or creating tools that help professionals work more efficiently, I try to make technology feel simple, calm, and useful. I believe good software should not make users feel lost. It should guide them naturally, support them quietly, and make them feel capable even if they have no technical background.",
  "I enjoy working across the full development process: understanding the problem, designing the solution, building the product, testing it, improving the user experience, and communicating the result clearly. I also enjoy collaboration because I like the energy of turning different ideas into one working solution. In many projects, I naturally find myself between the technical side and the human side: listening, explaining, organizing, and helping transform ideas into something concrete.",
  "Outside engineering, I am a very active person. I play tennis, basketball, swimming, handball, and football. In football, I usually play as a goalkeeper, which is basically the position where everyone remembers you only when something goes wrong - but I still love it. I enjoy the pressure, the quick reactions, and the feeling of being responsible for the last line of defense. I also love sports because they let me disconnect, compete, laugh, and reset my mind after long hours of work.",
  "I also enjoy long conversations about philosophical topics, especially the kind of topics that many people would probably call useless. I do not know why, but I find real pleasure in discussing strange questions about life, people, choices, motivation, and the way we think. Sometimes these conversations go nowhere, but for me that is part of the fun. They help me see things differently, and they remind me that people are much more interesting than any technology we build.",
  "What motivates me most is not only becoming a stronger engineer, but becoming someone who creates value for others. I want to build products that solve real problems, support the teams I work with, and make technology feel more human. My goal is to keep learning from experienced people, contribute seriously to meaningful projects, and eventually help build products that improve people's everyday lives.",
  "For me, success is not just about writing good code or using advanced tools. It is about leaving every project, every team, and every experience better than I found it.",
];

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;
}

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStatementOpen, setIsStatementOpen] = useState(false);
  const age = calculateAge(profile.birthDate);

  useEffect(() => {
    if (!isProfileOpen && !isStatementOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsStatementOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen, isStatementOpen]);

  return (
    <>
      <section className="home-hero">
        <img alt="" className="home-hero__background" src={heroBackground} />
        <div className="home-hero__shade" />

        <div className="home-hero__content">
          <button
            aria-label="Open profile picture"
            className="profile-photo-button"
            onClick={() => setIsProfileOpen(true)}
            type="button"
          >
            <img alt="Profile" className="profile-photo" src={profileImage} />
          </button>

          <p className="eyebrow">{profile.location}</p>

          <h3>{profile.lastName},</h3>

          <div className="first-name-row">
            <h4>{profile.firstName} -</h4>
            <span className="age">{age}</span>
          </div>

          <p className="profession">{profile.profession}</p>
          <p className="summary">{profile.summary}</p>

          <button
            className="personal-statement-link"
            onClick={() => setIsStatementOpen(true)}
            type="button"
          >
            Personal Statement
          </button>
        </div>

        {isProfileOpen && (
          <div
            aria-modal="true"
            className="profile-modal"
            onClick={() => setIsProfileOpen(false)}
            role="dialog"
          >
            <div className="profile-modal__content" onClick={(event) => event.stopPropagation()}>
              <img alt="Profile enlarged" src={profileImage} />
            </div>
          </div>
        )}
      </section>

      {isStatementOpen && (
        <div
          aria-labelledby="personal-statement-title"
          aria-modal="true"
          className="personal-statement-modal"
          onClick={() => setIsStatementOpen(false)}
          role="dialog"
        >
          <div className="personal-statement-modal__content" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Close personal statement"
              className="personal-statement-modal__close"
              onClick={() => setIsStatementOpen(false)}
              type="button"
            >
              x
            </button>
            <p className="eyebrow">About me</p>
            <h2 id="personal-statement-title">Building Technology That Feels Human</h2>
            <div className="personal-statement-modal__body">
              {personalStatement.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
