import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkAddFav, thunkDeleteFav } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import "./FavoriteView.css"

export default function FavoritesView() {
    const dispatch = useDispatch();
    let userInfo = useSelector((state) => state.session.user)
    let history = useHistory()

    if (!userInfo) {
        history.push('/')
    }



    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">Favorites</h1>
            <div className="all-plant-cards">
                {userInfo && Object.values(userInfo.favorites).length > 0 ? (
                    Object.values(userInfo.favorites).map(fav => {
                        let image = fav.preview_image
                        let price = fav.price
                        let name = fav.name
                        let user = fav.user_name
                        let plantId = parseInt(fav.id)
                        return (
                            <div className="plant-card" key={plantId}>
                                <NavLink className="plant-index-card" to={`/plants/${plantId}`}>
                                    <div className="img-container">
                                        {userInfo && userInfo.favorites[plantId] ?
                                            (<i onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(thunkDeleteFav(plantId))
                                            }} className="fa-duotone fa-heart"></i>) :
                                            (<i onClick={(e) => {
                                                e.preventDefault()
                                              
                                                dispatch(thunkAddFav(plantId))
                                            }} className="fa-regular fa-heart"></i>)
                                        }

                                        <img alt={name} src={image} className="plant-index-img"></img>

                                    </div>
                                    <div className="plant-index-top">
                                        <p className="plant-index-name">{name}</p>
                                        <p className="plant-index-price">{`$${price}`}</p>
                                    </div>
                                    <p className="plant-index-username">{user}</p>
                                </NavLink>
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <h2 className="fav-empty-title"> Oh No! You don't have any favorites! </h2>
                    </div>
                )
                }
            </div >
        </div >
    )
}
