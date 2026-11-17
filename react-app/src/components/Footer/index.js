import React from 'react';


export default function Footer() {
    return (
        <footer className='root'>
            <div className='footer'>
                <p className='developer-name'>Beverly Duran</p>
                <div className='social-media-div'>
                    <a href="https://github.com/duranbeverly" target="_blank" rel="noreferrer" aria-label="Beverly Duran on GitHub (opens in a new tab)">
                        <img className="social-icon" alt="" src="https://be-leaf.s3.amazonaws.com/github-icon.png"></img>
                    </a>
                    <a href="https://www.linkedin.com/in/beverly-duran/" target="_blank" rel="noreferrer" aria-label="Beverly Duran on LinkedIn (opens in a new tab)">
                        <img className="social-icon" alt="" src="https://be-leaf.s3.amazonaws.com/linkedin-icon.png"></img>
                    </a>
                </div>
            </div>
        </footer>
    )
}
