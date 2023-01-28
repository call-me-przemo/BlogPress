import {
  login,
  register,
  isUser,
  logout,
  isGuest,
  activateAccount,
} from "../auth/index.js";
import express from "express";
import { User } from "../db/models/user.js";
import { Post } from "../db/models/post.js";
import createError from "http-errors";
import {
  validateAccountInfo,
  validateLogin,
  validateRegistration,
} from "../validators/index.js";
import createHttpError from "http-errors";
import { rm } from "fs/promises";
import { join } from "path";
import { mvAsync, __dirname, PASSWORD_SALT, scryptAsync } from "../helpers.js";

export const router = express.Router();

router.get("/", isUser, async (req, res, next) => {
  let user;
  try {
    user = await User.findByPk(req.session.userId, {
      include: Post,
      order: [[Post, "createdAt", "DESC"]],
      limit: 10,
      subQuery: false,
    });
  } catch (err) {
    return next(createError(500));
  }
  user = user.get();

  res.render("account", {
    csrfToken: req.csrfToken(),
    title: "Account",
    account: true,
    user,
    message: req.session.formError,
  });
  delete req.session.formError;
});

router.get("/login", isGuest, (req, res, next) => {
  res.render("login", {
    title: "Sign in",
    login: true,
    csrfToken: req.csrfToken(),
    message: req.session.formError,
  });
  delete req.session.formError;
});

router.post("/login", validateLogin, login, (req, res, next) => {
  res.redirect("/account");
});

router.get("/register", isGuest, (req, res, next) => {
  res.render("register", {
    title: "Sign up",
    register: true,
    csrfToken: req.csrfToken(),
    message: req.session.formError,
  });
  delete req.session.formError;
});

router.post("/register", validateRegistration, register, (req, res, next) => {
  res.redirect("/account");
});

router.get("/logout", isUser, logout, (req, res, next) => {
  res.redirect("/");
});

router.get("/activate/alert", (req, res, next) => {
  res.render("activationStatus", {
    title: "Inactive account",
    message:
      "Your account is inactive, please follow the email instructions to activate it",
  });
});

router.get("/activate/:uuid", activateAccount, (req, res, next) => {
  res.render("activationStatus", {
    title: "Activation completed",
    message: `Your account has been activated, you can log in
    <a href="/account/login" class="hover:text-cyan-500 dark:hover:text-lime-400">here</a>`,
  });
});

router.post("/", isUser, validateAccountInfo, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId);
    if (req.body?.photo?.size) {
      const userPhotosPath = join(__dirname, "public", "images", "users");
      const destinationPath = join(userPhotosPath, req.body.photo.newFilename);
      const sourcePath = join(__dirname, "tmp", req.body.photo.newFilename);
      await mvAsync(sourcePath, destinationPath);
      if (user.avatarPath) {
        const deletePath = join(userPhotosPath, user.avatarPath);
        await rm(deletePath);
      }
      user.avatarPath = req.body.photo.newFilename;
    }
    if (req.body.nick != user.nick) {
      const nick = await User.findOne({
        where: {
          nick: req.body.nick,
        },
      });
      if (nick) {
        req.session.formError = "Given nick already exists";
        return res.redirect("/account");
      }
      user.nick = req.body.nick;
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    if (req.body.email != user.email) {
      const email = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (email) {
        req.session.formError = "Given email already exists";
        return res.redirect("/account");
      }
      user.email = req.body.email;
    }
    user.country = req.body.country;
    user.city = req.body.city;
    user.about = req.body.about;
    if (req.body.newPassword) {
      const hash = await scryptAsync(
        req.body.currentPassword,
        PASSWORD_SALT,
        64
      );
      if (user.password != hash) {
        req.session.formError = "Given password is incorrect";
        return res.redirect("/account");
      }
      const newHash = await scryptAsync(
        req.body.newPassword,
        PASSWORD_SALT,
        64
      );
      user.password = newHash;
    }
    await user.save();
  } catch (err) {
    return next(createHttpError(500));
  }
  res.redirect("/account");
});
