import {
  createSignal,
  Show,
  splitProps,
  type Component,
  type JSX,
} from 'solid-js';
import './date-picker.styles.scss';

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

  // var [focused, setFocused] = createSignal(false);

  var dayInputRef: HTMLDivElement = null as any;
  var monthInputRef: HTMLDivElement = null as any;
  var yearInputRef: HTMLDivElement = null as any;
  var buttonRef: HTMLDivElement = null as any;

  var placeholder = () => {
    return inputAttr?.placeholder || '';
  };

  var DayInput = (attrsAndProps) => {
    return (
      <div
        class="solid-js-date-picker__input"
        ref={(element) => {
          dayInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(attrsAndProps.ref as Function, undefined, [element]);
          }
        }}
        contenteditable
      >
        dd
      </div>
    );
  };

  var MonthInput = (attrsAndProps) => {
    return (
      <div
        class="solid-js-date-picker__input"
        ref={(element) => {
          monthInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(attrsAndProps.ref as Function, undefined, [element]);
          }
        }}
        contenteditable
      >
        mm
      </div>
    );
  };

  var YearInput = (attrsAndProps) => {
    return (
      <div
        class="solid-js-date-picker__input"
        ref={(element) => {
          yearInputRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(attrsAndProps.ref as Function, undefined, [element]);
          }
        }}
        contenteditable
      >
        yyyy
      </div>
    );
  };

  var Button = (attrsAndProps) => {
    return (
      <button
        class="solid-js-date-picker__button"
        type="button"
        ref={(element) => {
          buttonRef = element;

          if (attrsAndProps?.ref != null) {
            Reflect.apply(attrsAndProps.ref as Function, undefined, [element]);
          }
        }}
      >
        🗓️
      </button>
    );
  };

  var DefaultChildren = (
    <>
      {DayInput}
      <div style={{ 'margin-inline': '0.2em' }}>/</div>
      {MonthInput}
      <div style={{ 'margin-inline': '0.2em' }}>/</div>
      {YearInput}
      {Button}
    </>
  );

  return (
    <div
      {...(rest as any)}
      classList={{
        ...customAttr?.classList,
        get ['solid-js-date-picker_placeholder']() {
          var value = placeholder();

          if (value == null) {
            return false;
          }

          if (value === '') {
            return false;
          }

          return true;
        },
      }}
      $ServerOnly={customAttr?.$ServerOnly}
      class={`${rest?.class || ''} solid-js-date-picker1`}
      data-placeholder={placeholder()}
      onFocusIn={(event) => {
        console.group('"onFocusIn"');
        console.log('event:', event);
        console.log('event.target:', event.target, { e: event.target });
        console.groupEnd();

        // ============================ SELECTION ============================
        const range = document.createRange();
        range.selectNodeContents(event.target);
        const selection = window.getSelection();

        if (selection != null) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        // ============================ SELECTION ============================

        // event.target.classList.remove('solid-js-date-picker_placeholder');
      }}
      // onFocusOut={(event) => {
      //   console.log('"onFocusOut" event:', event);
      // }}
      onInput={(event) => {
        console.group('"onInput"');
        console.log('event:', event);
        console.log('event.target:', event.target, { e: event.target });
        console.groupEnd();

        var target = event.target;
        var textContent = target.textContent!;

        if (target === dayInputRef) {
          // ============================ SELECTION ============================
          var previousTextContent = textContent;

          const range = document.createRange();
          range.selectNodeContents(event.target);
          const selection = window.getSelection();

          if (selection != null) {
            selection.removeAllRanges();
            selection.addRange(range);
          }

          event.target.textContent! =
            event.target.textContent! + previousTextContent;
          // ============================ SELECTION ============================

          if (textContent.length > 2) {
            event.preventDefault();

            return false;
          }
        }

        if (target === monthInputRef) {
          if (textContent.length > 2) {
            event.preventDefault();

            return false;
          }
        }

        if (target === yearInputRef) {
          if (textContent.length > 4) {
            event.preventDefault();

            return false;
          }
        }
      }}
    >
      <input
        class="solid-js-date-picker__input-date"
        type="date"
        tabindex={9999}
      />

      <Show
        when={customAttr?.children == null}
        fallback={
          <Show
            when={typeof customAttr.children! === 'function'}
            fallback={DefaultChildren}
          >
            {(customAttr as any).children({
              DayInput,
              MonthInput,
              YearInput,
              Button,
            })}
          </Show>
        }
      >
        {DefaultChildren}
      </Show>
    </div>
  );
}) as Component<
  Omit<
    JSX.IntrinsicElements['input'],
    /* ------------------------- overwritten attrs ------------------------- */
    'children'
    /* ------------------------- overwritten attrs ------------------------- */
  > & {
    children?:
      | JSX.Element
      | ((args: {
          DayInput: Component<any>;
          MonthInput: Component<any>;
          YearInput: Component<any>;
          Button: Component<any>;
        }) => JSX.Element);
  }
>;
