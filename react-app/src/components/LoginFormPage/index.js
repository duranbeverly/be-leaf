import React, { useState } from "react";
import { login } from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState("login")
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  // const handleSignupClick = (e) => {

  //   setActiveButton("signup")
  // }

  // const handleLoginClick = (e) => {

  //   setActiveButton("login");
  // };

  return (
    <div className="form-wrapper">
      <div className="session-nav">
        <div
          className={`login-div ${activeButton === 'login' ? 'active' : ""}`}
        >
          <p className="login-nav">Log in</p>
        </div>
        <NavLink
          className={`signup-div ${activeButton === 'signup' ? 'active' : ""}`}
          exact to="/signup"
        >
          <p className="signup-nav" >Sign up</p>
        </NavLink>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title">Log In</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="form-label">
          EMAIL
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          PASSWORD
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label >
        <button className="form-button" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
