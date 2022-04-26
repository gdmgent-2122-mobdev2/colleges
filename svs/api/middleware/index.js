import cors from "cors";
import bodyParser from "body-parser";

const registerMiddleware = (app) => {
  // use CORS middleware
  // add "allow all" cors
  if (process.env.ENV === "production") {
    const corsOptions = {
      origin: process.env.APP_URL,
      optionsSuccessStatus: 200, //
    };
    app.use(cors(corsOptions));
  } else {
    app.use(cors());
  }
  app.use(bodyParser.json());
};

export { registerMiddleware };
