import type { Component, JSX } from 'solid-js';
import type { pickerExposeSymbol } from './picker.component';

export type PickerExpose = {
  open: () => void;
  close: () => void;
};

export type PickerRef = HTMLDialogElement & {
  [pickerExposeSymbol]: PickerExpose;
};

export type PickerAttrs = JSX.IntrinsicElements['dialog'];

export type PickerProps = {
  onOpen?: JSX.EventHandlerUnion<HTMLElement, Event>;
};

export type PickerAttrsAndProps = PickerAttrs & PickerProps;

export type PickerComponent = Component<PickerAttrsAndProps>;
