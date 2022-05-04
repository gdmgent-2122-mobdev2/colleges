import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { ClientRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import ClientForm from "../../../Shared/Clients/Form/ClientForm";

const ClientAddScreen = () => {
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/clients`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(ClientRoutes.Index);
            },
        });
    };

    return (
        <>
            <h1>Add client</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <ClientForm
                label="Create"
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ClientAddScreen;
