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
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("do we have errors? 😒 ", errors)
    if (errors && Object.keys(errors).length > 0) {
      console.log("it seems we have errors - inside the disable ")
      return alert("fix the errors")
    }

    console.log("we didn't have errors going to dispatch 💖🥙")
    const data = await dispatch(signUp(firstName, lastName, email, password));
    if (data) {
      setErrors(data.errors)
    }

  };

  // Validation regex pattern for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation check for a valid email
  const isValidEmail = (email) => emailRegex.test(email);

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
        <label className="form-label">
          EMAIL
          {errors && errors.email && <p className="errors">{errors.email}</p>}
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => {
              let newEmail = e.target.value.trim()
              if (!isValidEmail(newEmail)) {
                setErrors(prev => {
                  let err = { ...prev }
                  err.email = "Not a valid email"
                  setDisabled(true)
                  return err
                })
              } else {
                setErrors(prev => {
                  let err = { ...prev }
                  delete err.email
                  setDisabled(false)
                  return err
                })
              }
              setEmail(newEmail)
            }}
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
          {errors && errors.password && <p className="errors">{errors.password}</p>}
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => {
              let password2 = e.target.value.trim()
              if (password2 != password) {
                setErrors(prev => {
                  let err = { ...prev }
                  err.password = "passwords don't match"
                  setDisabled(true)
                  return err
                })
              } else {
                setErrors(prev => {
                  let err = { ...prev }
                  delete err.password
                  setDisabled(false)
                  return err
                })
              }
              setConfirmPassword(e.target.value)
            }}
            required
          />
        </label>
        <button disabled={disabled} className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
