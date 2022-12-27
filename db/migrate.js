import { User } from "./models/user.js";
import { Post } from "./models/post.js";
import { Author } from "./models/author.js";
import { Comment } from "./models/comment.js";
import { Admin } from "./models/admin.js";
import Session from "./session.js";
import { sequelize } from "./connection.js";
import "./relations.js";

await User.sync();
await Post.sync();
await Author.sync();
await Comment.sync();
await Admin.sync();
await Session.sync();
await sequelize.close();
