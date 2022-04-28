import { Repository } from "typeorm";
import { Express } from "express";
import { AppDataSource } from "../../database/DataSource";
import Client from "./Client.entity";

export default class ClientService {
  private repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  all = async () => {
    const clients = await this.repository.find();
    return clients;
  };

  findOne = async (id: number) => {};

  create = async (body: Express.Request.body) => {
    const client = await this.repository.save(this.repository.create(body));
    return client;
  };

  update = async (body) => {};
}
