import validator from "validator";
import { rm } from "fs/promises";
import createHttpError from "http-errors";

const MAX_UPOLOAD_FILE_SIZE = 1024 * 1024;

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

export function validateRegistration(req, res, next) {
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

export async function validateAccountInfo(req, res, next) {
  try {
    if (
      !req.body.nick ||
      !validator.isLength(req.body.nick, { min: 4, max: 30 })
    ) {
      throw new Error("Nick must contains 4 to 30 chars");
    }
    req.body.nick = validator.escape(req.body.nick);

    if (
      !req.body.firstName ||
      !validator.isLength(req.body.firstName, { min: 2, max: 50 })
    ) {
      throw new Error("First name must contains 2 to 50 chars");
    }
    req.body.firstName = validator.escape(req.body.firstName);

    if (
      !req.body.lastName ||
      !validator.isLength(req.body.lastName, { min: 2, max: 50 })
    ) {
      throw new Error("Last name must contains 2 to 50 chars");
    }
    req.body.lastName = validator.escape(req.body.lastName);

    if (
      !req.body.email ||
      !validator.isLength(req.body.email, { min: 4, max: 50 }) ||
      !validator.isEmail(req.body.email)
    ) {
      throw new Error(
        "Field email must be correct address, and contains 4 to 50 chars"
      );
    }
    req.body.email = validator.escape(req.body.email);

    if (req.body.country) {
      if (!validator.isLength(req.body.country, { min: 2, max: 50 })) {
        throw new Error("Country must contains 2 to 50 chars");
      }
      req.body.country = validator.escape(req.body.country);
    }

    if (req.body.city) {
      if (!validator.isLength(req.body.city, { min: 2, max: 50 })) {
        throw new Error("City must contains 2 to 50 chars");
      }
      req.body.city = validator.escape(req.body.city);
    }

    if (req.body.about) {
      if (!validator.isLength(req.body.about, { min: 10, max: 2000 })) {
        throw new Error("About you must contains 10 to 2000 chars");
      }
      req.body.about = validator.escape(req.body.about);
    }

    if (
      req.body.currentPassword &&
      req.body.newPassword &&
      req.body.newPasswordConfirmation &&
      (req.body.newPassword !== req.body.newPasswordConfirmation ||
        !validator.isLength(req.body.newPassword, { min: 10, max: 50 }))
    ) {
      throw new Error(
        "New password and password confirmation must be equal and contain 10 to 50 chars"
      );
    }

    if (req.body.photo) {
      if (req.body.photo.size) {
        if (!req.body.photo.mimetype.includes("image")) {
          throw new Error("Invalid photo file type");
        }
        if (req.body.photo.size > MAX_UPOLOAD_FILE_SIZE) {
          throw new Error("Photo file size is too large (max 1MB)");
        }
      } else {
        try {
          await rm(req.body.photo.filepath);
        } catch (err) {
          return next(createHttpError(500));
        }
      }
    }
  } catch (err) {
    try {
      if (req.body.photo) {
        await rm(req.body.photo.filepath);
      }
    } catch (err) {
      return next(createHttpError(500));
    }
    req.session.formError = err.message;
    return res.redirect("/account");
  }

  return next();
}
