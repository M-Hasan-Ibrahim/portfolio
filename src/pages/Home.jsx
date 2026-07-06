import heroBackground from "../assets/images/hero-background.png";
import profileImage from "../assets/images/profile-placeholder.png";
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
  const age = calculateAge(profile.birthDate);

  return (
    <section className="home-hero">
      <img alt="" className="home-hero__background" src={heroBackground} />
      <div className="home-hero__shade" />

      <div className="home-hero__content">
        <img alt="Profile placeholder" className="profile-photo" src={profileImage} />

        <p className="eyebrow">{profile.location}</p>

        <h2>{profile.lastName}</h2>

        <div className="first-name-row">
          <h3>{profile.firstName}</h3>
          <span className="age">{age} years old</span>
        </div>

        <p className="profession">{profile.profession}</p>
        <p className="summary">{profile.summary}</p>
      </div>
    </section>
  );
}