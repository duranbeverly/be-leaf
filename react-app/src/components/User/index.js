import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { logout } from "../../store/session";
import "./User.css"
import { NavLink } from "react-router-dom";



export default function User() {
    let dispatch = useDispatch()
    let history = useHistory()
    let user = useSelector((state) => state.session.user)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout()).then(() => history.push('/'));
    };

    if (!user) {
        return <Redirect to={{ pathname: "/login", state: { from: "/user" } }} />
    }

    return (
        <div className="user-wrapper">
            <div className="side-bar">
                <div className="account-side-bar">
                    <NavLink to="/plants/new" className="sell-text">Sell a Plant</NavLink>
                    <i className="fa-solid fa-seedling"></i>
                </div>
                <div className="account-side-bar">
                    <NavLink to="/user-plants" className="sell-text">View My Plants</NavLink>
                    <i className="fa-solid fa-leaf"></i>
                </div>
                <div className="account-side-bar">
                    <NavLink to="/favorites" className="sell-text">Favorites</NavLink>
                    <i className="fa-solid fa-heart"></i>
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
                            value={user.email}
                            readOnly
                        />
                    </label>
                    <label className="form-label">
                        FIRST NAME
                        <input
                            type="text"
                            className="form-input"
                            value={user.first_name}
                            readOnly
                        />
                    </label>
                    <label className="form-label">
                        LAST NAME
                        <input
                            type="text"
                            className="form-input"
                            value={user.last_name}
                            readOnly
                        />
                    </label>

                </form>
            </div>
        </div>
    )
}
