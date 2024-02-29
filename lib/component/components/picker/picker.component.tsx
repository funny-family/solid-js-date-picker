import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  PickerAttrsAndProps,
  PickerComponent,
  PickerExpose,
  PickerExposeObject,
} from './picker.component.types';
import {
  falseAsString,
  isArray,
  openEventName,
  trueAsString,
} from '../../../utils';
import './picker.styles.scss';

export var pickerExposeSymbol = Symbol('Picker') as any as 'Picker';

var datasetOpen = 'data-open' as const;

export var Picker: PickerComponent = (attrsAndProps) => {
  var [props, attrs] = splitProps(attrsAndProps, [
    'shouldCloseOnBackgroundClick',
    'onOpen',
  ]);

  var pickerRef: HTMLDialogElement & PickerExposeObject = attrs?.ref as any;

  const shouldCloseOnBackgroundClick = () =>
    props?.shouldCloseOnBackgroundClick == null
      ? true
      : props.shouldCloseOnBackgroundClick;

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

    if (pickerRef.dataset.open === falseAsString) {
      pickerRef.dispatchEvent(openEvent);
    }

    pickerRef.setAttribute(datasetOpen, trueAsString);
  };

  var close: PickerExpose['close'] = () => {
    pickerRef.close();
    pickerRef.setAttribute(datasetOpen, falseAsString);
  };

  const onClick: PickerAttrsAndProps['onClick'] = (event) => {
    if (
      event.offsetX < 0 ||
      event.offsetX > (event.target as HTMLElement).offsetWidth ||
      event.offsetY < 0 ||
      event.offsetY > (event.target as HTMLElement).offsetHeight
    ) {
      if (shouldCloseOnBackgroundClick()) {
        close();
      }
    }

    if (attrs?.onClick != null) {
      if (typeof attrs.onClick === 'function') {
        attrs.onClick(event);
      }

      if (isArray(attrs.onClick)) {
        // handler(data, event);
        attrs.onClick[0](attrs.onClick[1], event);
      }
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
      data-open={falseAsString}
      {...(attrs as any)}
      ref={(el) => {
        (pickerRef as any) = el;

        (pickerRef as any)[pickerExposeSymbol] = {
          open,
          close,
        } satisfies PickerExpose;
      }}
      class={`${attrs?.class || ''} solid-js-date-picker-picker`}
      onClick={(event) => onClick(event as any)}
    />
  );
};
