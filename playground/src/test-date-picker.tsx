import { DatePicker, WithPicker, DatePickerRef } from './date-picker';
import {
  Picker,
  type PickerRef,
  pickerExposeSymbol,
} from './date-picker/component/components/picker';

export const TestDatePicker = () => {
  var datePickerRef: DatePickerRef = null as any;

  var DP = (
    <WithPicker>
      <DatePicker
        ref={(el) => {
          datePickerRef = el;
        }}
      >
        {() => {
          var pickerRef: PickerRef = null as any;

          return (
            <>
              <Picker ref={pickerRef}>12313</Picker>

              <button
                type="button"
                onClick={(event) => {
                  // pickerRef[pickerExposeSymbol].open();
                  console.log('datePickerRef:', { datePickerRef });
                  datePickerRef.showPicker();
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
