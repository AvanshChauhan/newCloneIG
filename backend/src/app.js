const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRouter=require("./routes/post.routes")
const userRouter=require("./routes/user.routes")
const app = express();
const cors=require("cors")
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "InstaClone API is running" });
// });

// Yaha se saare feature routers mount hote hain: auth, posts aur users.
app.use("/api/auth", authRouter);
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)

// Agar koi route match nahi hua to clean 404 response return hota hai.
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Route ke andar next(error) call hone par final error response yaha se jata hai.
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
