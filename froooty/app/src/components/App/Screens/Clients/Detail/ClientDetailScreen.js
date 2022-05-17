import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { ClientRoutes, route } from "../../../../../core/routing";

const ClientDetailScreen = () => {
    const { t } = useTranslation();
    const { client } = useOutletContext();
    return (
        <>
            <h1>{client.name}</h1>
            <Link to={route(ClientRoutes.Edit, { id: client.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default ClientDetailScreen;
