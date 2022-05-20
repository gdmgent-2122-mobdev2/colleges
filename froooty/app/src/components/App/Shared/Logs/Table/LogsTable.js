import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatName } from "../../../../../core/modules/users/utils";
import { ProjectRoutes, route } from "../../../../../core/routing";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Button from "../../../../Design/Buttons/Button";
import { BiPencil } from "react-icons/bi";
import DeleteButton from "../../Generic/Buttons/DeleteButton";

const defaultOptions = {
    showUser: true,
    showProject: true,
};

const LogsTable = ({ logs, options = {}, onRefresh }) => {
    const { t } = useTranslation();

    const handleDelete = () => {
        onRefresh();
    };

    options = { ...defaultOptions, ...options };

    return (
        <>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.date")}</th>
                        <th>{t("fields.time")}</th>
                        <th>{t("fields.description")}</th>
                        {options.showProject && <th>{t("fields.project")}</th>}
                        {options.showUser && <th>{t("fields.user")}</th>}
                        <th></th>
                    </TableHeader>
                }>
                {logs.map((log) => (
                    <TableRow key={log.id}>
                        <td>{log.date}</td>
                        <td>{log.time}</td>
                        <td>{log.description}</td>
                        {options.showProject && (
                            <td>
                                <Link
                                    to={route(ProjectRoutes.Detail, {
                                        id: log.project.id,
                                    })}>
                                    {log.project.name}
                                </Link>
                            </td>
                        )}
                        {options.showUser && <td>{formatName(log.user)}</td>}
                        <td className="d-flex">
                            <Button
                                size="sm"
                                onClick={() => {}}
                                color="secondary">
                                <BiPencil />
                            </Button>
                            <DeleteButton
                                size="sm"
                                id={log.id}
                                scope="logs"
                                onSuccess={handleDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default LogsTable;
