import { useState } from 'react';

// 나중에 setValue 빼는거 고려하기
// T를 사용하는 이유는 이 타입이 다양한 종류의 값에 대해 사용될 수 있도록 하기 위해
// 문자열, 숫자, 객체 등 여러 종류의 입력 값을 다룰 때 동일한 로직을 사용하고자 할 때 T를 사용
type UseInputResult<T> = [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void,
  reset: () => void,
];

const useInput = <T,>(initialValue: T): UseInputResult<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value as any);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [value, setValue, onChange, reset];
};

export default useInput;
