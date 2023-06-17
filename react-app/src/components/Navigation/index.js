import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const handleReview = () => {
		history.push("/reviews")
	}

	return (
		<div>
			<div className='green-top'></div>
			<ul className='nav-bar'>
				<NavLink className='nav-list-left' exact to="/">
					<p className="site-name" >be-leaf</p>
				</NavLink>
				<li className='mid-navbar'>
					<p>ALL PLANTS</p>
					<p>PET-FRIENDLY PLANTS</p>
					<p>GIANT PLANTS</p>
					<p onClick={handleReview}>REVIEWS</p>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>

		</div>
	);
}

export default Navigation;
