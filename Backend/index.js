const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv").config();
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const key = process.env.HASH_KEY;
const mongoURL = process.env.MONGO_URL;
const secret_Key = process.env.SECRET_KEY;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch(() => {
    console.log("Error in making connection to Database");
  });
const connection = mongoose.connection;

const UserData = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    require: true,
    type: String,
  },
});

//Schema for Saving student details

const StudentDetail = new mongoose.Schema({
  id: {
    require: true,
    type: Number,
  },
  name: {
    require: true,
    type: String,
  },
  rollno: {
    require: true,
    type: Number,
  },
  class: {
    require: true,
    type: String,
  },
  result: {
    require: true,
    type: String,
  },
  token: {
    require: true,
    type: String,
  },
});

const USERDATA = connection.model("userdata", UserData);
const STUDENDETAIL = connection.model("studentdetail", StudentDetail);

//middleware
// const Authmiddle = (req, res, next) => {
//   const token = req.cookies.jwttokenCookie;
//   console.log(token);
// };

app.post("/register", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.json({ message: "Please fill the details" });
    }
    USERDATA.findOne({ email: req.body.email }, (err, result) => {
      if (result) {
        res.json({ message: "User Already Registered" });
      } else {
        const value = new USERDATA(req.body);
        value.password = crypto
          .createHash("sha256", key)
          .update(req.body.password)
          .digest("hex");

        value.save((err) => {
          if (err) {
            res.json({ message: "User Not Registered" });
          } else {
            res.json({ message: "User Registered" });
          }
        });
      }
    });
  } catch (error) {
    console.log("error");
  }
});

app.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.json({ message: "Please fill the details" });
    }
    USERDATA.findOne({ email: req.body.email }, (err, result) => {
      if (result) {
        req.body.password = crypto
          .createHash("sha256", key)
          .update(req.body.password)
          .digest("hex");
        if (result.password === req.body.password) {
          const authToken = jwt.sign({ _id: result._id }, secret_Key);
          result.token = authToken;

          result.save((err) => {
            if (err) {
              console.log("not saved");

              // res.json({ message: "User Not Registered" });
            } else {
              console.log("Saved SucessFully");

              // res.json({ message: "User Registered" });
            }
          });

          console.log("auth", authToken);

          // return res
          //   .cookie("jwttokenCookie", authToken)
          json({ message: "User Logged In" });
        }
      } else {
        res.json({ message: "Email not Exist" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/studentdetail", async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.rollno ||
      !req.body.class ||
      !req.body.result
    ) {
      res.json({ message: "Please fill all the details" });
    } else {
      STUDENDETAIL.findOne({ id: req.body.id }, (err, result) => {
        if (result) {
          res.json({
            message: "Student have been already enrolled for this is ID",
          });
        } else {
          const values = new STUDENDETAIL(req.body);
          values.save((err) => {
            if (err) {
              res.json({ message: "Unable to save to DB" });
            } else {
              res.json({ message: "Student has been Enrolled to DB" });
            }
          });
        }
      });
    }
  } catch (error) {
    res.json({ message: "Failed to Enroll" });
  }
});

app.get("/home", async (req, res) => {
  try {
    STUDENDETAIL.find({}, (err, result) => {
      if (result) {
        res.send(result);
      }
    });

    app.get("/aboutus", (req, res) => {
      console.log("in aboutus page");
    });
  } catch (error) {
    res.json({ message: "Cant Upload" });
  }
});

app.listen(port, () => {
  console.log("Server has been started at localhost " + port);
});
