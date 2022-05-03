import { Router } from "express";
import { authJwt, authLocal } from "../middleware/auth";
import ClientController from "../modules/Client/Client.controller";
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
    authRouter.post("/clients", clientController.create);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);
};

export { registerRoutes };
