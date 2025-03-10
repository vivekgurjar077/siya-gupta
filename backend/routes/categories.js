const router = require("express").Router()
const Category = require("../model/Category")

router.post("/", async (req, res) => {
  const newCat = new Category(req.body)
  try {
    const savedCat = await newCat.save()
    res.status(200).json(savedCat)
  } catch (error) {
    res.status(500).json(error)
  }
})
/* {
    "name":"sport" 
} */

// get all cat
router.get("/", async (req, res) => {
  try {
    const cat = await Category.find()
    res.status(200).json(cat)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route to get all blogs of the authenticated user
/*
router.get('/my-blogs', authenticateUser, async (req, res) => {
  try {
      const userId = req.user._id;
      const blogs = await Blog.find({ userId });
      res.status(200).json(blogs);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});
*/

module.exports = router
