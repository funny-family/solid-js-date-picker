import { createEffect, createSignal, onMount } from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';
import {
  INPUT_DATE_CONTENT_ATTRS_OBJECT,
  constructProps,
} from './date-picker.props';
import './date-picker.styles.scss';

export var datasetElementName = 'date-input' as const;

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
  var constructedProps = constructProps(attrsAndProps);

  var containerRef: HTMLDivElement = null as any;
  var textInputRef: HTMLInputElement = null as any;
  var dateInputRef: DatePickerForwardElement = null as any;

  createEffect(() => {
    console.log({ containerRef, dateInputRef, textInputRef });
  });

  // onMount(() => {
  //   dateInputRef = new Proxy(dateInputRef, {
  //     //
  //   });
  // });

  var DefaultChildren = () => {
    return (
      <>
        <input
          type="text"
          class="solid-js-date-picker-input"
          ref={(el) => {
            textInputRef = el;
          }}
        />
        <input
          {...constructedProps.dateAttr}
          type="date"
          class="solid-js-date-picker-input"
          ref={(el) => {
            var proxyfiedEl = new Proxy(el, {
              get(target, prop, receiver) {
                if (Reflect.has(target, INPUT_DATE_CONTENT_ATTRS_OBJECT[0])) {
                  return Reflect.get(target, prop);
                }

                return Reflect.get(containerRef, prop);
              },
            });

            dateInputRef = proxyfiedEl;

            if (constructedProps.customAttr?.ref != null) {
              Reflect.apply(
                constructedProps.customAttr?.ref as Function,
                undefined,
                [proxyfiedEl]
              );
            }
          }}
          hidden
        />
      </>
    );
  };

  return (
    <div
      {...(constructedProps.rest as any)}
      $ServerOnly={constructedProps.customAttr?.$ServerOnly}
      classList={constructedProps.customAttr?.classList}
      class={`${
        constructedProps.rest?.class || ''
      } solid-js-date-picker-container`}
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

      {typeof constructedProps.rest?.children === 'function'
        ? constructedProps.rest.children()
        : constructedProps.rest?.children}
    </div>
  );
};
