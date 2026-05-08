import Hero from '@/components/landing/Hero';
import FeatureCards from '@/components/landing/FeatureCards';
import HowToUse from '@/components/landing/HowToUse';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import FAQ from '@/components/landing/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <HowToUse />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
