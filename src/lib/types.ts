import { isValidElement } from 'react';
import type { ReactNode } from 'react';

export type BackgroundColor = 'chalk' | 'paper' | 'acid' | 'blue' | 'ink';

export interface CanvasImage {
  alt: string;
  height?: number;
  src: string;
  width?: number;
}

// This is a temporary workaround and is not the recommended default approach.
// Prefer giving slot containers a minimum size when possible.
// @see docs/important-notes.md
export const hasEmptySlotPlaceholder = (slot?: ReactNode) =>
  isValidElement<{ value?: string }>(slot) &&
  typeof slot.props.value === 'string' &&
  slot.props.value.includes('canvas--slot-empty-placeholder');
