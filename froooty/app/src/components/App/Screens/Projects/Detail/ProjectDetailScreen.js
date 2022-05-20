import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { ProjectRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const ProjectDetailScreen = () => {
    const { t } = useTranslation();
    const { project } = useOutletContext();

    useTitle(t(project ? project.name : ""));

    return (
        <>
            <BackButton href={route(ProjectRoutes.Index)} />
            <PageHeader>
                <Title>{project.name}</Title>
                <Button href={route(ProjectRoutes.Edit, { id: project.id })}>
                    {t("buttons.edit")}
                </Button>
            </PageHeader>
            <p>{project.client?.name}</p>
        </>
    );
};

export default ProjectDetailScreen;
