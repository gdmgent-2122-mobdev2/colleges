import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import useTitle from "../../../../core/hooks/useTitle";

const UsersLayout = () => {
    const { t } = useTranslation();
    useTitle(t("users.title"));

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default UsersLayout;
