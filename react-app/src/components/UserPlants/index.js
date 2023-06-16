import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { NavLink, useHistory } from "react-router-dom";
import './UserPlants.css'

export default function UserPlants() {
    const dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(true)
    let plants1 = useSelector((state) => state.plants.all_plants)
    let user = useSelector((state) => state.session.user)
    let history = useHistory()

    if (!user) {
        history.push("/")
    }

    useEffect(() => {
        dispatch(fetchPlants()).then(() => setIsLoading(false))
    }, [dispatch])

    const handleEdit = () => {
        history.push('/edit')
    }

    const handleDelete = () => {
        // dispatch to delete the plant
    }
    // plants1 is an object so we need to make it iterable

    if (isLoading) {
        return <div className="plant-index-container"></div>
    }
    let plants = Object.values(plants1).filter((plant) => plant.user_id == user.id)

    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">My Plants</h1>
            <div className="all-plant-cards">
                {plants && plants.map(plant => {
                    let image = plant.preview_image
                    let name = plant.name
                    let user = plant.first_name
                    let price = plant.price
                    let plantId = parseInt(plant.id)

                    return (
                        <div className="plant-card" key={plant.id} >
                            <div className="plant-index-card" to={`/plants/${plantId}`}>
                                <div className="img-container">
                                    <img alt={name} src={image} className="plant-index-img"></img>
                                </div>
                                <div className="plant-index-top">
                                    <p className="plant-index-name">{name}</p>
                                    <p className="plant-index-price">{`$${price}`}</p>
                                </div>
                                <div className="change-buttons">
                                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>

        </div >
    )
}
