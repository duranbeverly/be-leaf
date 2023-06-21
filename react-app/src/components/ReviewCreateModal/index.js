import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./ReviewCreateModal.css"
import { thunkCreateReview } from "../../store/reviews";

export default function ReviewCreateModal({ plants, user }) {
    const dispatch = useDispatch()
    const history = useHistory()
    // create use states to keep track of plant id, stars, review
    const [stars, setStars] = useState(0)
    const [review, setReview] = useState("")
    const [plantId, setPlantId] = useState("")
    const [plantName, setPlantName] = useState("")
    const [image, setImage] = useState("")
    const [activeRating, setActiveRating] = useState(0);
    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    if (!user) {
        history.push("/")
    }

    // get all the plants so you can pass them in as options to the drop down

    plants = Object.values(plants).filter((plant) => plant.user_id != user.id)

    const validExtension = (fileName) => {
        const ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "gif"];
        const fileExtension = fileName.split(".").pop().toLowerCase();
        return ALLOWED_EXTENSIONS.includes(fileExtension);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (Object.keys(errors).length > 0) {
            return
        }

        if (!image) {
            newErrors.image = "Please choose an image";
        }

        if (!stars) {
            newErrors.stars = "Please choose a star rating"
        }

        if (!plantName) {
            newErrors.plant = "Choose a plant for the review"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let correctPlant = plants.find((plant) => plant.name == plantName)

        // in here send a formData and then close the modal
        // the new review should appear on top
        // remember to close the modal
        const formData = new FormData()
        formData.append("user_id", user.id)
        formData.append("plant_id", correctPlant.id)
        formData.append("rating", stars)
        formData.append("review", review)
        formData.append("image", image)

        setIsLoading(true)

        dispatch(thunkCreateReview(formData)).then((data) => {
            if (data.error) {
                setErrors(data.error);
                setIsLoading(false);
            } else {
                closeModal()
            }
        })

    }

    if (isLoading) {
        return (
            <div className="review-form">
                <h1>Loading Changes...</h1>
            </div>
        )
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2 className="review-title">Leave a Review</h2>
            <label className="review-label">
                Stars:
                {errors.stars && <p className="errors">{errors.stars}</p>}
                <div className="rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(1)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(1)}
                    >
                        {activeRating >= 1 ?
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                            :
                            <i className={`fa-regular fa-star fa-2xl ${activeRating >= 1 ? 'filled' : ''}`}></i>
                        }
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(2)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(2)}
                    >
                        {activeRating >= 2 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}

                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(3)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(3)}
                    >
                        {activeRating >= 3 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(4)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(4)}
                    >
                        {activeRating >= 4 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveRating(5)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(5)}
                    >
                        {activeRating >= 5 ? (
                            <i className={`fa-solid fa-star fa-2xl filled`}></i>
                        ) : (
                            <i className={`fa-regular fa-star fa-2xl`}></i>
                        )}
                    </div>
                </div>
            </label>
            <label className="form-label">
                Plant Purchased
                {errors.plant && <p className="errors">{errors.plant}</p>}
                <select
                    className="form-dropdown"
                    placeholder="Select"
                    value={plantName}
                    onChange={(e) => setPlantName(e.target.value)}
                >
                    {plants && plants.map(plant => (
                        <option key={plant.id} value={plant.name}>{plant.name}</option>
                    ))}

                </select>
            </label>
            <label className="form-label">
                Review
                {errors.review && <p className="errors">{errors.review}</p>}
                <textarea
                    placeholder="Include helpful care-taking tips for other be-leafers"
                    value={review}
                    className="review-input"
                    onChange={(e) => {
                        let review = e.target.value.trim()
                        if (!review || review.length <= 10 || review.length > 255) {
                            setErrors(prev => {
                                let err = { ...prev }
                                err.review = "Not a valid review"
                                return err
                            })
                        } else {
                            setErrors(prev => {
                                let err = { ...prev }
                                delete err.review
                                return err
                            })
                        }
                        setReview(e.target.value)
                    }}
                >

                </textarea>
            </label>
            {errors.image && <p className="errors">{errors.image}</p>}
            <label className="form-label">
                <div className="file-button">
                    Upload Image
                    <i className="fa-light fa-cloud-arrow-up"></i>
                </div>
                <input
                    className='input-file'
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        let file = e.target.files[0]
                        let fileName = file.name
                        if (!validExtension(fileName)) {
                            setErrors(prev => {
                                let err = { ...prev }
                                err.image = "Choose a valid image file: pdf, png, jpg, jpeg, gif"
                                return err
                            })
                        } else {
                            setErrors(prev => {
                                let err = { ...prev }
                                delete err.image
                                return err
                            })
                        }
                        setImage(e.target.files[0])
                    }}
                ></input>
            </label>
            <button className="review-button" type="submit">Submit Review</button>

        </form>
    )
}
