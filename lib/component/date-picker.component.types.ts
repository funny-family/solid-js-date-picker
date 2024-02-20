import type { JSX, Component } from 'solid-js';

export type DatePickerForwardElement = HTMLInputElement;

export type DatePickerRef = (el: DatePickerForwardElement) => void;

export type DatePickerAttrs = Omit<
  JSX.IntrinsicElements['input'],
  /* --------------------------------- omitted attrs ------------------------- */
  // | 'children'
  | 'type'
  | 'accept'
  | 'alt'
  | 'autocapitalize'
  | 'autocomplete'
  | 'capture'
  | 'checked'
  | 'dirname'
  | 'formaction'
  | 'formenctype'
  | 'formtarget'
  | 'height'
  | 'maxlength'
  | 'minlength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'popovertarget'
  | 'popovertargetaction'
  | 'size'
  | 'width'
  | 'contenteditable'
  | 'inputmode'
  | 'inputmode'
  | 'innerHTML'
  | 'innerText'
  //
  | 'maxLength'
  | 'minLength'
  | 'contentEditable'
  | 'formAction'
  | 'formEnctype'
  | 'formTarget'
  | 'autoCapitalize'
  | 'formmethod'
  | 'formMethod'
  /* --------------------------------- omitted attrs ------------------------- */
>;

export type DatePickerProps = {
  keepNativePicker?: boolean;
  format?: string;
  onOpen?: JSX.EventHandlerUnion<HTMLInputElement, Event>;
};

export type DatePickerAttrsAndProps = DatePickerAttrs & DatePickerProps;

export type DatePickerComponent = Component<DatePickerAttrsAndProps>;
