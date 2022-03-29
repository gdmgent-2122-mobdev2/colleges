import { useState } from "react";
import { handleErrors } from "../helpers/api";

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const mutate = (url, options = {}) => {
    setIsLoading(true);

    fetch(url, {
      method: options.method ?? "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data ?? {}),
    })
      .then(handleErrors)
      .then((data) => {
        // hier success functie
        if (options.onSuccess) {
          options.onSuccess(data);
        } else {
        }
      })
      .catch((error) => {
        if (options.onError) {
          options.onError(String(error));
        } else {
          setIsLoading(false);
          setError(String(error));
        }
      });
  };

  return {
    isLoading,
    error,
    mutate,
  };
};

export default useMutation;
