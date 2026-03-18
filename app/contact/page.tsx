import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { ContactContent } from "../../components/ContactContent";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ContactContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
