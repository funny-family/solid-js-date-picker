import {
  onMount,
  type Component,
  type JSX,
  Show,
  createSignal,
  createEffect,
} from 'solid-js';
import { DatePicker } from './date-picker';
import { DatePicker as DatePicker1 } from './date-picker1/date-picker.component';

var DP = (attrsAndProps) => {
  var dateInputRef = attrsAndProps?.ref as any;
  // const [dateInputRef, setDateInputRef] = createSignal(second)

  return (
    <input
      type="date"
      ref={(el) => {
        dateInputRef = el;
      }}
    />
  );
};

export const App: Component = () => {
  var datePickerRef = null as any;

  createEffect(() => {
    console.log(12313131, { datePickerRef });
    window.datePickerRef = datePickerRef;
  });

  return (
    <main>
      <DatePicker
        min="2018-01-01"
        max="2024-12-31"
        name="123131"
        value="2018-12-12"
        autocomplete="YEAR"
        ref={(el) => {
          console.log(12313131, el);

          datePickerRef = el;
        }}
        // ref={datePickerRef}
        // children={({ TextInput, DateInput }) => {
        //   return (
        //     <>
        //       <div>1</div>
        //       <TextInput />
        //       <DateInput />
        //       <div>2</div>
        //     </>
        //   );
        // }}
      />

      <hr />

      <div style={{ height: '50px' }} />

      <DatePicker1 placeholder="dd-mm-yyyy" />

      {/* <DatePicker1 style={{ margin: '4em' }}>
        {() => {
          return 1111;
        }}
      </DatePicker1> */}

      {/* <DP
        ref={(el) => {
          console.log(989898, el);
        }}
      /> */}
    </main>
  );
};
