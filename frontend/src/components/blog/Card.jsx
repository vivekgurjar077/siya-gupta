import React, { useState, useEffect } from "react";
import "./blog.css";
import axios from "axios";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineShareAlt, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Card = ({ posts }) => {
  const [postLikes, setPostLikes] = useState([]);

  useEffect(() => {
    // Initialize likes count from posts prop
    setPostLikes(posts.map(post => post.likes));
  }, [posts]);

  const PublicFlo = "http://localhost:5000/images/";
  
  const handleLike = async (id, index) => {
    try {
      const response = await axios.post(`http://localhost:5000/posts/${id}/like`);
      if (response.status === 200) {
        console.log("Response data:", response.data); // Log the response data
        const updatedLikes = response.data.likes;
        setPostLikes(prevLikes => {
          const newPostLikes = [...prevLikes];
          newPostLikes[index] = updatedLikes; // Update likes
          return newPostLikes;
        });
        toast.success("Post liked!", {
          style: { backgroundColor: 'green' },
        });
      }
    } catch (error) {
      console.error(`Failed to update likes for post ${id}:`, error);
      
    }
  };
  
  const renderPost = (item, index) => (
    <div className='box boxItems' key={item._id}>
      <div className='img'>{item.photo && <img src={PublicFlo + item.photo} alt='' />}</div>
      <div className='details'>
        <div className='tag'>
          {item.categories.map((c, idx) => (
            <a href='/' key={idx}>#{c}</a>
          ))}
        </div>
        <Link to={`/post/${item._id}`}>
          <h3>{item.title}</h3>
        </Link>
        <p>{item.desc.slice(0, 180)}...</p>
        <div className='date'>
          <AiOutlineClockCircle className='icon' /> <label>{new Date(item.createdAt).toDateString()}</label>
          <AiOutlineLike className='icon like-button' onClick={() => handleLike(item._id, index)} /> <label>{postLikes[index]}</label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {posts.map((item, index) => renderPost(item, index))}
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Card;
