import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Log from "./Log.entity";
import { LogBody } from "./Log.types";

export default class LogService {
    private logRepository: Repository<Log>;

    constructor() {
        this.logRepository = AppDataSource.getRepository(Log);
    }

    all = async () => {
        const logs = await this.logRepository.find({
            relations: ["user", "project"],
            order: { date: "ASC" },
        });
        return logs;
    };

    findOne = async (id: number) => {
        const log = await this.logRepository.findOne({
            where: { id },
            relations: ["user", "project"],
        });
        return log;
    };

    create = async (body: LogBody) => {
        const log = await this.logRepository.save(
            this.logRepository.create(body)
        );
        return log;
    };

    update = async (id: number, body: LogBody) => {
        let log = await this.findOne(id);
        if (log) {
            log = await this.logRepository.save({
                ...log,
                ...body,
            });
        }
        return log;
    };

    delete = async (id: number) => {
        let log = await this.findOne(id);
        if (log) {
            await this.logRepository.softDelete({ id });
        }
        return log;
    };
}
