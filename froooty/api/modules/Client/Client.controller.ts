import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import ClientService from "./Client.service";
import { ClientBody } from "./Client.types";

export default class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const clients = await this.clientService.all();
        return res.json(clients);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const client = await this.clientService.findOne(
            parseInt(req.params.id)
        );
        if (!client) {
            next(new NotFoundError());
        }
        return res.json(client);
    };

    create = async (
        req: Request<{}, {}, ClientBody>,
        res: Response,
        next: NextFunction
    ) => {
        const client = await this.clientService.create(req.body);
        return res.json(client);
    };

    update = async (
        req: Request<{ id: string }, {}, ClientBody>,
        res: Response,
        next: NextFunction
    ) => {
        const client = await this.clientService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!client) {
            next(new NotFoundError());
        }
        return res.json(client);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const client = await this.clientService.delete(parseInt(req.params.id));
        if (!client) {
            next(new NotFoundError());
        }
        return res.json({});
    };
}
