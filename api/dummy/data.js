const data = {
  users: [
    {
      _id: "5e30275d141401679e3832a1",
      name: "Derek Simpson",
      email: "derek.simpson@gmail.com",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU",
      posts: ["5e302a619d3b40d1d39908e0"],
    },
    {
      _id: "5e2866280427c1ff0dd2b5cb",
      name: "Samira Brite",
      email: "samira.brite@gmail.com",
      imageUrl:
        "https://399095.smushcdn.com/681273/wp-content/uploads/2018/01/113757765_Subscription_S1.jpg?lossy=1&strip=1&webp=1",
      posts: ["5e302a02685d0667c54d42ea"],
    },
    {
      _id: "5e2effcccbdf585842cdb6ce",
      name: "John Togo",
      email: "john.togo@gmail.com",
      imageUrl:
        "https://www.mensjournal.com/wp-content/uploads/mf/1280-selfie.jpg?quality=86&strip=all",
    },
  ],
  posts: [
    {
      _id: "5e302a02685d0667c54d42ea",
      content: "Moon",
      imageUrl: "image_6145d971a3d12f307c1dff19_53084.jpeg",
      user: "5e2866280427c1ff0dd2b5cb",
      user_name: "Samira Brite",
      user_imageUrl:
        "https://399095.smushcdn.com/681273/wp-content/uploads/2018/01/113757765_Subscription_S1.jpg?lossy=1&strip=1&webp=1",
    },
    {
      _id: "5e302a619d3b40d1d39908e0",
      content: "R...",
      imageUrl: "image_6145d971a3d12f307c1dff19_16096.jpeg",
      user: "5e30275d141401679e3832a1",
      user_name: "Derek Simpson",
      user_imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU",
    },
  ],
};

module.exports = data;
