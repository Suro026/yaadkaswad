import { scrollToTarget } from '@/lib/scroll';
import { useUi, type Prefill } from '@/lib/ui-store';

/* Send the visitor to the waitlist form with fields prefilled (state card, festival card, PIN check). */
export function goToNotify(prefill: Omit<Prefill, 'nonce'> = {}) {
  useUi.getState().setPrefill(prefill);
  scrollToTarget('#notify');
}
