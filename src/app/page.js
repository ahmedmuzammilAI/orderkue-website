import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KueBot from "@/components/KueBot";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-52 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-200 via-sky-200 to-violet-200 blur-3xl opacity-70" />
      </div>

      <Navbar />

      <main id="top">
        <Hero />
        <KueBot />
        <Features />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}