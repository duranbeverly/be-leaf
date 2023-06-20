import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { fetchCartItems } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import ShoppingCartModal from "../ShoppingCartModal";
import { fetchPlants } from "../../store/plants";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  let cart = useSelector((state) => state.cart.all_items)
  let allPlants = useSelector((state) => state.plants?.all_plants)

  useEffect(() => {
    dispatch(fetchCartItems()).then(() => dispatch(fetchPlants())).then(() => setIsLoading(false))
  }, [dispatch])

  const handleSubmit = () => {

  }

  if (isLoading) {
    return <div className="right-nav-buttons"></div>
  }

  return (
    <div className="right-nav-buttons">
      {user ? (
        <>
          <NavLink className='profile-button' exact to='/user'><i className="fa-regular fa-user" /></NavLink>
          <OpenModalButton
            className={'profile-button'}
            buttonText={< i className="fa-regular fa-basket-shopping-simple" />}
            modalComponent={<ShoppingCartModal cart={cart} plants={allPlants} />}
          />
        </>
      ) : (
        <>
          <NavLink className='profile-button' exact to='/login'><i className="fa-regular fa-user" /></NavLink>
          <NavLink
            exact to='/login'>
            < i className="fa-regular fa-basket-shopping-simple" />
          </NavLink>
        </>

      )

      }

      {/* <button className="profile-button" onClick={openMenu}>
        <i className="fa-regular fa-user" />
      </button> */}
      {/* <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul> */}
    </div>
  );
}

export default ProfileButton;
