import type { Application, ErrorRequestHandler, Router } from "express";
import express from "express";
import "express-async-errors";
import cors from "cors";
import APIError from "./api_error";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.use(App.errorHandler);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      })
    );
  }

  private routes(): void {
    const router = express.Router();

    const routes = import.meta.glob("./routes/**/*.{ts,js}", {
      eager: true
    });

    Object.entries(routes).forEach(([path, route]) => {
      const routeModule = route as {
        default: Router,
        prefix?: string
      };

      const filePrefix =
        routeModule.prefix ?? path.match(/^\.\/routes(.*?)(?:\/index)?\.(?:ts|js)$/)?.[1] ?? "";

      router.use(filePrefix, routeModule.default);
    });

    this.app.use(router);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  private static errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
    if (error instanceof APIError) {
      error.writeResponse(res);
    } else {
      console.error(error)
      res.status(500).send("Internal Server Error");
    }
  }
}

export default new App().app;
