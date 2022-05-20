import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import {
    route,
    ProjectRoutes,
    ClientRoutes,
} from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Buttons/DeleteButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import useTitle from "../../../../../core/hooks/useTitle";

const ProjectsOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: projects,
        error,
        invalidate,
    } = useFetch("/projects");

    useTitle(t("projects.title"));

    const handleProjectDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("projects.overview.title")}</Title>
                <Button href={ProjectRoutes.New}>
                    {t("projects.overview.create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.client")}</th>
                        <th></th>
                    </TableHeader>
                }>
                {projects.map((project) => (
                    <TableRow key={project.id}>
                        <td>
                            <Link
                                to={route(ProjectRoutes.Detail, {
                                    id: project.id,
                                })}>
                                {project.name}
                            </Link>
                        </td>
                        <td>
                            <Link
                                to={route(ClientRoutes.Detail, {
                                    id: project.client.id,
                                })}>
                                {project.client.name}
                            </Link>
                        </td>
                        <td>
                            <DeleteButton
                                size="sm"
                                scope="projects"
                                id={project.id}
                                onSuccess={handleProjectDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default ProjectsOverviewScreen;
