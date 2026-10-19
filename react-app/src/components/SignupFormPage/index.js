import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeButton] = useState("signup")
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to={location.state?.from || "/"} />;

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { form, ...fieldErrors } = errors || {};
    if (Object.keys(fieldErrors).length > 0) {
      return
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" })
      return
    }


    const data = await dispatch(signUp(firstName, lastName, email, password));
    if (data) {
      // the server sends a list like ["email : Email address is already in use."]
      const serverErrors = {};
      data.forEach((error) => {
        const [field, ...message] = error.split(" : ");
        if (message.length) serverErrors[field === "email" || field === "password" ? field : "form"] = message.join(" : ");
        else serverErrors.form = error;
      });
      setErrors(serverErrors);
    }

  };

  // Validation regex pattern for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation check for a valid email
  const isValidEmail = (email) => emailRegex.test(email);



  return (
    <div className="form-wrapper">
      <div className="session-nav">
        <NavLink
          className={`login-div ${activeButton === 'login' ? 'active' : ""}`}
          to={{ pathname: "/login", state: location.state }}
        >
          <p className="login-nav" >Log in</p>
        </NavLink>
        <div
          className={`signup-div ${activeButton === 'signup' ? 'active' : ""}`}

        >
          <p className="signup-nav">Sign up</p>
        </div>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-title" >Sign Up</h1>
        {errors && errors.form && <p className="errors">{errors.form}</p>}
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
          {errors && errors.password && <p className="errors">{errors.password}</p>}
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => {
              let password = e.target.value.trim();
              if (!password || password.length < 5 || password.length > 30) {
                setErrors((prev) => {
                  let err = { ...prev };
                  err.password = "Not a valid password";
                  setDisabled(true);
                  return err;
                });
              } else {
                setErrors((prev) => {
                  let err = { ...prev };
                  delete err.password;
                  setDisabled(false);
                  return err;
                });
              }
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        <label className="form-label">
          CONFIRM PASSWORD
          {errors && errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => {
              let password2 = e.target.value.trim()
              if (password2 !== password) {
                setErrors(prev => {
                  let err = { ...prev }
                  err.confirmPassword = "Passwords don't match"
                  setDisabled(true)
                  return err
                })
              } else {
                setErrors(prev => {
                  let err = { ...prev }
                  delete err.confirmPassword
                  setDisabled(false)
                  return err
                })
              }
              setConfirmPassword(e.target.value)
            }}
            required
          />
        </label>
        <button disabled={disabled} id={disabled ? "disabled" : undefined} className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
