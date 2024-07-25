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

  var inputmode: JSX.HTMLAttributes<HTMLInputElement>['inputmode'] = 'numeric';

  var TextInput = ((attrsAndProps: JSX.IntrinsicElements['input']) => {
    var tabindex: JSX.HTMLAttributes<HTMLInputElement>['tabindex'] = 0;

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
        tabindex={attrsAndProps?.tabindex || rest?.tabindex || tabindex}
        tabIndex={attrsAndProps?.tabIndex || rest?.tabIndex || tabindex}
        inputMode={attrsAndProps?.inputMode || rest?.inputMode || inputmode}
        inputmode={attrsAndProps?.inputmode || rest?.inputmode || inputmode}
        lang={attrsAndProps?.lang || rest?.lang}
        autocorrect={attrsAndProps?.autocorrect || inputAttr?.autocorrect}
        autofocus={attrsAndProps?.autofocus || inputAttr?.autofocus}
        placeholder={
          attrsAndProps?.placeholder || inputAttr?.placeholder || 'YYYY-MM-DD'
        }
        autocomplete={attrsAndProps?.autocomplete || inputAttr?.autocomplete}
        disabled={attrsAndProps?.disabled || inputAttr?.disabled}
      />
    );
  }) as Component<Omit<JSX.IntrinsicElements['input'], 'type'>>;

  var DateInput = ((attrsAndProps: JSX.IntrinsicElements['input']) => {
    var tabindex: JSX.HTMLAttributes<HTMLInputElement>['tabindex'] = 9999;

    return (
      <input
        type="date"
        {...inputAttr}
        {...attrsAndProps}
        class={`${
          attrsAndProps?.class || ''
        } solid-js-date-picker__input solid-js-date-picker__input-date`}
        tabindex={attrsAndProps?.tabindex || tabindex}
        tabIndex={attrsAndProps?.tabIndex || tabindex}
        ref={(element) => {
          dateInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(customAttr?.ref as Function, undefined, [element]);
          }
        }}
        list={attrsAndProps?.list || inputAttr?.list}
        disabled={attrsAndProps?.disabled || inputAttr?.disabled}
        autocomplete={null as any}
        placeholder={null as any}
      />
    );
  }) as Component<Omit<JSX.IntrinsicElements['input'], 'type'>>;

  var Button = ((attrsAndProps: JSX.IntrinsicElements['button']) => {
    var tabindex: JSX.HTMLAttributes<HTMLInputElement>['tabindex'] = 0;

    return (
      <button
        type="button"
        {...attrsAndProps}
        aria-invalidattrsAndProps
        class={`${attrsAndProps?.class || ''} solid-js-date-picker__button`}
        tabindex={attrsAndProps?.tabindex || tabindex}
        tabIndex={attrsAndProps?.tabIndex || tabindex}
        onClick={(event) => {
          dateInputRef.showPicker();

          if (attrsAndProps?.onClick != null) {
            if (typeof attrsAndProps.onClick === 'function') {
              attrsAndProps.onClick(event);
            }

            if (Array.isArray(attrsAndProps.onClick)) {
              // todo!
            }
          }
        }}
      >
        🗓️
      </button>
    );
  }) as Component<Omit<JSX.IntrinsicElements['button'], 'type'>>;

  var DefaultChildren = (
    <>
      {TextInput}
      {DateInput}
      {Button}
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
      onPaste={(event) => {
        var stopEvent = (event: Event) => {
          event.preventDefault();

          return false;
        };

        var target = event.target;
        let value = event.clipboardData?.getData('text');

        if (target === textInputRef) {
          // if (value != null) {
          //   if (Number.isNaN(+value)) {
          //     stopEvent(event);
          //   }

          //   var valueAsNumber = Date.parse(value);

          //   if (Number.isNaN(valueAsNumber)) {
          //     stopEvent(event);
          //   }
          // }

          // // var value = (target as HTMLInputElement).value;

          // console.log(value);

          stopEvent(event);
        }

        // stopEvent();
      }}
      //
      inputmode={null as any}
      inputMode={null as any}
      //
      autocapitalize={null as any}
      autoCapitalize={null as any}
      //
      lang={null as any}
      contenteditable={null as any}
      contentEditable={null as any}
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
    //
    | 'alt'
    //
    | 'accept'
    | 'capture'
    | 'multiple'
    //
    | 'checked'
    //
    | 'formaction'
    | 'formenctype'
    | 'formmethod'
    | 'formnovalidate'
    | 'formtarget'
    | 'formAction'
    | 'formEnctype'
    | 'formMethod'
    | 'formNoValidate'
    | 'formTarget'
    //
    | 'width'
    | 'height'
    //
    | 'height'
    //
    | 'minlength'
    | 'maxlength'
    | 'minLength'
    | 'maxLength'
    //
    | 'contenteditable'
    | 'contentEditable'
    //
    | 'pattern'
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
