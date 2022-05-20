import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { ClientRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import ClientForm from "../../../Shared/Clients/Form/ClientForm";

const ClientEditScreen = () => {
    const { t } = useTranslation();
    const { client, onClientUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("clients.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/clients`, {
            method: "POST",
            data,
            onSuccess: () => {
                onClientUpdate();
                navigate(route(ClientRoutes.Detail, { id: client.id }));
            },
        });
    };

    return (
        <>
            <BackButton href={route(ClientRoutes.Detail, { id: client.id })} />
            <PageHeader>
                <Title>{t("clients.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={client}
            />
        </>
    );
};

export default ClientEditScreen;
