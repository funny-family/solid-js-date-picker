import { type Component, type JSX } from 'solid-js';
import { DatePicker } from './solid-js-date-picker';
import './app.styles.css';

export const App: Component = () => {
  return (
    <main>
      <section>
        <h1>DatePicker</h1>
        <div>
          <DatePicker />
        </div>
      </section>
    </main>
  );
};
