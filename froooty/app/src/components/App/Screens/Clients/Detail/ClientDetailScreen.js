import { Link, useOutletContext } from "react-router-dom";
import { ClientRoutes, route } from "../../../../../core/routing";

const ClientDetailScreen = () => {
    const { client } = useOutletContext();
    return (
        <>
            <h1>{client.name}</h1>
            <Link to={route(ClientRoutes.Edit, { id: client.id })}>Edit</Link>
        </>
    );
};

export default ClientDetailScreen;
