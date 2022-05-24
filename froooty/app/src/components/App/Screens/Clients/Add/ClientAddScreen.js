import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { ClientRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import ClientForm from "../../../Shared/Clients/Form/ClientForm";

const ClientAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useTitle(t("clients.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/clients`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(ClientRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(ClientRoutes.Index)} />
            <PageHeader>
                <Title>{t("clients.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ClientAddScreen;
