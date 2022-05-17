import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import {
    route,
    ProjectRoutes,
    ClientRoutes,
} from "../../../../../core/routing";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const ProjectsOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: projects, error } = useFetch("/projects");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <h1>{t("projects.overview.title")}</h1>
            <Link to={ProjectRoutes.New}>{t("projects.overview.create")}</Link>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.id")}</th>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.client")}</th>
                    </TableHeader>
                }>
                {projects.map((project) => (
                    <TableRow key={project.id}>
                        <td>{project.id}</td>
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
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default ProjectsOverviewScreen;
