import { splitProps } from 'solid-js';
import type { DatePickerAttrsAndProps } from './date-picker.component.types';

export var constructProps = (attrsAndProps: DatePickerAttrsAndProps) => {
  const splittedAttrsAndProps = splitProps(
    attrsAndProps,
    ['keepNativePicker', 'format', 'onOpen', 'onClose'],
    [
      'accept',
      'alt',
      'autocomplete',
      'autocorrect',
      'autofocus',
      'capture',
      'checked',
      'crossorigin',
      'disabled',
      'enterkeyhint',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'height',
      'incremental',
      'list',
      'max',
      'maxlength',
      'min',
      'minlength',
      'multiple',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'results',
      'required',
      'size',
      'src',
      'step',
      'type',
      'value',
      'width',
      'crossOrigin',
      'formAction',
      'formEnctype',
      'formMethod',
      'formNoValidate',
      'formTarget',
      'maxLength',
      'minLength',
      'readOnly',
    ],
    ['ref', 'classList', '$ServerOnly']
  );

  return splittedAttrsAndProps;
};
