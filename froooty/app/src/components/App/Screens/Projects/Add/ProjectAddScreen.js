import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { ProjectRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import ProjectForm from "../../../Shared/Projects/Form/ProjectForm";

const ProjectAddScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("projects.create.title"));

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
            <BackButton href={route(ProjectRoutes.Index)} />
            <PageHeader>
                <Title>{t("projects.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <ProjectForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ProjectAddScreen;
