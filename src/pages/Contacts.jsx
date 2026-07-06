import ContactList from "../components/ContactList.jsx";
import PageShell from "../components/PageShell.jsx";

export default function Contacts() {
  return (
    <PageShell eyebrow="Find Me" title="Contacts">
      <ContactList />
    </PageShell>
  );
}
