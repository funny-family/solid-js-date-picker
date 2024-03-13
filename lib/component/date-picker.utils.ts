import {
  D_REGEXP,
  M_REGEXP,
  SEPARATOR_DASH,
  SEPARATOR_PERIOD,
  SEPARATOR_SLASH,
  SEPARATOR_SPACE,
  Y_REGEXP,
} from './date-picker.constants';

type FormatStringArray = string[];

type O = {
  value: string;
  index: number;
};

type FormatObject = {
  day: O;
  month: O;
  year: O;
};

type GetFormatObject = (formatStringArray: FormatStringArray) => FormatObject;
var getFormatObject: GetFormatObject = (formatStringArray) => {
  return formatStringArray.reduce(
    (accumulator, currentValue, currentIndex) => {
      if (D_REGEXP.test(currentValue)) {
        accumulator.day.value = currentValue;
        accumulator.day.index = currentIndex;
      }

      if (M_REGEXP.test(currentValue)) {
        accumulator.month.value = currentValue;
        accumulator.month.index = currentIndex;
      }

      if (Y_REGEXP.test(currentValue)) {
        accumulator.year.value = currentValue;
        accumulator.year.index = currentIndex;
      }

      return accumulator;
    },
    {
      day: {
        value: '',
        index: 0,
      },
      month: {
        value: '',
        index: 0,
      },
      year: {
        value: '',
        index: 0,
      },
    }
  );
};

type FormatStringToArray = (formatString: string) => FormatStringArray;
var formatStringToArray: FormatStringToArray = (formatString) => {
  if (formatString.includes(SEPARATOR_SLASH)) {
    return formatString.split(SEPARATOR_SLASH);
  } else if (formatString.includes(SEPARATOR_PERIOD)) {
    return formatString.split(SEPARATOR_PERIOD);
  } else if (formatString.includes(SEPARATOR_DASH)) {
    return formatString.split(SEPARATOR_DASH);
  } else if (formatString.includes(SEPARATOR_SPACE)) {
    return formatString.split(SEPARATOR_SPACE);
  }

  throw new Error(
    `Separator must be ${SEPARATOR_SLASH} or ${SEPARATOR_PERIOD} or ${SEPARATOR_DASH} or ${SEPARATOR_SPACE}`
  );
};

export type ParseFormat = (formatString: string) => Record<string, any>;
export var parseFormat: ParseFormat = (formatString) => {
  const formatStringArray = formatStringToArray(formatString);
  const formatObject = getFormatObject(formatStringArray);

  console.log({ formatStringArray, formatObject });

  return {
    //
  };
};

export var pickerController = (ref: HTMLDialogElement) => {
  var picker = {
    ref,
    open: () => {
      ref.showModal();
    },
    close: () => {
      ref.close();
    },
    closeOnBackgroundClick: (
      event: MouseEvent & {
        currentTarget: HTMLDialogElement;
        target: Element;
      }
    ) => {
      if (
        event.offsetX < 0 ||
        event.offsetX > (event.target as HTMLElement).offsetWidth ||
        event.offsetY < 0 ||
        event.offsetY > (event.target as HTMLElement).offsetHeight
      ) {
        ref.close();
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
      }
    },
  };

  return picker;
};
