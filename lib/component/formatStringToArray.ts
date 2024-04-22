import {
  SEPARATOR_DASH,
  SEPARATOR_PERIOD,
  SEPARATOR_SLASH,
} from './date-picker.constants';
import { FormatStringToArray } from './date-picker.utils';

var formatStringToArray: FormatStringToArray = (formatString) => {
  if (formatString.includes(SEPARATOR_SLASH)) {
    return;
  } else if (formatString.includes(SEPARATOR_PERIOD)) {
    //
  } else if (formatString.includes(SEPARATOR_DASH)) {
    //
  } else if (formatString.includes(SEPARATOR_SPACE)) {
    //
  }
};
