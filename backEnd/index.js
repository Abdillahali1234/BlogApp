const express = require("express");
const app = express();
const connectDB = require("./config/connect");
const cors = require("cors");
const xss = require("xss-clean");
const  rateLimiting  = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
require("dotenv").config();
// connect to db
connectDB();
// middleware to encoded json files
app.use(express.json());

app.use(helmet());


app.use(hpp());

app.use(xss());


app.use(rateLimiting({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
}));

// cors policy
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// get routers
const routerAuth = require("./Routes/authRourts");
const usersRoutes = require("./Routes/usersRoutes");
const postsRoutes = require("./Routes/postRoutes");
const commentRoutes = require("./Routes/commentRoutes.js");
const categoryRoutes = require("./Routes/categoryRoutes.js");
const PasswordRoutes = require("./Routes/passwordRoutes.js");
const { errorHandler, notFound } = require("./middlewares/errorHandling.js");

// middleware to routes handle
app.use("/api/auth", routerAuth);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/password", PasswordRoutes);

app.use(notFound);
app.use(errorHandler);

app.all("*", (req, res, next) => {
  return res.status(404).json({ massage: "this Route does not exist" });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running ${process.env.NODE_ENV}mode on port ${PORT}`);
});
