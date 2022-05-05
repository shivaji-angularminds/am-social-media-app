const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const path=require("path")
dotenv.config({path:"./config/.env"});
const postRoute = require("./routes/post");
const cors=require("cors")
const passportSetup = require("./passport");
const passport = require("passport");
const cookieSession = require("cookie-session");

// const stateRoute=require("./routes/state")
// const districtRoute=require("./routes/districts")
// const stateUpdate=require("./routes/statesOpration")

// console.log(process.env.MONGO_URL);
const con = async () => {
  const conn = await mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    // (err, data) => {
    //   console.log(err);

    //   // console.log("Connected to MongoDB");
    // }
  );

  // console.log(conn);
};
con();
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())
app.use("/user", authRoute);
app.use("/user/edit-profile", userRoute);
app.use("/posts", postRoute);
app.use("/images", express.static(path.join(__dirname, "images")));


// app.use("/api/state", stateRoute);
// app.use("/api/district",districtRoute)
// app.use("/api/state/update",stateUpdate)


app.listen(8800, () => {
  console.log("Backend server is running!");
});