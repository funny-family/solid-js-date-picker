import {
  type JSX,
  Show,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
  createEffect,
} from 'solid-js';
import {} from 'solid-js/web';
import type {
  DatePickerAttrsAndProps,
  DatePickerComponent,
  DatePickerForwardElement,
  DatePickerRef,
} from './date-picker.component.types';
import { parseFormat } from './date-picker.utils';
import { openEventName, isArray } from '../utils';
import {
  Picker,
  pickerExposeSymbol,
} from './components/picker/picker.component';
import { type PickerRef } from './components/picker/picker.component.types';
import type { UnionToArray } from '../types';
import './date-picker.styles.scss';

/**
  date formats:
  @see https://docs.oracle.com/cd/E41183_01/DR/Date_Format_Types.html
  @see https://en.wikipedia.org/wiki/Date_format_by_country
*/

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
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
  // var dateInputRef: DatePickerForwardElement = null as any;
  var dateInputRef: DatePickerForwardElement = customAttrs?.ref as any;
  // var [dateInputRef, setDateInputRef] = createSignal(customAttrs?.ref);
  var textInputRef: HTMLInputElement = null as any;
  // var pickerRef: PickerRef = null as any;
  var [pickerRef, setPickerRef] = createSignal(null as unknown as PickerRef);

  // var currentDate = new Date();
  var [value, setValue] = createSignal(
    // attrs?.value || currentDate.toISOString().substring(0, 10)
    inputAttrs?.value || ''
  );

  // var [textInputValue, setTextInputValue] = createSignal('');
  // var [dateInputValue, setDateInputValue] = createSignal('');

  var [isPickerVisible, setPickerVisibility] = createSignal(false);
  var [isDateInputVisible, setDateInputVisibility] = createSignal(false);

  var keepNativePicker = () => {
    return props?.keepNativePicker == null ? false : props.keepNativePicker;
  };

  var format = () => {
    return props?.format || 'MM/DD/YYYY';
  };

  // console.log('parsed format:', parseFormat(format()));

  // var openEvent = new CustomEvent(openEventName);
  var onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    if (props?.onOpen == null) {
      return;
    }

    if (typeof props.onOpen === 'function') {
      props.onOpen(
        event as Event & {
          currentTarget: HTMLInputElement;
          target: Element;
        }
      );
    }

    if (isArray(props.onOpen)) {
      // handler(data, event);
      props.onOpen[0](props.onOpen[1], event);
    }
  };

  var onClose: DatePickerAttrsAndProps['onClose'] = (event) => {
    setPickerVisibility(false);

    if (props?.onClose != null) {
      if (typeof props.onClose === 'function') {
        props.onClose(event);
      }

      if (isArray(props.onClose)) {
        // handler(data, event);
        props.onClose[0](props.onClose[1], event);
      }
    }
  };

  // createEffect(() => {
  //   // setDateInputRef()
  //   dateInputRef = containerRef.querySelector('input[type="date"]');
  // });

  onMount(() => {
    // =============== get position of container element ===============
    const containerRect = containerRef.getBoundingClientRect();
    containerRef.style.setProperty(
      '--date-picker-position-top',
      `${containerRect.top + window.scrollY}px`
    );
    containerRef.style.setProperty(
      '--date-picker-position-left',
      `${containerRect.left + window.scrollX}px`
    );
    containerRef.style.setProperty(
      '--date-picker-width',
      `${containerRect.width}px`
    );
    containerRef.style.setProperty(
      '--date-picker-height',
      `${containerRect.height}px`
    );
    // =============== get position of container element ===============

    const showPicker = dateInputRef?.showPicker;
    dateInputRef.showPicker = function () {
      if (keepNativePicker()) {
        showPicker.call(this);
      } else {
        setPickerVisibility(true);
      }

      if (pickerRef != null) {
        pickerRef()[pickerExposeSymbol].open();

        // dateInputRef.dispatchEvent(openEvent);
      }
    };

    // dateInputRef.addEventListener(openEventName, onOpen);

    console.group('refs:');
    console.log('containerRef:', { containerRef });
    console.log('dateInputRef:', { dateInputRef });
    console.log('textInputRef:', { textInputRef });
    console.log('pickerRef:', { pickerRef });
    console.log(3453543, {
      'customAttrs?.ref': customAttrs?.ref,
      dateInputRef,
      'ref': attrsAndProps?.ref,
      // 'rf': customAttrs?.ref(),
    });
    console.groupEnd();
  });

  onCleanup(() => {
    // dateInputRef.removeEventListener(openEventName, onOpen);
  });

  var DefaultChildren = () => {
    return (
      <>
        <pre>
          <div>isPickerVisible: {`${isPickerVisible()}`}</div>
          <div>keepNativePicker: {`${keepNativePicker()}`}</div>
        </pre>

        <input
          {...inputAttrs}
          type="text"
          class="solid-js-date-picker-input"
          ref={(el) => {
            textInputRef = el;
          }}
          value={value()}
        />
        {/* <Show when={isDateInputVisible()} fallback={null}> */}
        <input
          {...inputAttrs}
          type="date"
          class="solid-js-date-picker-input"
          ref={(el) => {
            dateInputRef = el;

            dateInputRef.__$$_$$__ = '';
          }}
          // ref={dateInputRef}
          value={value()}
          // /* ----------------------- omitted attrs ---------------------- */
          // accept={null as any}
          // alt={null as any}
          // autocapitalize={null as any}
          // autocomplete={null as any}
          // capture={null as any}
          // checked={null as any}
          // // @ts-ignore
          // dirname={null as any}
          // formaction={null as any}
          // formenctype={null as any}
          // formtarget={null as any}
          // height={null as any}
          // maxlength={null as any}
          // minlength={null as any}
          // multiple={null as any}
          // pattern={null as any}
          // placeholder={null as any}
          // // @ts-ignore
          // popovertarget={null as any}
          // // @ts-ignore
          // popovertargetaction={null as any}
          // size={null as any}
          // width={null as any}
          // contenteditable={null as any}
          // inputmode={null as any}
          // innerHTML={null as any}
          // innerText={null as any}
          // formmethod={null as any}
          // formMethod={null as any}
          // /* ----------------------- omitted attrs ---------------------- */
        />
        {/* </Show> */}
      </>
    );
  };

  return (
    <div
      {...(restAttrs as any)}
      $ServerOnly={customAttrs?.$ServerOnly}
      classList={customAttrs?.classList}
      class={`${restAttrs?.class || ''} solid-js-date-picker-container`}
      ref={(el) => {
        containerRef = el;
      }}
      onInput={(event) => {
        if (event.target === dateInputRef) {
          // TODO: format value and set it later
          setValue((event.target as HTMLInputElement).value);
        }

        if (event.target === textInputRef) {
          console.log('input text "input" event:', event);
        }
      }}
    >
      <Show when={restAttrs?.children != null} fallback={<DefaultChildren />}>
        <DefaultChildren />

        <Show when={keepNativePicker() === false} fallback={null}>
          <Show when={isPickerVisible()} fallback={null}>
            <Picker
              class="solid-js-date-picker__picker"
              ref={(el) => {
                setPickerRef(el);
              }}
              onOpen={(event) => {
                (onOpen as any)(event);
              }}
              onClose={(event) => {
                (onClose as any)(event);
              }}
            >
              <input type="text" />
              <button type="button">1231</button>
            </Picker>
          </Show>
        </Show>
      </Show>

      {restAttrs.children}
    </div>
  );
};

/*
  <DatePicker keepNativePicker={false}>
    {(args) => {
      return (
        ...
      )
    }}
  </DatePicker>

  <DatePicker
    min="2017-04-01"
    max="2017-04-30"
    keepNativePicker
    onChange={(event) => {
      // ...
    }}
  />
*/

/*
    output value is always: "YYYY-MM-DD"
*/
