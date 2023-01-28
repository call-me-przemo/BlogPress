import { fileURLToPath } from "url";
import { dirname } from "path";
import formidable from "formidable";
import { join } from "path";
import { scrypt } from "crypto";
import createHttpError from "http-errors";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";

export const PASSWORD_SALT = "lj?DSk97$$n;jAfa.jc062;3,4nDAkj1,vnyYUN[";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const form = formidable({
  uploadDir: join(__dirname, "tmp"),
  keepExtensions: true,
});

export function parseForms(req, res, next) {
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(createHttpError(500));
    }
    req.body = { ...fields, ...files };
    next();
  });
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

/**
 * Moves file asynchronously, using pipeline.
 * @param {string} source path to source file
 * @param {string} destination path to destination file
 */
export async function mvAsync(source, destination) {
  await pipeline(createReadStream(source), createWriteStream(destination));
  await rm(source);
}
