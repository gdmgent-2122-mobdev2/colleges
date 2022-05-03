import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { ClientRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import ClientForm from "../Form/ClientForm";

const ClientEditScreen = () => {
    const { client, onClientUpdate } = useOutletContext();
    const navigate = useNavigate();

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
            <h1>Add client</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label="Save"
                isDisabled={isLoading}
                onSubmit={handleSubmit}
                initialData={client}
            />
        </>
    );
};

export default ClientEditScreen;
