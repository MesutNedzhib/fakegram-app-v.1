const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const routers = require("./routers");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const app = express();

dotenv.config({
  path: "./config/env/config.env",
});

// connectDatabase();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routers);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

let coll;

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT} : 'http://localhost:${PORT}'`);
});

let users = [];

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");

  const ss = connection.collection("posts").watch();

  ss.on("change", (change) => {
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
        // let rr = connection.collection("posts").find({});
        io.emit("newPost", newPost);
        break;

      // case "delete":
      //   io.of("/api/socket").emit("deletedThought", change.documentKey._id);
      //   break;
    }
  });
});

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    // io.emit("getUsers", ff);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    removeUser(socket.id);
  });
});
