import type { Component, JSX, Ref } from 'solid-js';
import type { pickerExposeSymbol } from './picker.component';

export type PickerExpose = {
  open: () => void;
  close: () => void;
};

export type PickerRef = HTMLElement & {
  [pickerExposeSymbol]: PickerExpose;
};

export type PickerAttrs = Omit<
  JSX.IntrinsicElements['dialog'],
  /* ------------------------- omitted attrs ------------------------- */
  'ref'
  /* ------------------------- omitted attrs ------------------------- */
> & {
  ref?: Ref<PickerRef>;
};

export type PickerProps = {
  onOpen?: JSX.EventHandlerUnion<HTMLElement, Event>;
};

export type PickerAttrsAndProps = PickerAttrs & PickerProps;

export type PickerComponent = Component<PickerAttrsAndProps>;
