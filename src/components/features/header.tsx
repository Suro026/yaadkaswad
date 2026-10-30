'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useLocale } from '@/i18n/locale';
import { useUi } from '@/lib/ui-store';
import { AnchorLink } from '@/components/motion/anchor-link';
import { useMotion } from '@/components/motion/motion-provider';
import { Logo } from '@/components/brand/sprite';

function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  const { motionOK } = useMotion();
  useGSAP(
    () => {
      if (!motionOK || !bar.current) return;
      gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
    },
    { dependencies: [motionOK] },
  );
  return (
    <div className="progress" aria-hidden="true">
      <span ref={bar} className="progress__bar" />
    </div>
  );
}

export function Header() {
  const { t, lang, setLang } = useLocale();
  const pin = useUi((s) => s.pin);
  const loadPin = useUi((s) => s.loadPin);
  const setPinDialogOpen = useUi((s) => s.setPinDialogOpen);

  useEffect(() => loadPin(), [loadPin]);

  return (
    <header className="site-header" id="header">
      <div className="site-header__bar container">
        <AnchorLink className="logo" href="#top" aria-label="Yaad Ki Sawad, back to top">
          <Logo />
        </AnchorLink>
        <nav className="nav" aria-label="Primary">
          <AnchorLink href="#journey">{t('nav.states')}</AnchorLink>
          <AnchorLink href="#festival">{t('nav.collections')}</AnchorLink>
          <AnchorLink href="#makers">{t('nav.makers')}</AnchorLink>
          <AnchorLink href="#how">{t('nav.how')}</AnchorLink>
        </nav>
        <div className="site-header__tools">
          <button className="pin-chip" type="button" aria-haspopup="dialog" onClick={() => setPinDialogOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>{pin ? t('pin.delivering', { pin }) : t('pin.set')}</span>
          </button>
          <button className="lang" type="button" aria-label={t('lang.aria')} onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}>
            {t('lang.button')}
          </button>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
