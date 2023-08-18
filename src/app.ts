import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./router";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.get("/", (_, res) => {
      res.send("Hello World!");
    });

    this.app.use(router);
  }

  private errorHandler(): void {
    this.app.use((error: Error, _: Request, res: Response) => {
      console.error(error.stack);
      res.status(500).json({ message: "Internal Server Error" });
    });
  }
}

export default new App().app;
