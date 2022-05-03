import Client from "../Client/Client.entity";

export interface ProjectBody {
    name: string;
    clientId: number;
    client?: Client;
}
