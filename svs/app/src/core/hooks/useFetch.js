import { useEffect, useState } from "react";
import { handleErrors } from "../helpers/api";

const useFetch = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let isCurrent = true;
    fetch(`${process.env.REACT_APP_API_URL}${path}`)
      .then(handleErrors)
      .then((data) => isCurrent && setData(data))
      .catch((error) => isCurrent && setError(String(error)));

    return () => (isCurrent = false);
  }, [path]);

  const isLoading = !error && !data;

  return {
    isLoading,
    data,
    error,
  };
};

export default useFetch;
