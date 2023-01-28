import hbs from "hbs";
import { join } from "path";
import { readFile } from "fs/promises";
import { __dirname } from "../helpers.js";
import { createTransport } from "nodemailer";
import { load } from "js-yaml";

const file = await readFile(join(__dirname, "mail", "config.yaml"));
const { host, port, user, pass, siteUrl } = load(file);

const transporter = createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

export async function sendActivationMail(mail, token) {
  const path = join(__dirname, "mail", "templates", "registration.hbs");
  const template = await readFile(path, "utf-8");
  const render = hbs.handlebars.compile(template);
  const activationUrl = `${siteUrl}/account/activate/${token}`;
  const html = render({
    activationUrl,
  });

  try {
    await transporter.sendMail({
      from: '"BlogPress" <no-reply@BlogPress.com>',
      to: mail,
      subject: "Account activation",
      text: `Thanks for registration\n
    Your account has been created but is inactive\n
    To activate your account follow link: ${activationUrl}\n
    Greetings from the BlogPress Team`,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: join(__dirname, "public", "images", "logo.png"),
          cid: "appLogo",
        },
      ],
    });
  } catch (err) {
    console.log("Sending activation mail error");
  }
}
