import type { JSX, Component } from 'solid-js';

export type DatePickerForwardElement = HTMLInputElement;

export type DatePickerRef = DatePickerForwardElement;

export type DatePickerAttrs = Omit<
  JSX.IntrinsicElements['input'],
  /* ------------------------- overwritten attrs ------------------------- */
  'children'
  /* ------------------------- overwritten attrs ------------------------- */
> & {
  children?: JSX.Element | (() => JSX.Element);
};

export type DatePickerProps = {
  // keepNativePicker?: boolean;
  // format?: string;
  // onOpen?: JSX.EventHandlerUnion<HTMLElement, Event>;
  // onClose?: JSX.EventHandlerUnion<HTMLElement, Event>;
};

export type DatePickerAttrsAndProps = DatePickerAttrs & DatePickerProps;

export type DatePickerComponent = Component<DatePickerAttrsAndProps>;
