import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { thunkAddFav, thunkDeleteFav } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import './PetFriendlyPlants.css'
import { ClockLoader } from "react-spinners"

export default function PetFriendlyPlants() {
    const dispatch = useDispatch();
    let userInfo = useSelector((state) => state.session.user)
    let [isLoading, setIsLoading] = useState(true)
    let history = useHistory()

    useEffect(() => {
        dispatch(fetchPlants()).then(() => setIsLoading(false))
    }, [dispatch])

    let plants = (useSelector((state) => state.plants.all_plants))
    if (isLoading) {
        return <div className="plant-index-container" style={{ opacity: 0.5 }}>
            <div className="center-loading">
                <ClockLoader color="#224229" size={30} />
            </div>
        </div>
    }


    plants = Object.values(plants).filter((plant => plant.is_pet_friendly === true))

    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">Pet Friendly Plants</h1>
            <div className="all-plant-cards">
                {plants && (plants).map(plant => {
                    let image = plant.preview_image
                    let name = plant.name
                    let user = plant.first_name
                    let price = plant.price
                    let plantId = parseInt(plant.id)

                    return (
                        <div className="plant-card" key={plant.id} >
                            <NavLink className="plant-index-card" to={`/plants/${plantId}`}>
                                <div className="img-container">
                                    {userInfo && userInfo.favorites[plantId] ?
                                        (<i onClick={(e) => {
                                            e.preventDefault()

                                            dispatch(thunkDeleteFav(plantId))
                                        }} className="fa-duotone fa-heart"></i>) :
                                        (<i onClick={(e) => {
                                            e.preventDefault()

                                            if (!userInfo) {
                                                return history.push('/login')
                                            } else {
                                                dispatch(thunkAddFav(plantId))
                                            }


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
                })}


            </div>
        </div>
    )

}
