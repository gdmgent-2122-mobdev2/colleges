import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { ClientRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import ClientForm from "../../../Shared/Clients/Form/ClientForm";

const ClientAddScreen = () => {
    const { t } = useTranslation();
    useTitle("Add client");

    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/clients`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(ClientRoutes.Index);
            },
        });
    };

    return (
        <>
            <h1>{t("clients.create.title")}</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label="Create"
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ClientAddScreen;
