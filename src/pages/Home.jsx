import heroBackground from "../assets/images/hero-background.png";
import profileImage from "../assets/images/profile-placeholder.png";
import { profile } from "../data/profile.js";

export default function Home() {
  return (
    <section className="home-hero">
      <img alt="" className="home-hero__background" src={heroBackground} />
      <div className="home-hero__shade" />
      <div className="home-hero__content">
        <img alt="Profile placeholder" className="profile-photo" src={profileImage} />
        <p className="eyebrow">Portfolio</p>
        <h1>{profile.name}</h1>
        <p className="profession">{profile.profession}</p>
        <p className="summary">{profile.summary}</p>
      </div>
    </section>
  );
}
