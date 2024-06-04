import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Config } from "./config/Config";
import createApolloServer from "./graphql";
import context from "./context";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config();

const init = async () => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  const server = await createApolloServer();

  new Config()
    .start()
    .then(() => {
      app.use(
        "/graphql",
        expressMiddleware(
          server
          // { context: context }
        )
      );

      app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log("Config Error ", error);
    });
};

init();
