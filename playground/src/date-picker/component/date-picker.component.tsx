import { createEffect, createSignal, onMount } from 'solid-js';
import type {
  DatePickerComponent,
  DatePickerForwardElement,
} from './date-picker.component.types';
import { constructProps } from './date-picker.props';
import './date-picker.styles.scss';
import { hasInputRelatedAttr } from './utils';

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
          class="solid-js-date-picker__input solid-js-date-picker__input-text"
          ref={(el) => {
            textInputRef = el;
          }}
        />
        <input
          {...constructedProps.dateAttr}
          type="date"
          class="solid-js-date-picker__input solid-js-date-picker__input-date"
          ref={(el) => {
            var proxyfiedEl = new Proxy(el, {
              get(target, property, receiver) {
                if (Reflect.has(containerRef, property)) {
                  return Reflect.get(containerRef, property, containerRef);
                }

                return Reflect.get(target, property, target);
              },
              set(target, property, value, receiver) {
                if (Reflect.has(containerRef, property)) {
                  return Reflect.set(containerRef, property, value, containerRef);
                }

                return Reflect.set(target, property, value, target);
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
      } solid-js-date-picker solid-js-date-picker__container`}
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

      onChange={(event) => {
        dateInputRef.value = (event.target as HTMLInputElement).value;
        console.log({ event, target: event.target });
      }}
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
