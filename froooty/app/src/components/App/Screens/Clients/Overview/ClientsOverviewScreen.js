import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, ClientRoutes } from "../../../../../core/routing";
import Table from "../../../../Design/Table/Table";
import TableRow from "../../../../Design/Table/TableRow";
import TableHeader from "../../../../Design/Table/TableHeader";

const ClientsOverviewScreen = () => {
    const { isLoading, data: clients, error } = useFetch("/clients");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Link to={ClientRoutes.New}>Add client</Link>
            <Table
                header={
                    <TableHeader>
                        <th>Id</th>
                        <th>name</th>
                        <th>contact</th>
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
