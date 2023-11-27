import { useState } from 'react';

type UseInputResult<T> = [
  value: T,
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void,
  reset: () => void,
];

const useInputTest = <T,>(initialValue: T): UseInputResult<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value as any);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [value, onChange, reset];
};

export default useInputTest;
