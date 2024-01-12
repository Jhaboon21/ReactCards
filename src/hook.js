import { useEffect, useState } from "react";
import axios from "axios";

function useFlip(initialFlipState = true) {
    const [isFacingUp, setIsFacingUp] = useState(initialFlipState);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
}

function useAxios(localKey, baseUrl) {
  const [response, setResponse] = useLocalStorageState(localKey)
  const addResponseData = async (formatter = data => data, restOfUrl = "") => {
    const res = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponse(data => [...data, formatter(res.data)]);
  };

  const clearResponse = () => setResponse([]);

  return [response, addResponseData, clearResponse];
}

function useLocalStorageState(key, defaultValue = []) {
  // const [state, setState] = useState(() => {
  //   let value = JSON.parse(window.localStorage.getItem(key) || defaultValue);
  //   return value;
  // });

  // useEffect(() => {
  //   window.localStorage.setItem(key, state)
  // }, [key, state])

  // return [state, setState];
  if (localStorage.getItem(key)) {
    defaultValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorageState;

export { useFlip, useAxios, useLocalStorageState };