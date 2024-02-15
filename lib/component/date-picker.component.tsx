import { createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
  DatePickerRef,
} from './date-picker.component.types';
import './date-picker.styles.css';

/**
  date formats:
  @see https://docs.oracle.com/cd/E41183_01/DR/Date_Format_Types.html
  @see https://en.wikipedia.org/wiki/Date_format_by_country
*/

var isArray = Array.isArray;
var openEventName = 'open' as const;

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
  var dateInputRef: DatePickerForwardElement = null as any;
  var textInputRef: HTMLInputElement = null as any;
  var buttonRef: HTMLButtonElement = null as any;

  var [props, attrs] = splitProps(attrsAndProps, [
    'keepNative',
    'icon',
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

  var id = () => attrs?.id || 'da7d68734';

  var keepNative = () => (props?.keepNative == null ? false : props.keepNative);

  var icon = () => (props?.icon == null ? '🗓️' : props.icon);

  var format = () => props?.format;

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

  var ref: DatePickerRef = (el) => {
    dateInputRef = el;
  };

  onMount(() => {
    const showPicker = dateInputRef?.showPicker;
    dateInputRef.showPicker = function () {
      showPicker.call(this);

      this.dispatchEvent(openEvent);
    };
    dateInputRef.addEventListener(openEventName, onOpen);
  });

  onCleanup(() => {
    dateInputRef.removeEventListener(openEventName, onOpen);
  });

  return (
    <div
      class="solid-js-date-picker"
      onClick={(event) => {
        if (event.target === buttonRef) {
          dateInputRef.showPicker();
        }
      }}
      onInput={(event) => {
        if (event.target === textInputRef) {
          console.log('input text "input" event:', event);
        }
      }}
    >
      {/* <div>
        <input name="day" type="text" minlength={2} maxlength={2} />
        <br />
        <input name="month" type="text" minlength={2} maxlength={2} />
        <br />
        <input name="year" type="text" minlength={2} maxlength={6} />
        <br />
      </div> */}

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
        ref={ref}
        value={value()}
        /* --------------------------------- omitted attrs ------------------------- */
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
        /* --------------------------------- omitted attrs ------------------------- */
      />
      <button
        type="button"
        class="solid-js-date-picker__icon"
        ref={(el) => {
          buttonRef = el;
        }}
      >
        {icon()}
      </button>
    </div>
  );
};

/*
  <DatePicker keepNative={false}>
    {(args) => {
      return (
        ...
      )
    }}
  </DatePicker>

  <DatePicker
    min="2017-04-01"
    max="2017-04-30"
    keepNative
    onChange={(event) => {
      // ...
    }}
  />
*/

/*
    output value is always: "YYYY-MM-DD"
*/
