import React, { useState } from "react";

import { TaskProps } from '../components/Task/Task';

type CallbackFunction = (value: string | TaskProps[]) => void;

const useLocalStorage = (key: string, initialValue: string | TaskProps[]): [string, CallbackFunction] => {
  // State retrieved from local storage or default as initial value provided
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  });

  // Save to local storage
  const setValue = (valueToStore: string | TaskProps[]): void => {
    try {
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;