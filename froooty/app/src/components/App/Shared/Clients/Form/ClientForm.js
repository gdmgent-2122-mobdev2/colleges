import { useState } from "react";
import Button from "../../../../Design/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";

const ClientForm = ({ initialData = {}, isDisabled, onSubmit, label }) => {
    const [data, setData] = useState({
        name: "",
        contactName: "",
        contactEmail: "",
        ...initialData,
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                    name="name"
                    disabled={isDisabled}
                    value={data.name}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="contactName">Contact Person Name</Label>
                <Input
                    name="contactName"
                    disabled={isDisabled}
                    value={data.contactName}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="contactEmail">Contact Person Email</Label>
                <Input
                    name="contactEmail"
                    disabled={isDisabled}
                    value={data.contactEmail}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit" disabled={isDisabled}>
                {label}
            </Button>
        </form>
    );
};

export default ClientForm;
