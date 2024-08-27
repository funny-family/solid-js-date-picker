import { INPUT_DATE_CONTENT_ATTRS_OBJECT } from './date-picker.props';

export var hasInputRelatedAttr = (
  target: HTMLInputElement,
  property: string | symbol
) => {
  return Reflect.has(
    target,
    (INPUT_DATE_CONTENT_ATTRS_OBJECT as any)?.[property]?.[0]
  );
};

export var f = (str: string) => {
  var result = {
    splitter: '',
    splitted: {
      day: new Array(),
      month: new Array(),
      year: new Array(),
    },
  };

  var pushToSplitted = (arr: unknown[], s: string, i: number) => {
    return arr.push({
      value: s,
      index: i,
    });
  };

  for (var i = 0; i < str.length; i++) {
    var char = str[i];

    if (char === 'd' || char === 'D') {
      pushToSplitted(result.splitted.day, char, i);
    } else if (char === 'm' || char === 'M') {
      pushToSplitted(result.splitted.month, char, i);
    } else if (char === 'y' || char === 'Y') {
      pushToSplitted(result.splitted.year, char, i);
    } else {
      result.splitter = char;
    }
  }

  return result;
};

export type Separator = '/' | '.' | '-' | ' ';
export type Day = 'd' | 'D';
export type Month = 'm' | 'M';
export type Year = 'y' | 'Y';

// //prettier-ignore
// /**
//  * @example
//  * var format = createFormat('.', 'd', 'm', 'y');
//  * console.log(format); // 'dd.mm.yyyy'
//  */
// export var createFormat = (
//   separator: Separator,
//   day: Day,
//   month: Month,
//   year: Year,
// ): string => {
//   var day = 
// };

export var createChangeEvent = <TEvent extends Event>(event: Event) => {
  const onChange = (event: TEvent) => {};
};
