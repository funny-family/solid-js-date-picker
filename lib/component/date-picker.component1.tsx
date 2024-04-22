import { onMount, splitProps } from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';

export const DatePicker: DatePickerComponent = (attrsAndProps) => {
  var [props, inputAttrs, customAttrs, restAttrs] = splitProps(
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

  var containerRef: HTMLDivElement = null as any;
  var dateInputRef: DatePickerForwardElement = customAttrs?.ref as any;
  var textInputRef: HTMLInputElement = null as any;

  onMount(() => {
    const showPicker = dateInputRef.showPicker;
    dateInputRef.showPicker = function () {
      showPicker.call(this);
      alert(1231311);
    };
  });

  return (
    <div
      // {...(restAttrs as any)}
      // $ServerOnly={customAttrs?.$ServerOnly}
      // classList={customAttrs?.classList}
      class={`${restAttrs?.class || ''} solid-js-date-picker-container`}
      // ref={(el) => {
      //   containerRef = el;
      // }}
    >
      <input
        // {...inputAttrs}
        type="text"
        class="solid-js-date-picker-input"
        ref={(el) => {
          dateInputRef = el;
        }}
      />

      {typeof restAttrs?.children === 'function'
        ? restAttrs.children()
        : restAttrs?.children}
    </div>
  );
};
