import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, ClientRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";

const ClientsOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: clients,
        error,
        invalidate,
    } = useFetch("/clients");

    useTitle(t("clients.title"));

    const handleClientDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("clients.overview.title")}</Title>
                <Button href={ClientRoutes.New}>
                    {t("clients.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th></th>
                        <th>{t("fields.name")}</th>
                        <th>{t("clients.fields.contact")}</th>
                        <th></th>
                    </TableHeader>
                }>
                {clients.map((client) => (
                    <TableRow key={client.id}>
                        <td>
                            {!isVoid(client.avatar) && (
                                <img
                                    style={{ width: "3rem", height: "3rem" }}
                                    src={getImagePath(client.avatar)}
                                    alt={client.name}
                                />
                            )}
                        </td>
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
                        <td>
                            <DeleteButton
                                size="sm"
                                id={client.id}
                                scope="clients"
                                onSuccess={handleClientDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default ClientsOverviewScreen;
