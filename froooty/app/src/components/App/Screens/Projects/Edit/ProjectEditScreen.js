import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { ProjectRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import ProjectForm from "../../../Shared/Projects/Form/ProjectForm";

const ProjectEditScreen = () => {
    const { t } = useTranslation();
    const { project, onProjectUpdate } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("projects.edit.title"));

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/projects`, {
            method: "POST",
            data,
            onSuccess: () => {
                onProjectUpdate();
                navigate(route(ProjectRoutes.Detail, { id: project.id }));
            },
        });
    };

    return (
        <>
            <BackButton
                href={route(ProjectRoutes.Detail, { id: project.id })}
            />
            <PageHeader>
                <Title>{t("projects.edit.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <ProjectForm
                label={t("buttons.save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={project}
            />
        </>
    );
};

export default ProjectEditScreen;
