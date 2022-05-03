import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../../Shared/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { route, ClientRoutes } from "../../../../../core/routing";

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
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link
                            to={route(ClientRoutes.Detail, { id: client.id })}>
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ClientsOverviewScreen;
