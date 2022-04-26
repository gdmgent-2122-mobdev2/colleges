import ClientController from "../modules/Client/Client.controller";

const registerRoutes = (app) => {
    const clientController = new ClientController();
    app.get('/clients', clientController.all);
    app.post('/clients', clientController.create);
};

export {
    registerRoutes,
}