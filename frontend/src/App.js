import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Regsiter } from "./pages/login/Regsiter";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DetailsPages } from "./pages/details/DetailsPages";
import { Account } from "./pages/account/Account";
import { Create } from "./components/create/Create";
import { MyBlogs} from "./components/myblogs/MyBlogs";
import { Context } from "./context/Context";
import {AboutUs} from "./pages/aboutus/AboutUs";

const App = () => {
  const { user } = useContext(Context);
  
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Regsiter} />
          <Route exact path="/post/:id" component={DetailsPages} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/my-blogs" component={MyBlogs} />
          <Route exact path="/About-us" component={AboutUs} />
        </Switch>
        <ToastContainer />
        <Footer />
      </Router>
    </>
  );
};
export default App;
