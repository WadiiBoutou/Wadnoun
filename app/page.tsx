import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { HomeContent } from "../components/HomeContent";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <HomeContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
