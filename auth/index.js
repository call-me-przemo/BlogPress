import { User } from "../db/models/user.js";
import createError from "http-errors";
import { destroyAsync, regenerateAsync } from "../db/session.js";
import { Op } from "sequelize";
import { v4 as uuid, validate } from "uuid";
import { sendActivationMail } from "../mail/index.js";
import { PASSWORD_SALT, scryptAsync } from "../helpers.js";

export async function login(req, res, next) {
  let user;
  try {
    user = await User.findOne({
      where: {
        nick: req.body.nick,
      },
      attributes: ["id", "password", "active", "activationToken"],
    });
    const hash = await scryptAsync(req.body.password, PASSWORD_SALT, 64);
    if (!user || user.password != hash || !user.active) {
      if (user.activationToken) {
        return res.redirect("/account/activate/alert");
      }

      req.session.formError = "Given credentials are incorrect";
      return res.redirect("/account/login");
    }

    if (req.body.staySigned) {
      const token = uuid();
      const tokenHash = await scryptAsync(token, PASSWORD_SALT, 64);
      await User.update(
        {
          rememberToken: tokenHash,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      setTimeout(async () => {
        await User.update(
          {
            rememberToken: null,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      }, 7 * 24 * 60 * 60 * 1000);

      res.cookie("rememberToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
      });
    }
    await regenerateAsync(req);
  } catch (err) {
    return next(createError(500));
  }
  req.session.userId = user.id;
  return next();
}

export async function logout(req, res, next) {
  const rememberToken = req.signedCookies.rememberToken;
  try {
    await destroyAsync(req);
    if (rememberToken) {
      const tokenHash = await scryptAsync(rememberToken, PASSWORD_SALT, 64);
      await User.update(
        {
          rememberToken: null,
        },
        {
          where: {
            rememberToken: tokenHash,
          },
        }
      );
      res.clearCookie("rememberToken", {
        httpOnly: true,
        signed: true,
      });
    }
  } catch (err) {
    return next(createError(500));
  }
  return next();
}

export function isUser(req, res, next) {
  req.session?.userId ? next() : next(createError(403));
}

export async function register(req, res, next) {
  let user, created;
  try {
    [user, created] = await User.findOrCreate({
      where: {
        [Op.or]: [
          {
            nick: req.body.nick,
          },
          {
            email: req.body.email,
          },
        ],
      },
      defaults: {
        nick: req.body.nick,
        email: req.body.email,
        password: await scryptAsync(req.body.password, PASSWORD_SALT, 64),
        firstName: req.body.name,
        lastName: req.body.surname,
        active: false,
        activationToken: uuid(),
      },
      attributes: ["id"],
    });
    if (!created) {
      req.session.formError =
        "Given nick or email already exists, please choose another one";
      return res.redirect("/account/register");
    }
    await regenerateAsync(req);
  } catch (err) {
    return next(createError(500));
  }

  sendActivationMail(user.email, user.activationToken);
  res.redirect("/account/activate/alert");
}

export function isGuest(req, res, next) {
  if (!req?.session?.userId && !req?.session.adminId) {
    next();
  } else {
    next(createError(403));
  }
}

export async function activateAccount(req, res, next) {
  const uuid = req.params.uuid;
  let user;
  if (!validate(uuid)) {
    return next(createError(404));
  }

  try {
    user = await User.findOne({
      where: { activationToken: uuid },
      attributes: ["id"],
    });

    if (!user) {
      return next(createError(404));
    }

    await user.update({
      active: true,
      activationToken: null,
    });
  } catch (err) {
    return next(createError(500));
  }

  return next();
}
