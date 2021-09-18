const mongoose = require("mongoose");

const connection = mongoose.connection;

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let currentPosts = [];
let currentSuggestedUsers = [];

const connectSocket = () => {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("addPosts", (posts) => {
      currentPosts = posts;
    });

    socket.on("addSuggestedUsers", (suggestedUsers) => {
      currentSuggestedUsers = suggestedUsers;
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });

  // Watch MongoDB collections when have change
  connection.once("open", () => {
    const postCollection = connection
      .collection("posts")
      .watch({ fullDocument: "updateLookup" });

    postCollection.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          const newPost = {
            _id: change.fullDocument._id,
            user: change.fullDocument.user,
            user_name: change.fullDocument.user_name,
            user_imageUrl: change.fullDocument.user_imageUrl,
            likes: change.fullDocument.likes,
            comments: change.fullDocument.comments,
            content: change.fullDocument.content,
            imageUrl: change.fullDocument.imageUrl,
            createdAt: change.fullDocument.createdAt,
            likeCount: change.fullDocument.likeCount,
            commentCount: change.fullDocument.commentCount,
          };

          currentPosts.push(newPost);

          currentPosts.sort((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt);
          });

          io.emit("newPost", currentPosts);

          break;

        case "update":
          const updatedPost = {
            _id: change.fullDocument._id,
            likes: change.fullDocument.likes,
            likeCount: change.fullDocument.likeCount,
          };

          for (let post of currentPosts) {
            if (post._id == updatedPost._id) {
              post.likes = updatedPost.likes;
              post.likeCount = updatedPost.likeCount;
            }
          }

          io.emit("updatedPost", currentPosts);
          break;
      }
    });

    const commentCollection = connection
      .collection("comments")
      .watch({ fullDocument: "updateLookup" });

    commentCollection.on("change", (change) => {
      switch (change.operationType) {
        case "insert":
          const newComment = {
            _id: change.fullDocument._id,
            likes: change.fullDocument.likes,
            content: change.fullDocument.content,
            user: change.fullDocument.user,
            user_name: change.fullDocument.user_name,
            user_imageUrl: change.fullDocument.user_imageUrl,
            post: change.fullDocument.post,
            createdAt: change.fullDocument.createdAt,
          };

          for (let post of currentPosts) {
            if (post._id == newComment.post) {
              post.comments.push(newComment);
              post.commentCount = post.comments.length;
            }
          }

          io.emit("newComment", currentPosts);
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
            name: change.fullDocument.name,
          };

          for (let user of currentSuggestedUsers) {
            if (user._id == updatedUser._id) {
              user.followers = updatedUser.followers;
            }
          }

          io.emit("newSuggestedUsers", currentSuggestedUsers);
          break;
      }
    });
  });
};

//   const usersCollection = connection
//     .collection("users")
//     .watch({ fullDocument: "updateLookup" });

//   usersCollection.on("change", (change) => {
//     switch (change.operationType) {
//       case "update":
//         const updatedUser = {
//           _id: change.fullDocument._id,
//           followers: change.fullDocument.followers,
//           following: change.fullDocument.following,
//           name: change.fullDocument.name,
//           email: change.fullDocument.email,
//           imageUrl: change.fullDocument.imageUrl,
//           createdAt: change.fullDocument.createdAt,
//         };

//         let index = currentSuggUsers.findIndex((x) => x._id == updatedUser._id);
//         currentSuggUsers[index] = updatedUser;

//         io.emit("newSuggUsers", currentSuggUsers);
//         io.emit("updatedUser", updatedUser);
//         break;
//     }
//   });
// });

module.exports = connectSocket;
