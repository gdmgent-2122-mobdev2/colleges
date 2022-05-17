import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { formatName } from "../../../../../core/modules/users/utils";
import { UserRoutes, route } from "../../../../../core/routing";

const UserDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();
    return (
        <>
            <h1>{formatName(user)}</h1>
            <p>{user.email}</p>
            <Link to={route(UserRoutes.Edit, { id: user.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default UserDetailScreen;
