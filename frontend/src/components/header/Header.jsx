import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import logo from "../../assets/images/logo.svg";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";
export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
   
  return (
    <>
      <header className="header">
        <div className="scontainer flex">
          <div className="logo">
            <a href="/">MY VEILED CHRONICLES</a>{/*<img src={logo} alt="logo" width="100px" />*/}
          </div>
          <nav>
          <ul className="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="/my-blogs">Your Journal</a></li>
                <li><a href="/about-us">About Us</a></li>
            </ul>
          
          </nav>
          <div className="account flexCenter">
            <User />
          </div>
        </div>
      </header>
    </>
  );
};
