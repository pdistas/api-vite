import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import frutas from './routes/frutas'
import user from './routes/user'
import index from './routes/index'

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
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        this.app.use("/", index);
        this.app.use("/user", user);
        this.app.use("/frutas", frutas);
    }

    private errorHandler(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
}

export default new App().app;
