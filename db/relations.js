import { User } from "./models/user.js";
import { Post } from "./models/post.js";
import { Author } from "./models/author.js";
import { Comment } from "./models/comment.js";

User.belongsToMany(Post, { through: Author });
Post.belongsToMany(User, { through: Author });
Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Comment);
Post.hasMany(Comment);
