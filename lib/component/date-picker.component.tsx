import {
  type JSX,
  Show,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import type {
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
import './date-picker.styles.scss';

/**
  date formats:
  @see https://docs.oracle.com/cd/E41183_01/DR/Date_Format_Types.html
  @see https://en.wikipedia.org/wiki/Date_format_by_country
*/

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
  var containerRef: HTMLDivElement = null as any;
  var dateInputRef: DatePickerForwardElement = null as any;
  var textInputRef: HTMLInputElement = null as any;
  var pickerRef: PickerRef | null = null as any;

  var [props, attrs] = splitProps(attrsAndProps, [
    'keepNativePicker',
    'format',
    'onOpen',
  ]);

  var currentDate = new Date();
  var [value, setValue] = createSignal(
    // attrs?.value || currentDate.toISOString().substring(0, 10)
    attrs?.value || ''
  );

  var [textInputValue, setTextInputValue] = createSignal('');
  var [dateInputValue, setDateInputValue] = createSignal('');

  var [isPickerVisible, setPickerVisibility] = createSignal(false);

  var keepNativePicker = () => {
    return props?.keepNativePicker == null ? false : props.keepNativePicker;
  };

  var format = () => {
    return props?.format || 'MM/DD/YYYY';
  };

  console.log('parsed format:', parseFormat(format()));

  var openEvent = new CustomEvent(openEventName);
  var onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    if (props?.onOpen != null) {
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
    }
  };

  // var ref: DatePickerRef = (el) => {
  //   dateInputRef = el;
  // };

  onMount(() => {
    const showPicker = dateInputRef?.showPicker;
    dateInputRef.showPicker = function () {
      if (keepNativePicker()) {
        showPicker.call(this);
      }

      if (pickerRef != null) {
        // ---------------- set picker position relative to date input ----------------
        const containerRect = containerRef.getBoundingClientRect();
        pickerRef.style.margin = '0px';
        pickerRef.style.top = `${containerRect.top + window.scrollY}px`;
        pickerRef.style.left = `${containerRect.left + window.scrollX}px`;
        pickerRef.style.transform = `translate3d(0, ${containerRect.height}px, 0)`;
        pickerRef.style.willChange = 'transform';
        // ---------------- set picker position relative to date input ----------------

        pickerRef[pickerExposeSymbol].open();
      }

      setPickerVisibility(true);

      this.dispatchEvent(openEvent);
    };

    dateInputRef.addEventListener(openEventName, onOpen);

    console.group('refs:');
    console.log('containerRef:', containerRef, { containerRef });
    console.log('dateInputRef:', dateInputRef, { dateInputRef });
    console.log('textInputRef:', textInputRef, { textInputRef });
    console.log('pickerRef:', pickerRef, { pickerRef });
    console.groupEnd();
  });

  onCleanup(() => {
    dateInputRef.removeEventListener(openEventName, onOpen);
  });

  var DefaultChildren = () => {
    return (
      <>
        <div>isPickerVisible: {`${isPickerVisible()}`}</div>

        <input
          type="text"
          placeholder="MM.DD.YYYY"
          ref={(el) => {
            textInputRef = el;
          }}
          value={value()}
        />
        <input
          {...attrs}
          type="date"
          ref={(el) => {
            dateInputRef = el;
          }}
          value={value()}
          /* ----------------------- omitted attrs ---------------------- */
          accept={null as any}
          alt={null as any}
          autocapitalize={null as any}
          autocomplete={null as any}
          capture={null as any}
          checked={null as any}
          // @ts-ignore
          dirname={null as any}
          formaction={null as any}
          formenctype={null as any}
          formtarget={null as any}
          height={null as any}
          maxlength={null as any}
          minlength={null as any}
          multiple={null as any}
          pattern={null as any}
          placeholder={null as any}
          // @ts-ignore
          popovertarget={null as any}
          // @ts-ignore
          popovertargetaction={null as any}
          size={null as any}
          width={null as any}
          contenteditable={null as any}
          inputmode={null as any}
          innerHTML={null as any}
          innerText={null as any}
          formmethod={null as any}
          formMethod={null as any}
          /* ----------------------- omitted attrs ---------------------- */
        />
      </>
    );
  };

  return (
    <div
      class="solid-js-date-picker-container"
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
      <Show when={attrs?.children != null} fallback={<DefaultChildren />}>
        <>
          <DefaultChildren />

          <Show when={keepNativePicker() === false} fallback={null}>
            <Picker
              class="solid-js-date-picker__picker"
              ref={(el) => {
                pickerRef = el;
              }}
              onClick={(event) => {
                if (pickerRef != null) {
                  if (
                    event.offsetX < 0 ||
                    event.offsetX > (event.target as HTMLElement).offsetWidth ||
                    event.offsetY < 0 ||
                    event.offsetY > (event.target as HTMLElement).offsetHeight
                  ) {
                    pickerRef[pickerExposeSymbol].close();
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                  }
                }
              }}
            >
              <input type="text" />
              <button type="button">1231</button>
            </Picker>
          </Show>

          {attrs.children}
        </>
      </Show>
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
