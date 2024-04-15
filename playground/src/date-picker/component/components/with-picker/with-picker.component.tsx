import { createEffect, onCleanup, children as toChildren } from 'solid-js';
import type { WithPickerComponent } from './with-picker.component.types';
import {
  datasetElementName as picker_datasetElementName,
  pickerExposeSymbol,
  type PickerRef,
} from '../picker';
import { datasetElementName as dateInput_datasetElementName } from '../../date-picker.component';

export var WithPicker: WithPickerComponent = (props) => {
  var children = toChildren(() => props.children);

  createEffect(() => {
    var pickerRef = (children() as HTMLElement).querySelector<PickerRef>(
      `[data-element-name="${picker_datasetElementName}"]`
    );

    var dateInputRef = (
      children() as HTMLElement
    ).querySelector<HTMLInputElement>(
      `[data-element-name="${dateInput_datasetElementName}"]`
    );

    if (pickerRef != null && dateInputRef != null) {
      const showPicker = dateInputRef.showPicker;
      dateInputRef.showPicker = function () {
        // if (keepNativePicker()) {
        //   showPicker.call(this);
        // } else {
        //   setPickerVisibility(true);
        // }

        pickerRef![pickerExposeSymbol].show();
      };
    }

    console.log({
      pickerRef,
      dateInputRef,
      children: children(),
      c2a: children.toArray(),
    });

    onCleanup(() => {
      if (picker != null) {
        picker.remove();
      }
    });
  });

  return children();
};
