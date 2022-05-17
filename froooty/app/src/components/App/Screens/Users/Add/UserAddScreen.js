import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(UserRoutes.Index);
            },
        });
    };

    return (
        <>
            <h1>{t("users.create.title")}</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <UserForm
                label={t("buttons.create")}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default UserAddScreen;
