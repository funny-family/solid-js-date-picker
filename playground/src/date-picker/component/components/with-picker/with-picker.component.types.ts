import type { Component, JSX } from 'solid-js';

export type WithPickerComponentProps = {
  picker: JSX.Element;
  children: JSX.Element;
};

export type WithPickerComponent = Component<WithPickerComponentProps>;
