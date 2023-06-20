import express, { Express } from "express";
import "dotenv/config";
import "colors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import notFoundMiddleware from "@middleware/not-found.middleware";
import errorMiddleware from "@middleware/error.middleware";

class App {
  public express: Express = express();

  constructor(private port: number, routes: AppRoute[]) {
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeNotFoundMiddleware();

    this.initializeErrorMiddleware();
  }

  public run() {
    this.express.listen(this.port, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} at port ${this.port}`.yellow
          .underline.bold
      );
    });
  }

  private initializeMiddleware() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(compression());

    if (process.env.NODE_ENV === "development") {
      this.express.use(morgan("dev"));
    }
  }

  private initializeRoutes(routes: AppRoute[]) {
    routes.forEach((route) => {
      this.express.use(`/api/${route.path}`, route.router);
    });
  }

  private initializeNotFoundMiddleware() {
    this.express.use(notFoundMiddleware);
  }

  private initializeErrorMiddleware() {
    this.express.use(errorMiddleware);
  }
}

export default App;
