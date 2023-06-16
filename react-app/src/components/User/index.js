import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import "./User.css"
import { NavLink } from "react-router-dom";



export default function User() {
    let dispatch = useDispatch()
    let history = useHistory()
    let user = useSelector((state) => state.session.user)
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);

    if (!user) {
        history.push("/")
    }

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout()).then(history.push('/'));
    };
    return (
        <div className="user-wrapper">
            <div className="side-bar">
                <div className="account-side-bar">
                    <NavLink to="/plants/new" className="sell-text">Sell a Plant</NavLink>
                    <i className="fa-solid fa-hand-holding-seedling"></i>
                </div>
                <div className="account-side-bar">
                    <NavLink to="/user-plants" className="sell-text">View My Plants</NavLink>
                    <i className="fa-solid fa-cactus"></i>
                </div>
                <div className="account-side-bar">
                    <button className="logout-button" onClick={handleLogout}>Log out</button>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
            <div className="form-wrapper">
                <form className="form-container">
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

                </form>
            </div>
        </div>
    )
}
