import {
    ClientRoutes,
    LogRoutes,
    ProjectRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { isAdmin } from "../../../../../core/modules/users/utils";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const location = useLocation();
    const { logout } = useAuthContext();

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
        {
            href: LogRoutes.Index,
            isActive: location.pathname.includes(LogRoutes.Index),
            label: t("navigation.logs"),
        },
    ];

    // admin only routes
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

    return <NavBar onLogout={logout} navItems={items} />;
};

export default Header;
