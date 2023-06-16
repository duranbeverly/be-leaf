import React, { useState } from "react";
import { login } from "../../store/session";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SplashPage.css'

export default function SplashPage() {

    const history = useHistory()
    const handleSubmit = () => {
        history.push('/plants')
    }

    return (
        <>
            <div className="image-container">
                <div className="splash-message">
                    <h1 className="splash-title">Grow Beyond Expectations</h1>
                    <p className="splash-message-body">Your summer oasis awaits.</p>
                    <button onClick={handleSubmit} className="splash-button">SHOP PLANTS</button>
                </div>
                <img className="splash-bg-image" src="https://be-leaf.s3.amazonaws.com/plants_landscape4.jpg"></img>
            </div>
        </>
    )
}
