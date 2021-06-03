//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

// set up
mongoose.connect("mongodb://localhost:27017/authDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//Schema
const userSchema = {
  userName: String,
  password: String,
};

const User = mongoose.model("User", userSchema);

//routes

app.get("/", (req, res) => {

  res.render("signin") 
})

app.post("/signin", (req, res) => {

  const user = new User({
    userName: req.body.email,
    password: req.body.password
  }) 
  
  user.save((err, savedUser) => {

    if(err) return res.json({err: err})

    if(savedUser) {
      console.log(savedUser);
      res.redirect("/")
    }
  })

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});