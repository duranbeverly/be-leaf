import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ShoppingCartModal from "../ShoppingCartModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();



  const handleSubmit = () => {

  }
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  // };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="right-nav-buttons">
      {user ? (
        <>
          <NavLink className='profile-button' exact to='/user'><i className="fa-regular fa-user" /></NavLink>
          <OpenModalButton
            className={'profile-button'}
            buttonText={< i className="fa-regular fa-basket-shopping-simple" />}
            modalComponent={<ShoppingCartModal />}
          />
        </>
      ) : (
        <>
          <NavLink className='profile-button' exact to='/login'><i className="fa-regular fa-user" /></NavLink>
          <OpenModalButton
            className={'profile-button'}
            buttonText={< i className="fa-regular fa-basket-shopping-simple" />}
            modalComponent={<ShoppingCartModal />}
          />
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
