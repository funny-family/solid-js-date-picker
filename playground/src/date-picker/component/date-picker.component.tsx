import {
  Component,
  createEffect,
  createSignal,
  JSX,
  onMount,
  splitProps,
} from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';
import { constructProps } from './date-picker.props';
import './date-picker.styles.scss';
import { hasInputRelatedAttr } from './utils';

export var datasetElementName = 'date-input' as const;

export var DatePicker: Component<
  Omit<
    JSX.IntrinsicElements['input'],
    /* ------------------------- overwritten attrs ------------------------- */
    'children'
    /* ------------------------- overwritten attrs ------------------------- */
  > & {
    children?: JSX.Element | (() => JSX.Element);
  }
> = (attrsAndProps) => {
  var [customAttr, inputAttr, rest] = splitProps(
    attrsAndProps,
    ['classList', 'ref', '$ServerOnly', 'children'],
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
    ]
  );

  var containerRef: HTMLDivElement = null as any;
  var textInputRef: HTMLInputElement = null as any;
  var dateInputRef: HTMLInputElement = null as any;

  var inputMode: JSX.HTMLAttributes<HTMLInputElement>['inputMode'] = 'numeric';

  var DefaultChildren = () => {
    return (
      <>
        <input
          {...inputAttr}
          type="date"
          ref={dateInputRef}
          list={inputAttr?.list}
        />

        {typeof customAttr?.children === 'function'
          ? customAttr.children()
          : customAttr?.children}
      </>
    );
  };

  return (
    <div
      {...(rest as any)}
      classList={customAttr?.classList}
      $ServerOnly={customAttr?.$ServerOnly}
      ref={(element) => {
        containerRef = element;

        if (customAttr?.ref != null) {
          Reflect.apply(customAttr?.ref as Function, undefined, [element]);
        }
      }}
      class={`solid-js-date-picker`}
      inputmode={null}
      inputMode={null}
      autocapitalize={null}
      autoCapitalize={null}
      lang={null}
    >
      <input
        {...inputAttr}
        type="text"
        ref={textInputRef}
        inputMode={rest?.inputMode || inputMode}
        inputmode={rest?.inputmode || inputMode}
        autocapitalize={rest?.autocapitalize}
        autoCapitalize={rest?.autoCapitalize}
        lang={rest?.lang}
        list={null as any}
      />

      <DefaultChildren />
    </div>
  );
};
