import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { ClientRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const ClientDetailScreen = () => {
    const { t } = useTranslation();
    const { client } = useOutletContext();

    useTitle(client ? client.name : "");

    return (
        <>
            <BackButton href={route(ClientRoutes.Index)} />
            <PageHeader>
                <Title>{client.name}</Title>
            </PageHeader>
            <Link to={route(ClientRoutes.Edit, { id: client.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default ClientDetailScreen;
