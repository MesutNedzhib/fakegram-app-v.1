const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const routers = require("./routers");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const app = express();

dotenv.config({
  path: "./config/env/config.env",
});

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routers);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT} : 'http://localhost:${PORT}'`);
});

let currentPosts = [];
let currentSuggUsers = [];

const connection = mongoose.connection;

connection.once("open", () => {
  const postCollection = connection
    .collection("posts")
    .watch({ fullDocument: "updateLookup" });

  postCollection.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const newPost = {
          _id: change.fullDocument._id,
          _userId: change.fullDocument._userId,
          _userImageUrl: change.fullDocument._userImageUrl,
          _username: change.fullDocument._username,
          likes: change.fullDocument.likes,
          comments: change.fullDocument.comments,
          description: change.fullDocument.description,
          imageUrl: change.fullDocument.imageUrl,
          createdAt: change.fullDocument.createdAt,
        };

        currentPosts.push(newPost);
        currentPosts.sort((x, y) => {
          return new Date(y.createdAt) - new Date(x.createdAt);
        });

        io.emit("newPosts", currentPosts);

        break;

      case "update":
        const updatedPost = {
          _id: change.fullDocument._id,
          _userId: change.fullDocument._userId,
          _userImageUrl: change.fullDocument._userImageUrl,
          _username: change.fullDocument._username,
          likes: change.fullDocument.likes,
          comments: change.fullDocument.comments,
          description: change.fullDocument.description,
          imageUrl: change.fullDocument.imageUrl,
          createdAt: change.fullDocument.createdAt,
        };

        let index = currentPosts.findIndex((x) => x._id == updatedPost._id);
        currentPosts[index] = updatedPost;

        io.emit("newPosts", currentPosts);

        break;
    }
  });

  const usersCollection = connection
    .collection("users")
    .watch({ fullDocument: "updateLookup" });

  usersCollection.on("change", (change) => {
    switch (change.operationType) {
      case "update":
        const updatedUser = {
          _id: change.fullDocument._id,
          followers: change.fullDocument.followers,
          following: change.fullDocument.following,
          name: change.fullDocument.name,
          email: change.fullDocument.email,
          imageUrl: change.fullDocument.imageUrl,
          createdAt: change.fullDocument.createdAt,
        };

        let index = currentSuggUsers.findIndex((x) => x._id == updatedUser._id);
        currentSuggUsers[index] = updatedUser;

        io.emit("newSuggUsers", currentSuggUsers);
        io.emit("updatedUser", updatedUser);
        break;
    }
  });
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("addPosts", (posts) => {
    currentPosts = posts;
  });

  socket.on("addSuggUsers", (users) => {
    currentSuggUsers = users;
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});
