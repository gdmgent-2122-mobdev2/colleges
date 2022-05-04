import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal } from "../middleware/auth";
import ClientController from "../modules/Client/Client.controller";
import ProjectController from "../modules/Project/Project.controller";
import AuthController from "../modules/User/Auth.controller";
import UserController from "../modules/User/User.controller";

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    router.post("/login", authLocal, authController.login);

    // test route REMOVE after
    const userController = new UserController();
    if (process.env.ENV === "development") {
        router.post("/dev/users", userController.create);
    }
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const clientController = new ClientController();
    authRouter.get("/clients", clientController.all);
    authRouter.get("/clients/:id", clientController.find);
    authRouter.post("/clients", clientController.create);
    authRouter.patch("/clients/:id", clientController.update);
    authRouter.delete("/clients/:id", clientController.delete);

    const projectController = new ProjectController();
    authRouter.get("/projects", projectController.all);
    authRouter.get("/projects/:id", projectController.find);
    authRouter.post("/projects", projectController.create);
    authRouter.patch("/projects/:id", projectController.update);
    authRouter.delete("/projects/:id", clientController.delete);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
