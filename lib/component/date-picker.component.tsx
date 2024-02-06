import { createSignal, onMount, splitProps } from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
  DatePickerRef,
} from './date-picker.component.types';
import './date-picker.styles.css';

export const DatePicker: DatePickerComponent = (attrsAndProps) => {
  let dateInputRef: DatePickerForwardElement = null as any;

  const [props, attrs] = splitProps(attrsAndProps, ['keepNative', 'icon']);

  const currentDate = new Date();
  const [value, setValue] = createSignal(
    // attrs?.value || currentDate.toISOString().substring(0, 10)
    attrs?.value || ''
  );

  const [textInputValue, setTextInputValue] = createSignal('');
  const [dateInputValue, setDateInputValue] = createSignal('');

  const id = () => attrs?.id || 'da7d68734';

  const keepNative = () =>
    props?.keepNative == null ? false : props.keepNative;

  const icon = () => (props?.icon == null ? '🗓️' : props.icon);

  const ref: DatePickerRef = (el) => {
    dateInputRef = el;
  };

  onMount(() => {
    var showPicker = dateInputRef?.showPicker;
    dateInputRef.showPicker = function () {
      showPicker.call(this);

      console.log(1231312, this);
    };
  });

  return (
    <div
      class="solid-js-date-picker"
      onChange={(event) => {
        console.log(event);
      }}
    >
      <input type="text" value={value()} />
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
      <div class="solid-js-date-picker__icon">{icon()}</div>
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
