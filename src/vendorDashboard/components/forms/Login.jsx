import React from "react";
import { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("login success");
        localStorage.setItem("loginToken", data.token);
        setEmail("");
        setPassword("");
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log(vendorId);
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`,
      );
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {

        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firstname;
        console.log("my firm name",vendorFirmName);
        console.log("checkinf for vendor id",vendorId);
        console.log("checking for firmid", vendorFirmId);
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
         window.location.reload()
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="loginSection" onSubmit={loginHandler}>
      <form className="authForm">
        <h3>Vendor Login</h3>

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter  your email"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="passsword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter you password"
        />
        <button type="submit" className="btnSubmit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
