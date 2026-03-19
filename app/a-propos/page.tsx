import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { AboutContent } from "../../components/AboutContent";
import { AboutHeroVideo } from "../../components/AboutHeroVideo";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHeroVideo />
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
