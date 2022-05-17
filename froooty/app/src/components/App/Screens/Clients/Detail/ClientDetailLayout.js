import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";

const ClientDetailLayout = () => {
    const { id } = useParams();

    const {
        isLoading,
        error,
        invalidate,
        data: client,
        // refresh,
    } = useFetch(`/clients/${id}`);

    useTitle(client ? client.name : "");

    const handleUpdate = () => {
        invalidate();
    };

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return <Outlet context={{ client, onClientUpdate: handleUpdate }} />;
};

export default ClientDetailLayout;
