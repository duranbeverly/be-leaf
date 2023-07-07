import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../../store/plants";
import { thunkAddFav, thunkDeleteFav } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import './PlantList.css'
import { ClockLoader } from "react-spinners"

export default function PlantList() {
    const dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(true)
    let userInfo = useSelector((state) => state.session.user)
    let history = useHistory()
    const cardRefs = useRef([]);
    // note - in user we have a favorites key that is a dictionary that has all the favorites in it with id as the key

    useEffect(() => {
        dispatch(fetchPlants()).then(() => setIsLoading(false))
    }, [dispatch])

    let plants = (useSelector((state) => state.plants.all_plants))

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const visibleHeight = windowHeight + scrollTop;

            cardRefs.current.forEach((cardRef, index) => {
                const rect = cardRef.getBoundingClientRect();
                const cardTop = rect.top + scrollTop;
                const cardBottom = cardTop + rect.height;

                if (cardBottom >= scrollTop && cardTop <= visibleHeight) {
                    if (cardTop >= scrollTop + windowHeight * 0.8) {
                        cardRef.classList.add("fade-in");
                    } else {
                        cardRef.classList.remove("fade-in");
                    }
                } else {
                    cardRef.classList.remove("fade-in");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call handleScroll once on initial render to apply fade-in effect to the visible items
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (isLoading) {
        return <div className="plant-index-container" style={{ opacity: 0.5 }}>
            <ClockLoader color="#224229" size={30} />
        </div>
    }



    return (
        <div className="plant-index-container">
            <h1 className="plant-index-title">Indoor Plants</h1>
            <div className="all-plant-cards">
                {plants && Object.values(plants).map((plant, index) => {
                    let image = plant.preview_image
                    let name = plant.name
                    let user = plant.first_name
                    let price = plant.price
                    let plantId = parseInt(plant.id)

                    return (
                        <div className="plant-card" key={plant.id} ref={(ref) => (cardRefs.current[index] = ref)} >
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
