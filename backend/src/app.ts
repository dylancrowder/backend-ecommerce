import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import users from "./routes/user.route";
import products from "./routes/products.route";
import auth from "./routes/session.route";
import init from "./configs/passport";
import test from "./test/test.route";
import cart from "./routes/cart.route";
import { errorHandler } from "./configs/errorMiddleware";
import logger from "./configs/winston";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const MySQLStore = require("express-mysql-session")(session);
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  expiration: 1000 * 60 * 60,
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    name: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

init();
/* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggg)); */

app.use("/", users);
app.use("/", products);
app.use("/", auth);
app.use("/", cart);
app.use("/test", test);

app.use(errorHandler);

// declaring a property ad-hoc/offhandedly
declare global {
  interface ImportMeta {
    mySuperCoolProperty: any;
  }
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info("app corriendo en el puero 8080");
});
export default app;
