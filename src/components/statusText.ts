import type { DayStatus } from '../core/status';
import { STR } from '../strings';

export function statusText(st: DayStatus): string {
  switch (st) {
    case 'f':
      return STR.status.future;
    case 't':
      return STR.status.trained;
    case 'r':
      return STR.status.rest;
    case 'm':
      return STR.status.skipped;
    case 'n':
      return STR.status.pending;
  }
}
