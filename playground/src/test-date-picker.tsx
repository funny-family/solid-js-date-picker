import { Show, createEffect, createSignal } from 'solid-js';
import { DatePicker, WithPicker, DatePickerRef } from './date-picker';
import {
  Picker,
  type PickerRef,
  pickerExposeSymbol,
} from './date-picker/component/components/picker';

export const TestDatePicker = () => {
  var datePickerRef: DatePickerRef = null as any;
  var pickerRef: PickerRef = null as any;

  // createEffect(() => {
  //   console.log(34345, pickerRef[pickerExposeSymbol]);
  // });

  const [open, setOpen] = createSignal(false);

  var DP = (
    <WithPicker>
      <DatePicker
        ref={(el) => {
          datePickerRef = el;
        }}
      >
        {() => {
          return (
            <>
              <Picker ref={pickerRef}>
                {(args) => {
                  return (
                    <>
                      <Show when={open()} fallback={null}>
                        <section>
                          <h1>Lorem</h1>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aut, fugiat?
                          </p>
                        </section>
                      </Show>
                    </>
                  );
                }}
              </Picker>

              <button
                type="button"
                onClick={(event) => {
                  console.log(90909, { datePickerRef, pickerRef });
                  datePickerRef.showPicker();
                  // setOpen(Boolean(pickerRef.dataset.open));
                  // setOpen(true);
                }}
              >
                🗓️
              </button>
            </>
          );
        }}
      </DatePicker>
    </WithPicker>
  );

  return <div>{DP}</div>;
};
