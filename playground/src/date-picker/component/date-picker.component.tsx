import {
  Component,
  createEffect,
  createSignal,
  JSX,
  onMount,
  Show,
  splitProps,
} from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';
import { constructProps } from './date-picker.props';
import './date-picker.styles.scss';
import { hasInputRelatedAttr } from './utils';
import { filterProps } from '@solid-primitives/props';

export var datasetElementName = 'date-input' as const;

export var DatePicker = ((attrsAndProps: JSX.IntrinsicElements['input']) => {
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

  var TextInput = ((attrsAndProps: JSX.IntrinsicElements['input']) => {
    return (
      <input
        type="text"
        {...attrsAndProps}
        class={`${
          attrsAndProps?.class || ''
        } solid-js-date-picker__input solid-js-date-picker__input-text`}
        ref={(element) => {
          textInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(customAttr?.ref as Function, undefined, [element]);
          }
        }}
        inputMode={rest?.inputMode || attrsAndProps?.inputMode || inputMode}
        inputmode={rest?.inputmode || attrsAndProps?.inputmode || inputMode}
        lang={rest?.lang || attrsAndProps?.lang}
        autocorrect={inputAttr?.autocorrect || attrsAndProps?.autocorrect}
        autofocus={inputAttr?.autofocus || attrsAndProps?.autofocus}
        placeholder={inputAttr?.placeholder || attrsAndProps?.placeholder}
        autocomplete={inputAttr?.autocomplete || attrsAndProps?.autocomplete}
        disabled={inputAttr?.disabled || attrsAndProps?.disabled}
      />
    );
  }) as Component<Omit<JSX.IntrinsicElements['input'], 'type'>>;

  var DateInput = ((attrsAndProps: JSX.IntrinsicElements['input']) => {
    return (
      <input
        type="date"
        {...inputAttr}
        {...attrsAndProps}
        class={`${
          attrsAndProps?.class || ''
        } solid-js-date-picker__input solid-js-date-picker__input-date`}
        ref={(element) => {
          dateInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(customAttr?.ref as Function, undefined, [element]);
          }
        }}
        list={inputAttr?.list || inputAttr?.list}
        disabled={inputAttr?.disabled || attrsAndProps?.disabled}
        autocomplete={null as any}
        placeholder={null as any}
      />
    );
  }) as Component<Omit<JSX.IntrinsicElements['input'], 'type'>>;

  var DefaultChildren = (
    <>
      {TextInput}
      {DateInput}
    </>
  );

  return (
    <div
      {...(rest as any)}
      classList={customAttr?.classList}
      $ServerOnly={customAttr?.$ServerOnly}
      ref={(element) => {
        var proxyfiedElement = new Proxy(element, {
          get(target, property, receiver) {
            if (
              property === 'showPicker' ||
              property === 'stepDown' ||
              property === 'stepUp'
            ) {
              return dateInputRef[property].bind(dateInputRef);
            }

            if (
              property === 'value' ||
              property === 'valueAsDate' ||
              property === 'valueAsNumber'
            ) {
              return Reflect.get(dateInputRef, property, dateInputRef);
            }

            var value = Reflect.get(target, property, target);

            if (typeof value === 'function') {
              return target[property].bind(target);
            }

            return value;
          },
          set(target, property, value, receiver) {
            if (
              property === 'value' ||
              property === 'valueAsDate' ||
              property === 'valueAsNumber'
            ) {
              return Reflect.set(dateInputRef, property, value, dateInputRef);
            }

            return Reflect.set(target, property, value, receiver);
          },
        });

        // containerRef = element;
        containerRef = proxyfiedElement;

        if (customAttr?.ref != null) {
          // Reflect.apply(customAttr?.ref as Function, undefined, [element]);
          Reflect.apply(customAttr?.ref as Function, undefined, [
            proxyfiedElement,
          ]);
        }
      }}
      class={`${rest?.class || ''} solid-js-date-picker`}
      //
      inputmode={null as any}
      inputMode={null as any}
      //
      autocapitalize={null as any}
      autoCapitalize={null as any}
      //
      lang={null as any}
      contenteditable={null as any}
    >
      <Show
        when={customAttr?.children == null}
        fallback={
          <Show
            when={typeof customAttr?.children! === 'function'}
            fallback={DefaultChildren}
          >
            {(customAttr as any).children({
              TextInput,
              DateInput,
            })}
          </Show>
        }
      >
        {DefaultChildren}
      </Show>

      {/* {typeof customAttr?.children === 'function'
        ? customAttr.children({
            TextInput,
            DateInput,
          })
        : customAttr?.children} */}
    </div>
  );
}) as Component<
  Omit<
    JSX.IntrinsicElements['input'],
    | 'type'
    /* ------------------------- overwritten attrs ------------------------- */
    | 'children'
    /* ------------------------- overwritten attrs ------------------------- */
  > & {
    children?:
      | JSX.Element
      | ((args: {
          DateInput: Component<JSX.IntrinsicElements['input']>;
          TextInput: Component<JSX.IntrinsicElements['input']>;
        }) => JSX.Element);
  }
>;
