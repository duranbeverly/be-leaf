import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<header>
			<div className='green-top'></div>
			<nav aria-label="Main">
			<ul className='nav-bar'>
				<NavLink className='nav-list-left' to="/">
					<p className="site-name" >be-leaf</p>
				</NavLink>
				<li className='mid-navbar'>
					<NavLink className="nav-button" to="/plants">ALL PLANTS</NavLink>
					<NavLink className="nav-button" to="/pet-safe-plants">PET-FRIENDLY PLANTS</NavLink>
					<NavLink className="nav-button" to="/giant-plants">GIANT PLANTS</NavLink>
					<NavLink className="nav-button" to="/reviews">REVIEWS</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
			</nav>
		</header>
	);
}

export default Navigation;
