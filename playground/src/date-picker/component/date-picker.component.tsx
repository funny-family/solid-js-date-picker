import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';
import { constructProps } from './date-picker.props';
import './date-picker.styles.scss';

export var datasetElementName = 'date-input' as const;

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
  var [props, inputAttrs, customAttrs, restAttrs] =
    constructProps(attrsAndProps);

  console.log({ attrsAndProps, customAttrs });

  var containerRef: HTMLDivElement = null as any;
  var dateInputRef: DatePickerForwardElement = customAttrs?.ref as any;
  var textInputRef: HTMLInputElement = null as any;

  var DefaultChildren = () => {
    return (
      <>
        {/* <pre>
          <div>isPickerVisible: {`${isPickerVisible()}`}</div>
          <div>keepNativePicker: {`${keepNativePicker()}`}</div>
        </pre> */}

        <input
          {...inputAttrs}
          type="text"
          class="solid-js-date-picker-input"
          ref={(el) => {
            textInputRef = el;
          }}
        />
        <input
          data-element-name={datasetElementName}
          {...inputAttrs}
          type="date"
          class="solid-js-date-picker-input"
          ref={dateInputRef}
        />
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

      // onInput={(event) => {
      //   if (event.target === dateInputRef) {
      //     // TODO: format value and set it later
      //     // setValue((event.target as HTMLInputElement).value);
      //   }

      //   if (event.target === textInputRef) {
      //     console.log('input text "input" event:', event);
      //   }
      // }}
    >
      <DefaultChildren />

      {/* <Show when={keepNativePicker() === false} fallback={null}>
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
      </Show> */}

      {typeof restAttrs?.children === 'function'
        ? restAttrs.children()
        : restAttrs?.children}
    </div>
  );
};
