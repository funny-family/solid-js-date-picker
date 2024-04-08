import { createEffect, onCleanup, children as toChildren } from 'solid-js';
import type { WithPickerComponent } from './with-picker.component.types';

export var WithPicker: WithPickerComponent = (props) => {
  var children = toChildren(() => props.children);

  createEffect(() => {
    const picker = toChildren(() => props.picker as HTMLElement);

    console.log({ picker: picker() });

    onCleanup(() => {
      (picker() as HTMLElement).remove()
    })
  });

  return children();
};
