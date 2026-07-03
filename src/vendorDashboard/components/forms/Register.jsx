import React from "react";
import { useState } from "react";
import { API_URL } from "../../data/apiPath";


const Register = ({showLoginHandler}) => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,serError] = useState("");
  const [loading,setLoading] = useState("");
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try
    {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      });
      const data = await response.json();
      if(response.ok)
      {
        
       console.log(data);
       setEmail("");
       setUsername("");
       setPassword("");
       alert("vendor registred succsfully")
       showLoginHandler();

      }
    }
    catch(err)
    {
      console.error("restaraion failed");
    }

  }
  return (
    <div className="registerSection" onSubmit={handleSubmit}>
      <form className="authForm">
        <h3>Vendor Register</h3>
        <label>Name</label>
         <input type="text" name='username'  value={username}onChange={(e)=>setUsername(e.target.value)} placeholder="Enter  your name" /><br />
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter  your email" />
        <br />
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter you password" />
        <button className="btnSubmit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
