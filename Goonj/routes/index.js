var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const bodyParser = require("body-parser");
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))
const upload = require('./multer')

const posts = []

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/")
}


router.get('/', function (req, res, next) {
  res.render('index', { nav: false });
});
router.get("/register", function (req, res, next) {
  res.render("register", { nav: false })
})
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const username = req.query.username;
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render("profile", { user, nav: true, name: username })
})
router.get("/posts", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render("posts", { user, nav: true, posts: posts })
})
router.get("/add", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  res.render("add", { user, nav: true })
})






router.post("/posts", isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  const post = {
    title: req.body.title,
    content: req.body.description
  }
  posts.push(post)
  res.redirect("posts")
})

router.post("/fileupload", isLoggedIn, upload.single("image"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile")
})


router.post("/register", function (req, res) {
  const username = req.body.username;
  const data = new userModel({
    username: username,
    email: req.body.email,
    contact: req.body.contact
  })
  userModel.register(data, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile")
      })
    })
})
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/profile"
}), function (req, res) { })


router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})



module.exports = router;
