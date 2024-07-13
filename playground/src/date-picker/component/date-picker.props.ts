import { splitProps } from 'solid-js';
import type { DatePickerAttrsAndProps } from './date-picker.component.types';

export var DATE_PICKER_PROPS = ['keepNativePicker'] as const;

/**
 * @see https://html.spec.whatwg.org/#global-attributes
 */
export var INPUT_DATE_GLOBAL_ATTRS = [
  /**
   * @see https://html.spec.whatwg.org/multipage/dom.html#classes
   */
  'class',
  /**
   * @see https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute
   */
  'id',
  /**
   * @see https://html.spec.whatwg.org/multipage/dom.html#attr-slot
   */
  'slot',

  'accesskey',
  'autocapitalize',
  'autofocus',
  'contenteditable',
  'dir',
  'draggable',
  'enterkeyhint',
  'hidden',
  'inert',
  'inputmode',
  'is',
  'itemid',
  'itemprop',
  'itemref',
  'itemscope',
  'itemtype',
  'lang',
  'nonce',
  'popover',
  'spellcheck',
  'style',
  'tabindex',
  'title',
  'translate',
  'writingsuggestions',
] as const;

/**
 * @see https://html.spec.whatwg.org/#the-input-element
 */
export var INPUT_DATE_CONTENT_ATTRS = [
  'autocomplete',
  'list',
  'max',
  'min',
  'readonly',
  'required',
  'step',
] as const;

// export var INPUT_DATE_IDL_ATTRS = [
//   'value',
//   'valueAsDate',
//   'valueAsNumber',
//   'list',
//   'select()',
// ] as const;

export var SOLID_JS_CUSTOM_ATTRS = ['ref', 'classList', '$ServerOnly'] as const;

export var constructProps = (attrsAndProps: DatePickerAttrsAndProps) => {
  // const [prop, dateAttr, customAttr, inputGlobalAttr, d] = splitProps(
  //   attrsAndProps,
  //   DATE_PICKER_PROPS,
  //   INPUT_DATE_CONTENT_ATTRS,
  //   SOLID_JS_CUSTOM_ATTRS,
  //   INPUT_DATE_GLOBAL_ATTRS
  // );

  const [prop, dateAttr, customAttr, rest] = splitProps(
    attrsAndProps,
    DATE_PICKER_PROPS,
    INPUT_DATE_CONTENT_ATTRS,
    SOLID_JS_CUSTOM_ATTRS
  );

  return {
    prop,
    dateAttr,
    customAttr,
    rest,
  };
};
