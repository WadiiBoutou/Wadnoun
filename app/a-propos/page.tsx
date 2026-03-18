import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { AboutContent } from "../../components/AboutContent";
import { TurbineSequence } from "../../components/TurbineSequence";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <TurbineSequence />
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
