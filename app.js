import express from "express";
import createError from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import hbs from "hbs";
import session from "express-session";
import { join } from "path";
import { __dirname } from "./rootdir.js";
import { router as indexRouter } from "./routes/index.js";
import store from "./db/session.js";
import { router as accountRouter } from "./routes/account.js";
import csurf from "csurf";
import compression from "compression";
import { sequelize } from "./db/connection.js";
import "./db/relations.js";
import { scryptAsync } from "./auth/index.js";
import { User } from "./db/models/user.js";

export const app = express();
const port = process.env.PORT || 3000;
const csrf = csurf();

const server = app.listen(port, () => {
  console.log(`App listening on: http://localhost:${port}`);
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(join(__dirname, "views/partials"));

app.use(compression());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("jslk2987sdfvAvja8dfj;jfa087lkj"));
app.use(express.static(join(__dirname, "public")));
app.use(
  session({
    secret: "jaspdoifnwpdofiou0981u324",
    store,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(async (req, res, next) => {
  res.locals.logged = req.session.userId ? true : false;
  const rememberToken = req.signedCookies.rememberToken;
  if (!res.locals.logged && rememberToken) {
    try {
      const tokenHash = await scryptAsync(rememberToken, "sampleSalt", 64);
      const user = await User.findOne({ where: { rememberToken: tokenHash } });
      if (user) {
        req.session.userId = user.id;
        res.locals.logged = true;
      }
    } catch (err) {
      return next(createError(500));
    }
  }
  next();
});
app.use("/", indexRouter);
app.use("/account", csrf, accountRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.stack = req.app.get("env") === "development" ? err.stack : "";
  res.status(err.status || 500);
  res.render("error", {
    title: `${err.status} - ${err.message}`,
  });
});

app.locals.date = new Date().getFullYear();

process.on("SIGTERM", close);
process.on("SIGINT", close);
process.on("SIGHUP", close);

async function close() {
  console.log("Closing app...");
  await closeServer(server);
  await sequelize.close();
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (!err) {
        resolve("Server closed");
      } else {
        reject("Server isn't open");
      }
    });
  });
}
