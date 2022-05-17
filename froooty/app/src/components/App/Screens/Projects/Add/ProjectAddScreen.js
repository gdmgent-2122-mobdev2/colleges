import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { ProjectRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import ProjectForm from "../../../Shared/Projects/Form/ProjectForm";

const ProjectAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/projects`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(ProjectRoutes.Index);
            },
        });
    };

    return (
        <>
            <h1>{t("projects.create.title")}</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <ProjectForm
                label={t("buttons.create")}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ProjectAddScreen;
