import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div className='green-top'></div>
			<ul className='nav-bar'>
				<NavLink className='nav-list-left' exact to="/">
					<p className="site-name" >be-leaf</p>
				</NavLink>
				<li className='mid-navbar'>
					<p>All Plants</p>
					<p>Pet-Friendly Plants</p>
					<p>Giant Plants</p>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>

		</>
	);
}

export default Navigation;
