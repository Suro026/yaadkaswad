'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { LocaleProvider, type Lang } from '@/i18n/locale';
import { MotionProvider, useMotion } from '@/components/motion/motion-provider';

/* Keeps Motion (springs, presence) in step with the OS setting and the in-site toggle. */
function MotionBridge({ children }: { children: ReactNode }) {
  const { motionOK } = useMotion();
  return <MotionConfig reducedMotion={motionOK ? 'user' : 'always'}>{children}</MotionConfig>;
}

export function Providers({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LocaleProvider initial={lang}>
      <MotionProvider>
        <MotionBridge>{children}</MotionBridge>
      </MotionProvider>
    </LocaleProvider>
  );
}
