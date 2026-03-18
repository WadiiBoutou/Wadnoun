import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { ServicesContent } from "../../components/ServicesContent";
import { LightbulbSequence } from "../../components/LightbulbSequence";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <LightbulbSequence />
      <ServicesContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
