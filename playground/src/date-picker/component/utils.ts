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
