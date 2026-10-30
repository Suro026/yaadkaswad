import { Hero } from '@/components/features/hero';
import { Marquee } from '@/components/motion/marquee';
import { IndiaJourney } from '@/components/map/india-journey';
import { StateRail } from '@/components/features/state-rail';
import { Festival } from '@/components/features/festival';
import { Makers } from '@/components/features/makers';
import { HowItWorks } from '@/components/features/how-it-works';
import { Promise as Principles } from '@/components/features/promise';
import { Notify } from '@/components/features/notify';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <IndiaJourney />
      <StateRail />
      <Festival />
      <Makers />
      <HowItWorks />
      <Principles />
      <Notify />
    </>
  );
}
