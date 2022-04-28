import "dotenv/config";

import * as express from "express";
import { AppDataSource } from "./database/DataSource";
import { registerMiddleware } from "./middleware";
import { registerRoutes } from "./routes";

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        // middleware
        registerMiddleware(app);

        // routes
        registerRoutes(app);

        // start express server
        app.listen(process.env.PORT || 3001);

        if (process.env.ENV === "development") {
            console.log(
                `App has started on http://localhost:${process.env.PORT}`
            );
        }
    })
    .catch((error) => {
        console.log(error);
    });

const closeApp = () => {
    // properly close database
    AppDataSource.destroy();
    // finish Node process
    process.exit();
};

process.on("SIGINT", () => closeApp());
process.on("SIGTERM", () => closeApp());
