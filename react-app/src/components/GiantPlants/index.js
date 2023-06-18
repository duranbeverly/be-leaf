import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { NavLink } from "react-router-dom";
import './GiantPlants.css'

export default function GiantsPlants() {
    const dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchPlants()).then(() => setIsLoading(false))
    }, [dispatch])

    let plants = (useSelector((state) => state.plants.all_plants))
    if (isLoading) {
        return <div className="plant-index-container"></div>
    }


    plants = Object.values(plants).filter((plant => plant.is_giant == true))

    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">Giant Plants</h1>
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
