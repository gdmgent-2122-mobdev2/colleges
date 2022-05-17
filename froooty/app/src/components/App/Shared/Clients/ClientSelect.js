import useFetch from "../../../../core/hooks/useFetch";
import Select from "../../../Design/Form/Select";

const ClientSelect = (props) => {
    const { data: clients } = useFetch("/clients");

    const options = !clients
        ? null
        : clients.map((c) => ({ value: c.id, label: c.name }));

    return <Select options={options} {...props} />;
};

export default ClientSelect;
