import './App.css';
import Select, { SelectOption } from './component/Select/Select';
import { useState } from 'react';

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {

  const [valueSingle, setValueSingle] = useState<SelectOption | undefined>(options[0]);
  const [valueMultiple, setValueMultiple] = useState<SelectOption[]>([options[0]]);

  return (
    <>
      <Select options={options} value={valueSingle} onChange={(option) => setValueSingle(option)} />
      <br />
      <Select multiple options={options} value={valueMultiple} onChange={(option) => setValueMultiple(option)} />
    </>
  );
}

export default App;
