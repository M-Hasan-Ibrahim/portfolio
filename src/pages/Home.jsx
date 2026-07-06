import { useEffect, useState } from "react";
import heroBackground from "../assets/images/profile_background.png";
import profileImage from "../assets/images/profile_picture.jpeg";
import { profile } from "../data/profile.js";
import "../styles/Home.css";

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
  const age = calculateAge(profile.birthDate);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen]);

  return (
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
      </div>

      {isProfileOpen && (
        <div
          aria-modal="true"
          className="profile-modal"
          onClick={() => setIsProfileOpen(false)}
          role="dialog"
        >
          <div className="profile-modal__content" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Close profile picture"
              className="profile-modal__close"
              onClick={() => setIsProfileOpen(false)}
              type="button"
            >
              x
            </button>
            <img alt="Profile enlarged" src={profileImage} />
          </div>
        </div>
      )}
    </section>
  );
}