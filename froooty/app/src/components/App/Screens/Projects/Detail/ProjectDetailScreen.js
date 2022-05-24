import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { ProjectRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import CreateEditLogDialog from "../../../Shared/Logs/Form/CreateEditLogDialog";
import LogsTable from "../../../Shared/Logs/Table/LogsTable";

const ProjectDetailScreen = () => {
    const { t } = useTranslation();
    const [currentLog, setCurrentLog] = useState();
    const user = useUser();
    const { project, onProjectUpdate } = useOutletContext();

    useTitle(t(project ? project.name : ""));

    const handleAddLogClick = () => {
        setCurrentLog({
            projectId: project.id,
        });
    };

    const handleUpdate = () => {
        setCurrentLog(null);
        onProjectUpdate();
    };

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

            <PageHeader>
                <h2 className="mt-4">Logs</h2>
                <Button color="secondary" onClick={handleAddLogClick}>
                    {t("logs.overview.create")}
                </Button>
            </PageHeader>
            <LogsTable
                logs={project.logs}
                options={{
                    showUser: isAdmin(user),
                    showProject: false,
                }}
                onRefresh={handleUpdate}
            />
            {currentLog && (
                <CreateEditLogDialog
                    log={currentLog}
                    onSuccess={handleUpdate}
                    options={{
                        showUser: isAdmin(user),
                        showProject: false,
                    }}
                    onDismiss={() => setCurrentLog(null)}
                />
            )}
        </>
    );
};

export default ProjectDetailScreen;
