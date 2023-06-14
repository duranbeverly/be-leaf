import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Footer() {
    return (
        <div className='root'>
            <div className='footer'>
                <p className='developer-name'>Beverly Duran</p>
                <div className='social-media-div'>
                    <a href="https://github.com/duranbeverly" target="_blank">
                        <img className="social-icon" src="https://be-leaf.s3.amazonaws.com/github-icon.png"></img>
                    </a>
                    <a href="https://www.linkedin.com/in/beverly-duran/" target="_blank">
                        <img className="social-icon" src="https://be-leaf.s3.amazonaws.com/linkedin-icon.png"></img>
                    </a>
                </div>
            </div>
        </div>
    )
}
