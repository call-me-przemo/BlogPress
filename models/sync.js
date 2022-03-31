import { User } from './user.js';
import { Post } from './post.js';
import { Author } from './author.js';
import { Comment } from './comment.js';
import Session from './session.js';
import { sequelize } from './connection.js'; 

User.belongsToMany(Post, { through: Author });
Post.belongsToMany(User, { through: Author });
Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Comment);
Post.hasMany(Comment);
await User.sync();
await Post.sync();
await Author.sync();
await Comment.sync();
await Session.sync();
await sequelize.close();
