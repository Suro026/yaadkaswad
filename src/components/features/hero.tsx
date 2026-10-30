'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useLocale } from '@/i18n/locale';
import { useUi } from '@/lib/ui-store';
import { AnchorLink } from '@/components/motion/anchor-link';
import { SplitHeading } from '@/components/motion/split-heading';
import { useMotion } from '@/components/motion/motion-provider';
import { PinCheck } from './pin-check';

const FRONT = [0, 45, 90, 135, 180, 225, 270, 315];
const BACK = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

export function Hero() {
  const { t } = useLocale();
  const { motionOK, fine } = useMotion();
  const introDone = useUi((s) => s.introDone);
  const root = useRef<HTMLElement>(null);

  /* Entry choreography. Initial states are set while the intro plays, then released. */
  useGSAP(
    () => {
      if (!motionOK) return;
      gsap.set('.hero-rv:not(.hero__flower)', { y: 18 });
      gsap.set('.hero__flower', { scale: 0.55, rotation: -35, transformOrigin: '50% 50%' });
      if (!introDone) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to('.hero__flower', { scale: 1, rotation: 0, opacity: 1, duration: 1.5 }, 0)
        .to('.hero-rv:not(.hero__flower)', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35);
    },
    { scope: root, dependencies: [motionOK, introDone] },
  );

  /* Gentle pointer parallax (pointer-fine only). */
  useGSAP(
    () => {
      const el = root.current;
      if (!motionOK || !fine || !el) return;
      const flower = el.querySelector<SVGSVGElement>('#heroFlower');
      const rings = el.querySelector<SVGSVGElement>('.hero__rings svg');
      if (!flower || !rings) return;
      const fx = gsap.quickTo(flower, 'x', { duration: 0.9, ease: 'power3' });
      const fy = gsap.quickTo(flower, 'y', { duration: 0.9, ease: 'power3' });
      const rx = gsap.quickTo(rings, 'x', { duration: 1.2, ease: 'power3' });
      const ry = gsap.quickTo(rings, 'y', { duration: 1.2, ease: 'power3' });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        fx(nx * -28);
        fy(ny * -20);
        rx(nx * 14);
        ry(ny * 10);
      };
      el.addEventListener('pointermove', onMove);
      return () => el.removeEventListener('pointermove', onMove);
    },
    { scope: root, dependencies: [motionOK, fine] },
  );

  return (
    <section ref={root} className="hero" id="top" aria-labelledby="heroTitle">
      <div className="hero__art" aria-hidden="true">
        <div className="hero__rings">
          <svg viewBox="-500 -500 1000 1000">
            <circle r="470" fill="none" stroke="#d9a441" strokeOpacity=".16" strokeDasharray="2 10" strokeLinecap="round" strokeWidth="2" />
            <circle r="400" fill="none" stroke="#d9a441" strokeOpacity=".12" strokeWidth="1" />
            <circle r="330" fill="none" stroke="#d9a441" strokeOpacity=".2" strokeDasharray="1 7" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
        <div className="hero__flower hero-rv">
          <svg viewBox="0 0 800 800" id="heroFlower">
            <g transform="translate(400 400)">
              <g fill="#e8c56e">
                {BACK.map((r) => (
                  <use key={r} href="#petal-b" transform={`rotate(${r})`} />
                ))}
              </g>
              <g fill="#d9a441">
                {FRONT.map((r) => (
                  <use key={r} href="#petal" transform={`rotate(${r})`} />
                ))}
              </g>
              <circle r="44" fill="#2b0a10" />
            </g>
          </svg>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <span key={n} className={`spark s${n}`} />
        ))}
      </div>

      <div className="hero__body container">
        <p className="hero__tag hero-rv">{t('hero.tag')}</p>
        <SplitHeading as="h1" id="heroTitle" className="hero__title" hero>
          {t('hero.title')} <span className="gold">{t('hero.titleAccent')}</span>
        </SplitHeading>
        <p className="hero__sub hero-rv">{t('hero.sub')}</p>
        <div className="hero__cta hero-rv">
          <AnchorLink className="btn btn--gold" href="#journey" magnetic data-cursor="link">
            {t('hero.cta1')}
          </AnchorLink>
          <AnchorLink className="btn btn--ghost" href="#notify" magnetic data-cursor="link">
            {t('hero.cta2')}
          </AnchorLink>
        </div>
        <PinCheck variant="hero" inputId="heroPin" />
      </div>
      <p className="hero__note container hero-rv">{t('hero.note')}</p>
    </section>
  );
}
