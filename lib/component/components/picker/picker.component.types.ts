import type { Component, JSX, Ref } from 'solid-js';
import type { pickerExposeSymbol } from './picker.component';

export type PickerExpose = {
  open: () => void;
  close: () => void;
};

export type PickerExposeObject = {
  [pickerExposeSymbol]: PickerExpose;
};

export type PickerRef = HTMLElement & PickerExposeObject;

export type PickerAttrs = Omit<
  JSX.IntrinsicElements['div'],
  /* ------------------------- omitted attrs ------------------------- */
  'ref'
  /* ------------------------- omitted attrs ------------------------- */
> & {
  ref?: Ref<PickerRef>;
} & Pick<JSX.IntrinsicElements['dialog'], 'onClose' | 'onCancel'>;

export type PickerProps = {
  onOpen?: JSX.EventHandlerUnion<HTMLElement, Event>;
};

export type PickerAttrsAndProps = PickerAttrs & PickerProps;

export type PickerComponent = Component<PickerAttrsAndProps>;
