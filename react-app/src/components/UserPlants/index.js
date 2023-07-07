import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { useHistory } from "react-router-dom";
import ConfirmDelete from "../ConfirmDelete";
import './UserPlants.css'
import OpenModalButton from "../OpenModalButton";
import { ClockLoader } from "react-spinners"

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


    // plants1 is an object so we need to make it iterable

    if (isLoading) {
        return <div className="plant-index-container" style={{ opacity: 0.5 }}>
            <div className="center-loading">
                <ClockLoader color="#224229" size={30} />
            </div>
        </div>
    }
    let plants = Object.values(plants1).filter((plant) => plant.user_id === user.id)



    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">My Plants</h1>
            <div className="all-plant-cards">
                {plants && plants.map(plant => {
                    let image = plant.preview_image
                    let name = plant.name
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
                                    <button className="edit-button" onClick={(e) => history.push(`/edit/${plant.id}`)}>Edit</button>
                                    <OpenModalButton
                                        buttonText="Delete"
                                        className="delete-button"
                                        modalComponent={<ConfirmDelete plantId={plant.id} />}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>

        </div >
    )
}
