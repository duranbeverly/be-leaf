import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviews"
import { fetchPlants } from "../../store/plants";
import OpenModalButton from "../OpenModalButton";
import ReviewCreateModal from "../ReviewCreateModal";
import ReviewEditModal from "../ReviewEditModal";
import ReviewDeleteModal from "../ReviewDeleteModal";
import './ReviewView.css'

export default function ReviewView() {
    // we first need to get the reviews from the database on first render
    const dispatch = useDispatch()
    let [isLoading, setIsLoading] = useState(true)
    let plants = useSelector((state) => state.plants.all_plants)
    let user = useSelector((state) => state.session.user)

    // create a loading variable so that if the data hasn't yet been fetched you don't error out

    useEffect(() => {
        dispatch(fetchReviews()).then(() => dispatch(fetchPlants())).then(() => setIsLoading(false))

    }, [dispatch])

    let reviews = useSelector((state) => state.reviews.all_reviews)
    if (isLoading) {
        return <div className="reviews-index-container"></div>
    }

    reviews = Object.values(reviews).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div className="reviews-index-container">
            <div className="review-title-div">
                <h1 className="review-index-title">Reviews</h1>
                {user &&

                    <OpenModalButton
                        buttonText="Leave a Review"
                        className="small-button"
                        modalComponent={<ReviewCreateModal plants={plants} user={user} />}
                    />
                }


            </div>
            <div className="all-reviews-cards">
                {reviews && reviews.map(rev => {
                    let name = rev.user_name
                    let userId = rev.user_id
                    let stars = rev.rating
                    let reviewText = rev.review
                    let plantName = rev.plant_name
                    let reviewId = rev.id
                    let image = rev.image
                    return (

                        <div className="review-card" key={reviewId}>
                            <div className="review-index-card">
                                <div className="review-left-icon">
                                    <div className="user-icon">
                                        {name[0]}
                                    </div>
                                </div>
                                <div className="review-right">
                                    <div className="top-right-review">
                                        <div className="top-info-left">
                                            <p className="user-name">{name}</p>
                                            <div className="stars">
                                                {Array(stars)
                                                    .fill()
                                                    .map((stars, index) => (
                                                        <i key={index} className="fa-solid fa-star"></i>
                                                    ))}
                                            </div>


                                        </div>
                                        <div className="top-info-right">
                                            <p className="time-created">{rev.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="bottom-right-review">
                                        <p className="plant-name-review">{plantName}</p>
                                        <p className="review-text">{reviewText}</p>
                                        <div className="review-img-container">
                                            <img className="review-index-img" src={image} alt={plantName}></img>

                                        </div>
                                    </div>
                                    {user && userId === user.id &&
                                        <div className="change-buttons">
                                            <OpenModalButton
                                                className="edit-button"
                                                buttonText="Edit"
                                                modalComponent={<ReviewEditModal plants={plants} user={user} reviewId={reviewId} />}
                                            />
                                            <OpenModalButton
                                                className="delete-button"
                                                buttonText="Delete"
                                                modalComponent={<ReviewDeleteModal reviewId={reviewId} />}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
