import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  PickerComponent,
  PickerExpose,
  PickerRef,
} from './picker.component.types';
import { isArray, openEventName } from '../../../utils';
import './picker.styles.css';

export var pickerExposeSymbol = Symbol('Picker') as any as 'Picker';

export var Picker: PickerComponent = (attrsAndProps) => {
  var pickerRef = null as any as PickerRef;

  var [props, attrs] = splitProps(attrsAndProps, ['onOpen']);

  const openEvent = new CustomEvent(openEventName);
  const onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    if (props?.onOpen != null) {
      if (typeof props.onOpen === 'function') {
        props.onOpen(
          event as Event & {
            currentTarget: HTMLElement;
            target: Element;
          }
        );
      }

      if (isArray(props.onOpen)) {
        // handler(data, event);
        props.onOpen[0](props.onOpen[1], event);
      }
    }
  };

  var open: PickerExpose['open'] = () => {
    pickerRef.showModal();
    pickerRef.dispatchEvent(openEvent);
  };

  var close: PickerExpose['close'] = () => {
    pickerRef.close();
  };

  var ref: (el: HTMLDialogElement) => void = (el) => {
    (pickerRef as unknown) = el;

    (pickerRef as any)[pickerExposeSymbol] = {
      open,
      close,
    };
  };

  onMount(() => {
    pickerRef.addEventListener(openEventName, onOpen);
  });

  onCleanup(() => {
    pickerRef.removeEventListener(openEventName, onOpen);
  });

  return <dialog ref={ref} {...attrs} />;
};
