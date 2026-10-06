import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Hook } from "@/components/hook";
import { WhyTriumph } from "@/components/why-triumph";
import { Opportunity } from "@/components/opportunity";
import { DestinationsMarquee } from "@/components/destinations-marquee";
import { WhoItsFor } from "@/components/who-its-for";
import { Emotional } from "@/components/emotional";
import { HowItWorks } from "@/components/how-it-works";
import { LeadForm } from "@/components/lead-form";
import { FinalCta, Footer } from "@/components/final-cta";
import { MobileCta } from "@/components/mobile-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Hook />
        <WhyTriumph />
        <Opportunity />
        <DestinationsMarquee />
        <WhoItsFor />
        <Emotional />
        <HowItWorks />
        <LeadForm />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
