import { createEffect, onCleanup, children as toChildren } from 'solid-js';
import type { WithPickerComponent } from './with-picker.component.types';

export var WithPicker: WithPickerComponent = (props) => {
  var children = toChildren(() => props.children);

  createEffect(() => {
    // const picker = toChildren(() => props.picker as HTMLElement);
    const picker = (children() as HTMLElement).querySelector(
      `[data-component-name="${datasetComponentName}"]`
    );

    console.log({ picker, children: children(), c2a: children.toArray() });

    onCleanup(() => {
      (picker() as HTMLElement).remove();
    });
  });

  return children();
};
