import { useState } from "react";
import useAuthApi from "./useAuthApi";

const useMutation = () => {
    const { authFetch } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // method is pretty long, so async/await looks better than Promise.then()
    const mutate = async (url, options = {}) => {
        setIsLoading(true);

        const headers = {
            "accept": "application/json",
            "content-type": "application/json",
        };

        try {
            const data = await authFetch(url, {
                method: options.method ?? "POST",
                headers: headers,
                body: JSON.stringify(options.data ?? {}),
            });

            if (options.onSuccess) {
                options.onSuccess(data);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            if (options.onError) {
                options.onError(String(error));
            } else {
                setIsLoading(false);
                setError(String(error));
            }
        }
    };

    return {
        isLoading,
        error,
        mutate,
    };
};

export default useMutation;
