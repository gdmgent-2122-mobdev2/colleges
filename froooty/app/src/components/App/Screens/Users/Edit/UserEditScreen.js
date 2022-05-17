import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { UserRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserEditScreen = () => {
    const { t } = useTranslation();
    const { user, onUserUpdate } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            onSuccess: () => {
                onUserUpdate();
                navigate(route(UserRoutes.Detail, { id: user.id }));
            },
        });
    };

    return (
        <>
            <h1>{t("users.edit.title")}</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <UserForm
                label={t("buttons.save")}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
                initialData={user}
            />
        </>
    );
};

export default UserEditScreen;
