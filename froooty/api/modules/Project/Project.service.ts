import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Project from "./Project.entity";
import Client from "../Client/Client.entity";
import { ProjectBody } from "./Project.types";

export default class ProjectService {
    private projectRepository: Repository<Project>;

    constructor() {
        this.projectRepository = AppDataSource.getRepository(Project);
    }

    all = async () => {
        const projects = await this.projectRepository.find({
            relations: ["client"],
        });
        return projects;
    };

    findOne = async (id: number) => {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ["client"],
        });
        return project;
    };

    create = async (body: ProjectBody) => {
        const project = await this.projectRepository.save(
            this.projectRepository.create(body)
        );
        return project;
    };

    update = async (id: number, body: ProjectBody) => {
        let project = await this.findOne(id);
        if (project) {
            project = await this.projectRepository.save({
                ...project,
                ...body,
            });
        }
        return project;
    };

    delete = async (id: number) => {
        let project = await this.findOne(id);
        if (project) {
            await this.projectRepository.softDelete({ id });
        }
        return project;
    };
}
