const router = require("express").Router();
const Post = require("../model/Post");
const { findAndFilter } = require("./findAndFilter");
const words = require("./words.json"); // Ensure this path is correct


const languages = ["en"]; // Specify the languages you want to check
const allowed_words = []; // Define any allowed words if needed
const placeholder = "*"; // Placeholder character to replace bad words
const myList = []; // Additional custom words list

// Function to filter posts by title
const filterPostsByTitle = async (searchTerm) => {
  try {
    const filteredPosts = await Post.find({
      title: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
    });
    return filteredPosts;
  } catch (error) {
    throw error;
  }
};

// Search posts by title
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  try {
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Filter posts by title
    const posts = await filterPostsByTitle(searchTerm);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json(error);
  }
});


// Like Post
router.post('/:id/like', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update likes count
    post.likes += 1;
    await post.save();

    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error('Failed to update post likes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create post
router.post("/", async (req, res) => {
  const { username, title, desc } = req.body;

  // Filter title
  const titleResult = findAndFilter(title, placeholder, languages, allowed_words, myList);
  if (titleResult.found) {
    req.body.title = titleResult.filtered_sentence;
  }

  // Filter description
  const descResult = findAndFilter(desc, placeholder, languages, allowed_words, myList);
  if (descResult.found) {
    req.body.desc = descResult.filtered_sentence;
  }

  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
router.put("/:id", async (req, res) => {
  const { username, title, desc } = req.body;

  // Filter title
  const titleResult = findAndFilter(title, placeholder, languages, allowed_words, myList);
  if (titleResult.found) {
    req.body.title = titleResult.filtered_sentence;
  }

  // Filter description
  const descResult = findAndFilter(desc, placeholder, languages, allowed_words, myList);
  if (descResult.found) {
    req.body.desc = descResult.filtered_sentence;
  }

  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatePost);
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await post.delete();
      res.status(200).json("Post has been deleted!");
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;