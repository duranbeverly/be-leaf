import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeButton, setActiveButton] = useState("signup")
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
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
        <NavLink
          className={`login-div ${activeButton === 'login' ? 'active' : ""}`}
          exact to="/login"
        >
          <p className="login-nav" >Log in</p>
        </NavLink>
        <div
          className={`signup-div ${activeButton === 'signup' ? 'active' : ""}`}

        >
          <p className="signup-nav" exact to="/signup">Sign up</p>
        </div>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title" >Sign Up</h1>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="form-label">
          EMAIL
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          FIRST NAME
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          LAST NAME
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          PASSWORD
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          CONFIRM PASSWORD
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
