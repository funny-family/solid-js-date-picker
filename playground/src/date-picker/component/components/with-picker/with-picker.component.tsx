import { createEffect, onCleanup, children as toChildren } from 'solid-js';
import type { WithPickerComponent } from './with-picker.component.types';
import { datasetElementName as picker_datasetElementName } from '../picker/picker.component';
import { datasetElementName as dateInput_datasetElementName } from '../../date-picker.component';

export var WithPicker: WithPickerComponent = (props) => {
  var children = toChildren(() => props.children);

  createEffect(() => {
    var picker = (children() as HTMLElement).querySelector(
      `[data-element-name="${picker_datasetElementName}"]`
    );

    var dateInput = (children() as HTMLElement).querySelector(
      `[data-element-name="${dateInput_datasetElementName}"]`
    );

    console.log({
      picker,
      dateInput,
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
