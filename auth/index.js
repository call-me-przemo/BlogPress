import validator from "validator";
import { User } from "../db/models/user.js";
import { scrypt } from "crypto";
import createError from "http-errors";
import { destroyAsync, regenerateAsync } from "../db/session.js";
import { Op } from "sequelize";
import { v4 as uuid, validate } from "uuid";
import { sendActivationMail } from "../mail/index.js";

export function validateLogin(req, res, next) {
  try {
    if (!validator.isLength(req.body.nick, { min: 4, max: 30 })) {
      throw new Error("Login must contains 4 to 30 chars");
    }
    req.body.nick = validator.escape(req.body.nick);

    if (!validator.isLength(req.body.password, { min: 10, max: 50 })) {
      throw new Error("Password must contains 10 to 50 chars");
    }
  } catch (err) {
    req.session.formError = err.message;
    return res.redirect("/account/login");
  }
  return next();
}

export function validateRegister(req, res, next) {
  try {
    if (!validator.isLength(req.body.name, { min: 2, max: 50 })) {
      throw new Error("Name must contains 2 to 50 chars");
    }
    req.body.name = validator.escape(req.body.name);

    if (!validator.isLength(req.body.surname, { min: 2, max: 50 })) {
      throw new Error("Surname must contains 2 to 50 chars");
    }
    req.body.surname = validator.escape(req.body.surname);

    if (!validator.isLength(req.body.nick, { min: 4, max: 30 })) {
      throw new Error("Nick must contains 4 to 30 chars");
    }
    req.body.nick = validator.escape(req.body.nick);

    if (
      !validator.isLength(req.body.email, { min: 4, max: 50 }) ||
      !validator.isEmail(req.body.email)
    ) {
      throw new Error(
        "Field email must be correct address, and contains 4 to 50 chars"
      );
    }
    req.body.email = validator.escape(req.body.email);

    if (!validator.isLength(req.body.password, { min: 10, max: 50 })) {
      throw new Error("Password must contains 10 to 50 chars");
    }
  } catch (err) {
    req.session.formError = err.message;
    return res.redirect("/account/register");
  }
  return next();
}

export async function login(req, res, next) {
  let user;
  try {
    user = await User.findOne({
      where: {
        nick: req.body.nick,
      },
    });
    const hash = await scryptAsync(req.body.password, req.body.nick, 64);
    if (!user || user.password != hash) {
      req.session.formError = "Given credentials are incorrect";
      return res.redirect("/account/login");
    }
    await regenerateAsync(req);
  } catch (err) {
    return next(createError(500));
  }
  req.session.userId = user.id;
  return next();
}

export async function logout(req, res, next) {
  try {
    await destroyAsync(req);
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
        password: await scryptAsync(req.body.password, req.body.nick, 64),
        firstName: req.body.name,
        lastName: req.body.surname,
        active: false,
        activationToken: uuid(),
      },
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
  req.session.userId = user.id;
  sendActivationMail(user.email, user.activationToken);
  return next();
}

export function isGuest(req, res, next) {
  if (!req?.session?.userId && !req?.session.adminId) {
    next();
  } else {
    next(createError(403));
  }
}

export function scryptAsync(password, salt, keylen) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keylen, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash.toString("hex"));
    });
  });
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
