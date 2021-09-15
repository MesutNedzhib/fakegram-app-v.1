const mongoose = require("mongoose");
const Post = require("./Post");

const Schema = mongoose.Schema;

const CommentShema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  user_name: {
    type: String,
    required: [true, "Please provide a user name"],
  },
  user_imageUrl: {
    type: String,
    required: [true, "Please provide a user image"],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
});

// Mongoose Pre Hooks
CommentShema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  }

  try {
    const post = await Post.findById(this.post);

    post.comments.push(this._id);
    post.commentCount = post.comments.length;

    await post.save();
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Comment", CommentShema);
