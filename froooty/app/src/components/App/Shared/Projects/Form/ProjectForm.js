import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import ClientSelect from "../../Clients/Select/ClientSelect";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    name: yup.string().required(),
    clientId: yup.number().nullable().required(),
});

const transformInitialData = (initialData) => {
    if (initialData.client) {
        initialData = {
            ...initialData,
            clientId: initialData.client.id,
        };
    }
    return initialData;
};

const ProjectForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        clientId: null,
        ...transformInitialData(initialData),
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
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="clientId">{t("fields.client")}</Label>
                <ClientSelect
                    name="clientId"
                    value={values.clientId}
                    onChange={handleChange}
                    error={errors.clientId}
                />
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default ProjectForm;
