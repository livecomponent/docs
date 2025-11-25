import { live, LiveController, ReactRegistry } from "@camertron/live-component";
import { useState } from "react";

export const Counter = ({ initValue }: { initValue: number }) => {
  const [value, setValue] = useState(initValue);

  return(
    <>
      <div>{value}</div>
      <button onClick={() => setValue(value + 1)}>
        Increment
      </button>
    </>
  );
};

ReactRegistry.register_component("Counter", Counter);

type CounterComponentProps = {
  initValue: number;
}

@live("CounterComponent")
export class CounterComponent extends LiveController<CounterComponentProps> {
  do_something() {
    this.render((component) => {
      // Your logic here. When the component re-renders, props will automatically
      // get passed to the React component.
    });
  }
}
