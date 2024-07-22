import { createEffect, createSignal, type JSX, on, splitProps } from 'solid-js';
import type { DatePickerComponent } from './date-picker.component.types';
import { Portal } from 'solid-js/web';
import './date-picker.styles.scss';

var isArray = Array.isArray;

export var DatePicker: DatePickerComponent = (attrsAndProps) => {
  var textInputRef: HTMLInputElement = null as any;
  var dateInputRef: HTMLInputElement = null as any;

  var [customAttrs, rest] = splitProps(attrsAndProps, [
    'classList',
    'ref',
    '$ServerOnly',
    'children',
  ]);

  // const [value, setValue] = createSignal(rest?.value || '');
  const [stringDateValue, setStringDateValue] = createSignal('');

  var inputMode: JSX.HTMLAttributes<HTMLInputElement>['inputMode'] = 'numeric';

  // createEffect(
  //   on(
  //     () => textInputRef.value,
  //     (v) => {
  //       console.log(11111, v);
  //     }
  //   )
  // );

  <Portal
    ref={(el) => {
      el.classList.add('solid-js-date-picker-children-container');
    }}
  >
    <input
      type="date"
      // value={value()}
      list={rest?.list}
      ref={(el) => {
        dateInputRef = el;
      }}
      onChange={(event) => {
        console.log('input date "change" event:', {
          event,
          target: event.target,
        });
      }}
    />

    <div>test date -&gt; 2024-07-18</div>

    {typeof customAttrs?.children === 'function'
      ? customAttrs.children()
      : customAttrs?.children}
  </Portal>;

  return (
    <input
      type="text"
      {...rest}
      $ServerOnly={customAttrs?.$ServerOnly}
      classList={customAttrs?.classList}
      inputmode={rest?.inputmode || inputMode}
      inputMode={rest?.inputmode || inputMode}
      class={`${rest?.class || ''} solid-js-date-picker`}
      ref={(el) => {
        var proxyfiedEl = new Proxy(el, {
          get(target, property, receiver) {
            console.log('get:', target, property, receiver, arguments);

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
            console.log('set:', { target, property, value, receiver });

            if (property === 'value') {
              return Reflect.set(dateInputRef, property, value, dateInputRef);
            }

            if (property === 'valueAsDate') {
              return Reflect.set(dateInputRef, property, value, dateInputRef);
            }

            if (property === 'valueAsNumber') {
              return Reflect.set(dateInputRef, property, value, dateInputRef);
            }

            return Reflect.set(target, property, value, receiver);
          },
        });

        textInputRef = proxyfiedEl;
        window.datePickerRef1 = proxyfiedEl;

        if (customAttrs?.ref != null) {
          Reflect.apply(customAttrs?.ref as Function, undefined, [proxyfiedEl]);
        }
      }}
      // value={value()}
      onChange={(event) => {
        dateInputRef.value = event.target.value;

        // setValue(event.target.value);

        // console.log({
        //   'dateInputRef.value': dateInputRef.value,
        //   'dateInputRef.valueAsNumber': dateInputRef.valueAsNumber,
        //   'dateInputRef.valueAsDate': dateInputRef.valueAsDate,
        // });
      }}
      onPaste={(event) => {
        event.preventDefault();

        if (rest?.onPaste != null) {
          if (typeof rest.onPaste === 'function') {
            rest.onPaste(event);
          }

          if (isArray(rest.onPaste)) {
            //
          }
        }
      }}
      list={null as any}
    />
  );
};
