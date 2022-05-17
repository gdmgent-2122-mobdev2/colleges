import { useAuthContext } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import {
    ClientRoutes,
    ProjectRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAdmin } from "../../../../../core/modules/users/utils";

const Header = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const {
        auth: { user },
        logout,
    } = useAuthContext();

    // default routes
    let items = [
        {
            href: ClientRoutes.Index,
            isActive: location.pathname.includes(ClientRoutes.Index),
            label: t("navigation.clients"),
        },
        {
            href: ProjectRoutes.Index,
            isActive: location.pathname.includes(ProjectRoutes.Index),
            label: t("navigation.projects"),
        },
    ];

    if (isAdmin(user)) {
        items = [
            ...items,
            {
                href: UserRoutes.Index,
                isActive: location.pathname.includes(UserRoutes.Index),
                label: t("navigation.users"),
            },
        ];
    }

    return <NavBar navItems={items} onLogout={logout} />;
};

export default Header;
