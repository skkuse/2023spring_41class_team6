import React, { Fragment } from 'react';
import "./Login.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../component/Navbar';


function Login(props) {

  const navigate  = useNavigate();

  const moveToRegisterPage = () => {
    navigate("/register");
  }

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  /*const database = [
    {
      user_id: "user1",
      password: "pass1",
    },
    {
      user_id: "user2",
      password: "pass2"
    },{
      user_id: "user",
      password: "pass"
    }
  ];

  const errors = {
    uname: "invalid user id",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.user_id === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);

        axios.get("", {
          params: {
            user_id:userData.user_id
          },
        });

        console.log(userData);
      }
    } else {
      // user_id not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { uname, pass } = e.target.elements;

    try {
      const response = await axios.post("/common/login/", {
        user_id: uname.value,
        password: pass.value,
      });

      if (response.data.success) {
        setIsSubmitted(true);
        console.log(response.data.user);
      } else {
        setErrorMessages({name: "pass", message: response.data.message});
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="login_error">{errorMessages.message}</div>
    );

  /*useEffect(() => {
    axios.get("", {
      params: {
        user_id:userData.user_id,
      },
    }).then();
  });*/

  // -----------------------------------------------------------------
  // JSX code for login form
  const renderForm = (
    <div className="login_form">
      <form onSubmit={handleSubmit}>
        <div className="login_input-container">
          <label>user_id </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="login_input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="login_button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <Fragment>
    <Navbar/>
    <div className="login_app">
      <div className="login-form">
        <div className="login_title">Sign In</div>


        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
      <p>Are not Registered?</p>
      <button onClick={moveToRegisterPage}>Sign up</button>
    </div>
    </Fragment>
  );
}


export default Login;
