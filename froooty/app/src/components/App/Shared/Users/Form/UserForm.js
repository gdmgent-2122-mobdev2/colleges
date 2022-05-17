import Button from "../../../../Design/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    name: yup.string().required(),
});

const UserForm = ({ initialData = {}, isDisabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    disabled={isDisabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <Button type="submit" disabled={isDisabled}>
                {label}
            </Button>
        </form>
    );
};

export default UserForm;
