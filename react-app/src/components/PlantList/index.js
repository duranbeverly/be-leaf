import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { NavLink } from "react-router-dom";
import './PlantList.css'

export default function PlantList() {
    const dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(true)
    let plants = Object.values(useSelector((state) => state.plants))

    useEffect(() => {
        dispatch(fetchPlants())
    }, [])

    if (isLoading) {
        return <div className="plant-index-container"></div>
    }
    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">Indoor Plants</h1>

        </div>
    )
}
