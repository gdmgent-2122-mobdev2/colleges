import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { ProjectRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import ProjectForm from "../../../Shared/Projects/Form/ProjectForm";

const ProjectEditScreen = () => {
    const { t } = useTranslation();
    const { project, onProjectUpdate } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

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
            <h1>{t("projects.edit.title")}</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <ProjectForm
                label={t("buttons.save")}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
                initialData={project}
            />
        </>
    );
};

export default ProjectEditScreen;
