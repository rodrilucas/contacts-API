import express from "express";
import path from "path";
import flash from "connect-flash";
import errorHandler from "../util/errorHandler";
import routes from "./routes";
import sessionConfig from "./config/session";
import cors from "./config/cors";

const app = express();

app.use(cors);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(flash());
app.use(routes);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
