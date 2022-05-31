import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import ClientController from "../modules/Client/Client.controller";
import LogController from "../modules/Log/Log.controller";
import ProjectController from "../modules/Project/Project.controller";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    router.post("/login", authLocal, useMethod(authController.login));

    // test route REMOVE after
    const userController = new UserController();
    if (process.env.ENV === "development") {
        router.post("/dev/users", useMethod(userController.create));
    }
};

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();

    const userController = new UserController();
    adminRouter.get("/users", useMethod(userController.all));
    adminRouter.get("/users/:id", useMethod(userController.find));
    adminRouter.post("/users", useMethod(userController.create));
    adminRouter.patch("/users/:id", useMethod(userController.update));
    adminRouter.delete("/users/:id", useMethod(userController.delete));

    router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const clientController = new ClientController();
    authRouter.get("/clients", useMethod(clientController.all));
    authRouter.get("/clients/:id", useMethod(clientController.find));
    authRouter.post("/clients", useMethod(clientController.create));
    authRouter.patch("/clients/:id", useMethod(clientController.update));
    authRouter.delete("/clients/:id", useMethod(clientController.delete));

    const projectController = new ProjectController();
    authRouter.get("/projects", useMethod(projectController.all));
    authRouter.get("/projects/:id", useMethod(projectController.find));
    authRouter.post("/projects", useMethod(projectController.create));
    authRouter.patch("/projects/:id", useMethod(projectController.update));
    authRouter.delete("/projects/:id", useMethod(projectController.delete));

    const logController = new LogController();
    authRouter.get("/logs", useMethod(logController.all));
    authRouter.get("/logs/:id", useMethod(logController.find));
    authRouter.post("/logs", useMethod(logController.create));
    authRouter.patch("/logs/:id", useMethod(logController.update));
    authRouter.delete("/logs/:id", useMethod(logController.delete));

    registerAdminRoutes(authRouter);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));

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
