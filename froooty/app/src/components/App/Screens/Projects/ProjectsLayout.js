import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import useTitle from "../../../../core/hooks/useTitle";

const ProjectsLayout = () => {
    const { t } = useTranslation();
    useTitle(t("projects.title"));

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ProjectsLayout;
