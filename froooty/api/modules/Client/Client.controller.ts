import { NextFunction, Request, Response } from 'express';
import ClientService from './Client.service';

export default class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const clients = await this.clientService.all();
        return res.json(clients);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const client = await this.clientService.create(req.body);
        return res.json(client);
    }

    find = async (req: Request, res: Response, next: NextFunction) => {

    }

    update = async (req: Request, res: Response, next: NextFunction) => {

    }
};