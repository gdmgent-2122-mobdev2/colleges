import { useState } from "react";
import useAuthApi from "./useAuthApi";

const useMutation = () => {
    const { authFetch } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // method is pretty long, so async/await looks better than Promise.then()
    const mutate = async (url, options = {}) => {
        setIsLoading(true);

        let headers = {};
        if (!options.multipart) {
            headers = {
                "accept": "application/json",
                "content-type": "application/json",
            };
        }

        try {
            let body;
            let data = options.data ?? {};
            console.log(options);
            if (options.multipart) {
                body = new FormData();
                for (const name in data) {
                    console.log(name);
                    body.append(name, data[name]);
                }
                console.log("multipart", body);
            } else {
                body = JSON.stringify(data);
            }
            const result = await authFetch(url, {
                method: options.method ?? "POST",
                headers: headers,
                body: body,
            });

            if (options.onSuccess) {
                options.onSuccess(result);
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
