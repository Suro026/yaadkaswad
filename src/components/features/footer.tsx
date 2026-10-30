'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { useLocale } from '@/i18n/locale';
import { AnchorLink } from '@/components/motion/anchor-link';
import { useMotion } from '@/components/motion/motion-provider';
import { Logo } from '@/components/brand/sprite';

export function Footer() {
  const { t, lang, setLang } = useLocale();
  const { ready, motionOK, reducedByChoice, osReduced, toggleReduce } = useMotion();
  const word = useRef<HTMLSpanElement>(null);

  /* Wordmark letters rise when the footer scrolls in. */
  useGSAP(
    () => {
      if (!ready || !motionOK || !word.current) return;
      const split = SplitText.create(word.current, {
        type: 'chars',
        mask: 'chars',
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 105,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.04,
            scrollTrigger: { trigger: '.footer__giant', start: 'top 95%', once: true },
          });
        },
      });
      return () => split.revert();
    },
    { dependencies: [ready, motionOK] },
  );

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <AnchorLink className="logo logo--lg" href="#top" aria-label="Yaad Ki Sawad, back to top">
            <Logo />
          </AnchorLink>
          <p className="footer__tag">{t('footer.tag')}</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <AnchorLink href="#journey">{t('nav.states')}</AnchorLink>
          <AnchorLink href="#festival">{t('nav.collections')}</AnchorLink>
          <AnchorLink href="#makers">{t('nav.makers')}</AnchorLink>
          <AnchorLink href="#how">{t('nav.how')}</AnchorLink>
          <AnchorLink href="#notify">{t('notify.btn')}</AnchorLink>
        </nav>
        <div className="footer__prefs">
          <button type="button" className="linkbtn" onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}>
            {t('footer.lang')}
          </button>
          <button
            type="button"
            className="linkbtn"
            aria-pressed={reducedByChoice || osReduced}
            title={osReduced ? 'Your device is already set to reduce motion' : undefined}
            onClick={toggleReduce}
          >
            {t('footer.motion')}
          </button>
        </div>
      </div>
      <p className="container footer__legal">
        Company, FSSAI and grievance-officer details, plus Terms, Privacy, Shipping and Refund policies, are published here before launch.
      </p>
      <div className="footer__giant" aria-hidden="true">
        <span ref={word}>Yaad Ki Sawad</span>
      </div>
    </footer>
  );
}
