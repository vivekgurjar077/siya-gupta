const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require("bcrypt")
// regsiter
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // If no user found
    if (!user) {
      return res.status(400).json("Wrong Credentials!");
    }

    // If user found, compare the password
    const validate = await bcrypt.compare(req.body.password, user.password);

    // If password does not match
    if (!validate) {
      return res.status(400).json("Wrong Credentials!");
    }

    // If password matches
    console.log(req.body);
    const { password, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router
