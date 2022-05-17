import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { ProjectRoutes, route } from "../../../../../core/routing";

const ProjectDetailScreen = () => {
    const { t } = useTranslation();
    const { project } = useOutletContext();
    return (
        <>
            <h1>{project.name}</h1>
            <p>{project.client?.name}</p>
            <Link to={route(ProjectRoutes.Edit, { id: project.id })}>
                {t("buttons.edit")}
            </Link>
        </>
    );
};

export default ProjectDetailScreen;
