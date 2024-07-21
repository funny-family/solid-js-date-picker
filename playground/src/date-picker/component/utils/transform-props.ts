import { reflect } from 'typescript-rtti';
import { JSX } from 'solid-js';

console.log(reflect<JSX.IntrinsicElements['input']>().as('interface'));
