import {
  onMount,
  type Component,
  type JSX,
  Show,
  createSignal,
} from 'solid-js';
import { DatePicker, DatePickerForwardElement } from './solid-js-date-picker';
import './app.styles.css';
import {
  Picker,
  pickerExposeSymbol,
} from '../../lib/component/components/picker/picker.component';
import { PickerRef } from '../../lib/component/components/picker/picker.component.types';
import { TestDatePicker } from './test-date-picker';

window.pickerExposeSymbol = pickerExposeSymbol;

export const App: Component = () => {
  var datePickerRef: DatePickerForwardElement = null as any;

  let pickerRef1: PickerRef = null as any;
  let pickerRef2: PickerRef = null as any;

  var [isPickerRef2Visible, setPickerRef2Visibility] = createSignal(false);

  var formatString = 'MM.DD.YYYY' as const;

  onMount(() => {
    // console.log(234234, { ref });
  });

  return (
    <main>
      <section>
        <h1>DatePicker</h1>
        <div>
          <br />

          <DatePicker
            // children={null}
            class="a6dadgauydag"
            format={formatString}
            placeholder={formatString}
            ref={(el) => {
              datePickerRef = el;
            }}
            // disabled
            // keepNativePicker
            onOpen={(event) => {
              console.log('open event:', event);
            }}
            onClose={(event) => {
              console.log('close event:', event);
            }}
          >
            {() => {
              return (
                <button
                  type="button"
                  onClick={() => {
                    console.log({ datePickerRef });

                    datePickerRef.showPicker();
                  }}
                >
                  🗓️
                </button>
              );
            }}
          </DatePicker>

          <hr />

          <section>
            <h1>Visible Picker</h1>

            <Picker
              // ref={pickerRef}
              ref={(el) => {
                pickerRef1 = el;
              }}
              style={{ border: '1px solid black' }}
              onOpen={() => {
                console.log('Picker is open!');
              }}
              onClose={() => {
                console.log('Picker is close!');
              }}
            >
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto quam quo iste nesciunt nemo molestias, labore
                dolores, error incidunt, obcaecati beatae. Enim odio nostrum
                sequi! Placeat id magnam sit esse.
              </p>
              <button
                type="button"
                onClick={() => {
                  pickerRef1[pickerExposeSymbol].close();
                }}
              >
                close
              </button>
            </Picker>
            <button
              type="button"
              onClick={() => {
                pickerRef1[pickerExposeSymbol].open();
              }}
            >
              open
            </button>
          </section>

          <hr />

          <section>
            <h1 onClick={() => setPickerRef2Visibility(false)}>
              Non Visible Picker
            </h1>

            <Show when={isPickerRef2Visible()} fallback={null}>
              <Picker
                ref={pickerRef2}
                // ref={(el) => {
                //   pickerRef2 = el;
                // }}
                style={{ border: '1px solid pink' }}
                onOpen={() => {
                  console.log('Picker is open!');
                }}
                onClose={() => {
                  console.log('Picker is close!');
                  setPickerRef2Visibility(false);
                }}
              >
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Architecto quam quo iste nesciunt nemo molestias, labore
                  dolores, error incidunt, obcaecati beatae. Enim odio nostrum
                  sequi! Placeat id magnam sit esse.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    pickerRef2[pickerExposeSymbol].close();
                  }}
                >
                  close
                </button>
              </Picker>
            </Show>

            <button
              type="button"
              onClick={() => {
                setPickerRef2Visibility(true);
                pickerRef2[pickerExposeSymbol].open();
              }}
            >
              open
            </button>
          </section>
        </div>
      </section>

      <section>
        <h1>Wrapped style DatePicker</h1>

        <div>
          <TestDatePicker />
        </div>
      </section>
    </main>
  );
};
