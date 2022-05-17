import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, ClientRoutes } from "../../../../../core/routing";
import Table from "../../../../Design/Table/Table";
import TableRow from "../../../../Design/Table/TableRow";
import TableHeader from "../../../../Design/Table/TableHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import { useTranslation } from "react-i18next";

const ClientsOverviewScreen = () => {
    const { t } = useTranslation();
    useTitle(t("clients.overview.title"));

    const { isLoading, data: clients, error } = useFetch("/clients");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <h1>{t("clients.overview.title")}</h1>
            <Link to={ClientRoutes.New}>{t("clients.overview.create")}</Link>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.id")}</th>
                        <th>{t("fields.name")}</th>
                        <th>{t("clients.fields.contact")}</th>
                    </TableHeader>
                }>
                {clients.map((client) => (
                    <TableRow key={client.id}>
                        <td>{client.id}</td>
                        <td>
                            <Link
                                to={route(ClientRoutes.Detail, {
                                    id: client.id,
                                })}>
                                {client.name}
                            </Link>
                        </td>
                        <td>
                            {client.contactName} ({client.contactEmail})
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default ClientsOverviewScreen;
