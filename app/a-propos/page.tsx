import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { AboutContent } from "../../components/AboutContent";
import { AboutHero } from "../../components/AboutHero";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
