import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import { NextFunction, Request, Response, Router } from "express";
import BaseError from "../errors/BaseError";

const registerMiddleware = (app: Router) => {
    // use CORS middleware
    // add "allow all" cors
    if (process.env.ENV === "production") {
        // in production we only allow the specific domain
        const corsOptions = {
            origin: process.env.APP_URL,
            optionsSuccessStatus: 200,
        };
        app.use(cors(corsOptions));
    } else {
        app.use(cors());
    }

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    // helmet security
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());
};

const registerErrorHandler = (app: Router) => {
    // default error handler
    app.use(function (
        err: BaseError,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        res.status(err.statusCode || 500);
        res.json(err);
    });
};

export { registerMiddleware, registerErrorHandler };
