import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  PickerAttrsAndProps,
  PickerComponent,
  PickerExpose,
  PickerExposeObject,
} from './picker.component.types';
import { isArray, openEventName } from '../../../utils';
import './picker.styles.scss';

export var pickerExposeSymbol = Symbol('Picker') as any as 'Picker';

export var Picker: PickerComponent = (attrsAndProps) => {
  var pickerRef: HTMLDialogElement & PickerExposeObject = null as any;

  var [props, attrs] = splitProps(attrsAndProps, [
    'shouldCloseOnBackgroundClick',
    'onOpen',
  ]);

  const shouldCloseOnBackgroundClick = () =>
    props?.shouldCloseOnBackgroundClick == null
      ? true
      : props.shouldCloseOnBackgroundClick;

  var isOpenEventLocked = false;
  const openEvent = new CustomEvent(openEventName, {
    detail: null,
    bubbles: true,
    cancelable: true,
    composed: true,
  });
  const onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    if (props?.onOpen == null) {
      return;
    }

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
  };

  var open: PickerExpose['open'] = () => {
    pickerRef.showModal();

    if (isOpenEventLocked === false) {
      pickerRef.dispatchEvent(openEvent);
    }

    isOpenEventLocked = true;
  };

  var close: PickerExpose['close'] = () => {
    pickerRef.close();
  };

  var ref: (el: HTMLDialogElement) => void = (el) => {
    (pickerRef as unknown) = el;

    (pickerRef as any)[pickerExposeSymbol] = {
      open,
      close,
    } satisfies PickerExpose;
  };

  const onClick: PickerAttrsAndProps['onClick'] = (event) => {
    if (
      event.offsetX < 0 ||
      event.offsetX > (event.target as HTMLElement).offsetWidth ||
      event.offsetY < 0 ||
      event.offsetY > (event.target as HTMLElement).offsetHeight
    ) {
      if (shouldCloseOnBackgroundClick()) {
        pickerRef.close();
      }
    }

    if (attrs?.onClick == null) {
      return;
    }

    if (typeof attrs.onClick === 'function') {
      attrs.onClick(event);
    }

    if (isArray(attrs.onClick)) {
      // handler(data, event);
      attrs.onClick[0](attrs.onClick[1], event);
    }
  };

  onMount(() => {
    pickerRef.addEventListener(openEventName, onOpen);
  });

  onCleanup(() => {
    pickerRef.removeEventListener(openEventName, onOpen);
  });

  return (
    <dialog
      {...(attrs as any)}
      ref={ref}
      class={`${attrs?.class || ''} solid-js-date-picker-picker`}
      onClick={(event) => onClick(event as any)}
    />
  );
};
