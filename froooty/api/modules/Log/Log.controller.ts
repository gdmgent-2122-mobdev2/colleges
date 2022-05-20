import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import ProjectService from "../Project/Project.service";
import UserService from "../User/User.service";
import LogService from "./Log.service";
import { LogBody } from "./Log.types";

export default class LogController {
    private logService: LogService;
    private projectService: ProjectService;
    private userService: UserService;

    constructor() {
        this.logService = new LogService();
        this.projectService = new ProjectService();
        this.userService = new UserService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const logs = await this.logService.all();
        return res.json(logs);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const log = await this.logService.findOne(parseInt(req.params.id));
        if (!log) {
            next(new NotFoundError());
        }
        return res.json(log);
    };

    create = async (
        req: AuthRequest<{}, {}, LogBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.projectId) {
            body.project = await this.projectService.findOne(body.projectId);
        }
        // create project
        const log = await this.logService.create(body);
        return res.json(log);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, LogBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.projectId) {
            body.project = await this.projectService.findOne(body.projectId);
        }
        // update project
        const log = await this.logService.update(parseInt(req.params.id), body);
        if (!log) {
            next(new NotFoundError());
        }
        return res.json(log);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const log = await this.logService.delete(parseInt(req.params.id));
        if (!log) {
            next(new NotFoundError());
        }
        return res.json({});
    };
}
