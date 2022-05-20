import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const ProjectSelect = (props) => {
    const { data: projects } = useFetch("/projects");

    const options = projects
        ? projects.map((p) => ({ value: p.id, label: p.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default ProjectSelect;
