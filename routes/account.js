import {
  validateLogin,
  validateRegister,
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
    title: "Account",
    account: true,
    user,
  });
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

router.post("/register", validateRegister, register, (req, res, next) => {
  res.redirect("/account");
});

router.get("/logout", isUser, logout, (req, res, next) => {
  res.redirect("/");
});

router.get("/activate/:uuid", activateAccount, (req, res, next) => {
  res.render("confirmActivation", {
    title: "Activation completed",
  });
});
