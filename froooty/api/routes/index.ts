import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import ClientController from "../modules/Client/Client.controller";
import ProjectController from "../modules/Project/Project.controller";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";

// catch error since Express doesn't catch errors in async functions
const handleErrors =
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
    router.post("/login", authLocal, handleErrors(authController.login));

    // test route REMOVE after
    const userController = new UserController();
    if (process.env.ENV === "development") {
        router.post("/dev/users", handleErrors(userController.create));
    }
};

const registerAdminRoutes = (router: Router) => {
    const adminRouter = Router();

    const userController = new UserController();
    adminRouter.get("/users", handleErrors(userController.all));
    adminRouter.get("/users/:id", handleErrors(userController.find));
    adminRouter.post("/users", handleErrors(userController.create));
    adminRouter.patch("/users/:id", handleErrors(userController.update));
    adminRouter.delete("/users/:id", handleErrors(userController.delete));

    router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const clientController = new ClientController();
    authRouter.get("/clients", handleErrors(clientController.all));
    authRouter.get("/clients/:id", handleErrors(clientController.find));
    authRouter.post("/clients", handleErrors(clientController.create));
    authRouter.patch("/clients/:id", handleErrors(clientController.update));
    authRouter.delete("/clients/:id", handleErrors(clientController.delete));

    const projectController = new ProjectController();
    authRouter.get("/projects", handleErrors(projectController.all));
    authRouter.get("/projects/:id", handleErrors(projectController.find));
    authRouter.post("/projects", handleErrors(projectController.create));
    authRouter.patch("/projects/:id", handleErrors(projectController.update));
    authRouter.delete("/projects/:id", handleErrors(projectController.delete));

    registerAdminRoutes(authRouter);

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
