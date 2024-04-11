import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  startData: T
): [data: T, setState: (data: T) => void] {
  const [state, setState] = useState<T>(startData);
  const [_localStorage, setLocalStorage] = useState<Storage>();

  useEffect(() => {
    setLocalStorage(localStorage);
    const storedData = localStorage.getItem(key) || "null";
    if (storedData !== JSON.stringify(state)) setState(JSON.parse(storedData));
  }, [setLocalStorage, state, setState, key]);

  function setAndSave(data: T) {
    setState(data);
    localStorage.setItem(key, JSON.stringify(data));
  }
  return [state, setAndSave];
}
