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
        const clients = await this.repository.find();
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
        let client = await this.findOne(id);
        if (client) {
            await this.repository.softDelete({ id });
        }
        return client;
    };
}
