import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import Client from "./Client.entity";
import { ClientBody } from "./Client.types";

export default class ClientService {
    private repository: Repository<Client>;

    constructor() {
        this.repository = AppDataSource.getRepository(Client);
    }

    all = async () => {
        const clients = await this.repository.find({
            order: {
                name: "ASC",
            },
        });
        return clients;
    };

    findOne = async (id: number) => {
        const client = await this.repository.findOneBy({ id });
        return client;
    };

    create = async (body: ClientBody) => {
        const client = await this.repository.save(this.repository.create(body));
        return client;
    };

    update = async (id: number, body: ClientBody) => {
        let client = await this.findOne(id);
        if (client) {
            client = await this.repository.save({ ...client, ...body });
        }
        return client;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let client = await this.repository.findOne({
            where: { id },
            relations: ["projects", "projects.logs"],
        });
        if (client) {
            await this.repository.softRemove(client);
        }
        return client;
    };
}
