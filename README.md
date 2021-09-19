# Fakegram
Fakegram - is a web application similar of instagram where consumers can upload their pictures, comment and like on posts, follow and unfollow other consumers in REAL TIME.

![view-image-1](https://github.com/MesutNedzhib/fakegram-app-v.1/blob/master/client/public/png/desktopPluSmobile.png)

v.1 - Demo

## How to run 
1. Download.
2. Open the folder in the CLI and go to **api** direcory using command `cd api`.
3. Run the following commands for the **api** directory:
   - `npm install`
   - `npm run import`
   - `npm start`
4. Open the new CLI in the main folder **[fakegram-app]** and go to **client** directory using command `cd client`.
5. Run the following commands for the **client** directory:
   - `npm install`
   - `npm start`
6. Enjoy :)

## Features
The application is based on the three-tier architecture of the MERN stack, which consists of a client side, a server side, and a database.
The MERN stack consists of MongoDB, Express JS, React JS and Node JS.
Addition to app is selected Socket IO, which gives the opportunity for bidirectional communication between client and server in real time.
The application has the following functionalities:
   - Authorization
     - Login
     - Logout
   - User
     - Get all users
     - Get single user
     - Set follow
     - Set unfollow
     - Get suggested users
   - Post
     - Create post
     - Get all posts
     - Get single post
     - Like-unlike post
     - Get user posts
   - Comment
     - Add comment
     - Get all comments by post
     
   
## Future Features
- Create a chat component and functions to it
- Create a search component and functions to it
- etc ...

## Dependencies
1. Api:
   - Express
   - Cors
   - Dotenv
   - Nodemon
   - Express Async Handler
   - Json Web Token
   - Multer 
   - Mongoose
   - MongoDB
   - Socket IO
2. Client:
   - React
   - Redux
   - React Redux
   - Redux Thunk
   - React Router Dom
   - React Google Login
   - Image Upload React
   - Socket IO Client
   - Timeago JS
   - Axios
   - Material UI
   - SASS
   



