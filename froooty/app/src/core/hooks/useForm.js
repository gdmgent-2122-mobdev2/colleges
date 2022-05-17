import { useCallback, useEffect, useRef, useState } from "react";
import { getValidationErrors } from "../helpers/validation";

const useForm = (initialSchema, initialData) => {
    const [isTouched, setIsTouched] = useState(false);
    const [values, setValues] = useState({ ...initialData });
    const [errors, setErrors] = useState({});

    const schemaRef = useRef(initialSchema);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = useCallback(async (values, onSuccess) => {
        try {
            const isValid = await schemaRef.current.validate(values, {
                abortEarly: false,
            });

            if (isValid) {
                // clear errors
                setErrors({});
                // call onSuccess callback if exists
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (errors) {
            setErrors(getValidationErrors(errors));
        }
    }, []);

    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();
        setIsTouched(true);
        await validate(values, () => {
            callback(values);
        });
    };

    useEffect(() => {
        if (isTouched) {
            validate(values);
        }
    }, [validate, values, isTouched]);

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
    };
};

export default useForm;
