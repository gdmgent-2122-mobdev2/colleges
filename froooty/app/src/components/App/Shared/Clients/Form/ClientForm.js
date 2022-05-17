import Button from "../../../../Design/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    name: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().email().required(),
});

const ClientForm = ({ initialData = {}, isDisabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        contactName: "",
        contactEmail: "",
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
            <h3>{t("clients.fields.contact")}</h3>
            <FormGroup>
                <Label htmlFor="contactName">{t("fields.name")}</Label>
                <Input
                    name="contactName"
                    value={values.contactName}
                    disabled={isDisabled}
                    onChange={handleChange}
                    error={errors.contactName}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="contactEmail">{t("fields.email")}</Label>
                <Input
                    name="contactEmail"
                    value={values.contactEmail}
                    disabled={isDisabled}
                    onChange={handleChange}
                    error={errors.contactEmail}
                />
            </FormGroup>
            <Button type="submit" disabled={isDisabled}>
                {label}
            </Button>
        </form>
    );
};

export default ClientForm;
