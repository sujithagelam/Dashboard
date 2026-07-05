import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";

import { useState,useEffect } from "react";
import AllProduct from "../components/AllProduct";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowwelcome] = useState(false);
  const [showAllProducts,setshowAllproducts] = useState(false);
  const [showLogout,setshowLogout] = useState(false);
  const [showFrimTitle,setShowFrimTitle] = useState(true);
  const logoutHandler = ()=>{
    confirm("are yu sure to logout?");
    localStorage.removeItem("loginToken")
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setshowLogout(false);
    setShowFrimTitle(true);


  }
  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){

      setshowLogout(true);

    }

  },[])
  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName)
    {
      setShowFrimTitle(false);
    }

  },[])

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setshowAllproducts(false);

  };
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowProduct(false);
    setShowFirm(false);
     setshowAllproducts(false);

  };

  const showFirmHandler = () => {
    if(showLogout)
    {
    setShowRegister(false);
    setShowLogin(false);
    setShowProduct(false);
    setShowFirm(true);
    setshowAllproducts(false);
    }
    else
    {
      alert("please login");
      setShowLogin(true);
    }

  };
  const showProductHandler = () => {
    if(showLogout)
    {

    
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(true);
     setshowAllproducts(false);
    }
    else
    {
      alert("please login");
      setShowLogin(true);

    }

  };
  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowwelcome(true);
        setshowAllproducts(false);

  };
  const showAllProductsHandler = ()=>{
    if(showLogout)
    {

    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowwelcome(false);
    setshowAllproducts(true);
        }
        else
    {
      alert("please login");
      setShowLogin(true);

    }




  }
  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout = {showLogout}
          logoutHandler ={logoutHandler }
        />
        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFrimTitle={showFrimTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm  && showLogout  && <AddFirm />}
          {showProduct && showLogout &&  <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout &&   <AllProduct />}

          {/* <Register /> */}
          {/* <AddFirm /> */}
          {/* <AddProduct /> */}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
