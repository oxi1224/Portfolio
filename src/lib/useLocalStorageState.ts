import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  startData: T
): [data: T, setState: (data: T) => void] {
  const [state, setState] = useState<T>(startData);
  const [_localStorage, setLocalStorage] = useState<Storage>();

  useEffect(() => {
    setLocalStorage(localStorage);
    let storedData = localStorage.getItem(key);
    if (!storedData) {
      localStorage.setItem(key, JSON.stringify(startData));
      storedData = localStorage.getItem(key)!;
    }
    if (storedData !== JSON.stringify(state)) setState(JSON.parse(storedData));
  }, [setLocalStorage, state, setState, key, startData]);

  function setAndSave(data: T) {
    setState(data);
    localStorage.setItem(key, JSON.stringify(data));
  }
  return [state, setAndSave];
}
