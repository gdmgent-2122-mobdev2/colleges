import { useEffect, useState } from "react";

const useApi = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let isCurrent = true;
    fetch(`${process.env.REACT_APP_API_URL}${path}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
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

export default useApi;
