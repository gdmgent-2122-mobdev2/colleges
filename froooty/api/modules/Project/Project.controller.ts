import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import ClientService from "../Client/Client.service";
import ProjectService from "./Project.service";
import { ProjectBody } from "./Project.types";

export default class ProjectController {
    private projectService: ProjectService;
    private clientService: ClientService;

    constructor() {
        this.projectService = new ProjectService();
        this.clientService = new ClientService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const projects = await this.projectService.all();
        return res.json(projects);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const project = await this.projectService.findOne(
            parseInt(req.params.id)
        );
        if (!project) {
            next(new NotFoundError());
        }
        return res.json(project);
    };

    create = async (
        req: AuthRequest<{}, {}, ProjectBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.clientId) {
            body.client = await this.clientService.findOne(body.clientId);
        }
        // create project
        const project = await this.projectService.create(body);
        return res.json(project);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, ProjectBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.clientId) {
            body.client = await this.clientService.findOne(body.clientId);
        }
        // update project
        const project = await this.projectService.update(
            parseInt(req.params.id),
            body
        );
        if (!project) {
            next(new NotFoundError());
        }
        return res.json(project);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const project = await this.projectService.delete(
            parseInt(req.params.id)
        );
        if (!project) {
            next(new NotFoundError());
        }
        return res.json({});
    };
}
