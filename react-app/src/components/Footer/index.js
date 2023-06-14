import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Footer() {
    return (
        <>
            <div className='footer'>
                <p className='developer-name'>Beverly Duran</p>
                <div className='social-media-div'>
                    <NavLink path to="https://github.com/duranbeverly">
                        <img className="social-icon" src="https://be-leaf.s3.amazonaws.com/github-icon.png"></img>
                    </NavLink>
                    <NavLink path to="https://www.linkedin.com/in/beverly-duran/">
                        <img className="social-icon" src="https://be-leaf.s3.amazonaws.com/linkedin-icon.png"></img>
                    </NavLink>
                </div>

            </div>
        </>
    )
}
