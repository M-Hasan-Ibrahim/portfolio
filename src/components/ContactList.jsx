import { contacts } from "../data/profile.js";

export default function ContactList() {
  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <a className="contact-item" href={contact.href} key={contact.label}>
          <span>{contact.label}</span>
          <strong>{contact.value}</strong>
        </a>
      ))}
    </div>
  );
}
