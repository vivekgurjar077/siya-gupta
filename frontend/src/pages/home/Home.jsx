import React, { useEffect, useState, useContext } from "react";
import { Card } from "../../components/blog/Card";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import olivia from "../../assets/images/olivia wilson.jpg"
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  
  const { search } = useLocation();
  const history = useHistory();
  const { user } = useContext(Context);

  // Fetch posts based on the search query in the URL
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search]);

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setAllPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPosts();
  }, []);

  // Fetch search results based on searchTerm
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/posts/search?q=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Handle create button click
  const handleCreateClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      history.push("/create");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1><span>Share Your Untold Stories</span></h1>
          <p>Connect with a community of storytellers and share your untold tales with the world.</p>
          <img src={olivia} alt="" className="hero-image"/>
        </div>
      </section>
      <div className="com-feed" >Community Feed</div>
      {/* Search bar */}
      <div className="s-s-btn">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Journal..."
        />
      </div>
      <button className="create-btn" onClick={handleCreateClick}>Share Your Story</button>
      
      </div>
      {/* Display search results or all posts */}
      {searchTerm.trim() !== "" ? (
        <div className="search-results">
          <Card posts={searchResults} />
        </div>
      ) : (
        <div>
          <Card posts={allPosts} />
        </div>
      )}

      {/* Display posts based on URL search query */}
      {search && (
        <div>
          <h2>Filtered Posts</h2>
          <Card posts={posts} />
        </div>
      )}
    </>
  );
};
