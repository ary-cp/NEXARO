import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import CaseStudies from '@/components/CaseStudies';
import FeatureShowcase from '@/components/FeatureShowcase';
import Performance from '@/components/Performance';
import LongTerm from '@/components/LongTerm';
import BentoFeatures from '@/components/BentoFeatures';
import Capabilities from '@/components/Capabilities';
import Integrations from '@/components/Integrations';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <CaseStudies />
        <FeatureShowcase />
        <Performance />
        <LongTerm />
        <BentoFeatures />
        <Capabilities />
        <Integrations />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
