import React, { useEffect, useState, useContext } from "react";
import { Card } from "../../components/blog/Card";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";

export const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const history = useHistory();
  const { user } = useContext(Context);

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      history.push("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + search);
        if (user) {
          const userBlogs = res.data.filter(post => post.username === user.username);
          setPosts(userBlogs);

          // Redirect to create post page if no posts are found
          if (userBlogs.length === 0) {
            history.push("/create");
          }
        }
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };
    fetchPosts();
  }, [search, user, history]);

  return (
    <>
      <Card posts={posts} />
      {/* Additional content or components can be added here */}
    </>
  );
};
