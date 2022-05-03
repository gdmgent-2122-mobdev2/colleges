import { Outlet } from "react-router-dom";

const ClientsLayout = () => {
    return (
        <div>
            <h2>Clients</h2>
            <Outlet />
        </div>
    );
};

export default ClientsLayout;
