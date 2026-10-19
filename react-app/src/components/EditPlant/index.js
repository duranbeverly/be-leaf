import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { thunkEditPlant, thunkGetSinglePlant, fetchUploadsEnabled, formatServerErrors } from "../../store/plants";
import { useParams } from "react-router-dom";
import "../CreatePlant/CreatePlant.css"
import { ClockLoader } from "react-spinners"

export default function EditPlant() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { plantId } = useParams()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [isGiant, setIsGiant] = useState(false)
    const [isPetSafe, setIsPetSafe] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState({});
    const [imageUrl, setImageUrl] = useState("")
    const [uploadsEnabled, setUploadsEnabled] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        fetchUploadsEnabled().then(setUploadsEnabled)
    }, [])

    useEffect(() => {
        dispatch(thunkGetSinglePlant(plantId)).then((data) => {
            if (!data.current_plant || data.current_plant.user_id !== sessionUser?.id) {
                setNotFound(true)
                return
            }
            setName(data.current_plant.name);
            setPrice(data.current_plant.price);
            setQuantity(data.current_plant.quantity);
            setDescription(data.current_plant.description);
            setIsGiant(data.current_plant.is_giant);
            setIsPetSafe(data.current_plant.is_pet_friendly);
            setImageUrl(data.current_plant.preview_image)
        }).catch(() => setNotFound(true)).then(() => setIsLoading(false))
    }, [dispatch, plantId, sessionUser?.id])

    const validExtension = (fileName) => {
        const ALLOWED_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "gif"];
        const fileExtension = fileName.split(".").pop().toLowerCase();
        return ALLOWED_EXTENSIONS.includes(fileExtension);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        const { form, ...fieldErrors } = errors
        if (Object.keys(fieldErrors).length > 0) {
            return
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const formData = new FormData();
        if (previewImage && uploadsEnabled) {
            formData.append("preview_image", previewImage)
        }
        formData.append("image_url", imageUrl.trim())
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("quantity", quantity)
        formData.append("is_giant", isGiant)
        formData.append("is_pet_friendly", isPetSafe)

        setIsLoading(true)


        dispatch(thunkEditPlant(formData, plantId)).then((data) => {
            if (!data.current_plant) {
                setErrors(formatServerErrors(data.errors));
                setIsLoading(false);
            } else {
                history.push(`/plants/${data.current_plant.id}`)
            }
        })

    }


    if (!sessionUser) {
        return <Redirect to="/login" />
    }

    if (notFound) {
        return <Redirect to="/user-plants" />
    }

    if (isLoading) {
        return (
            <div className="form-wrapper" style={{ opacity: 0.5 }}>
                <div className="center-loading">
                    <ClockLoader color="#224229" size={30} />
                </div>
            </div>
        )
    }



    return (
        <div className="form-wrapper">
            <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1 className="form-title">Edit Plant Listing</h1>
                {errors.form && <p className="errors">{errors.form}</p>}
                <label className="form-label">
                    Name
                    {errors.name && <p className="errors">{errors.name}</p>}
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            let inputValue = e.target.value.trim()
                            if (inputValue.length > 50 || inputValue.length === 0) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    err.name = "Name must be 1 to 50 characters"
                                    return err
                                })
                            } else {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    delete err.name
                                    return err
                                })
                            }
                            setName(e.target.value)
                        }}
                    ></input>
                </label>
                <label className="form-label">
                    Price
                    {errors.price && <p className="errors">{errors.price}</p>}
                    <input
                        className="form-input"
                        type="text"
                        value={price}
                        onChange={(e) => {
                            let price = e.target.value.trim()
                            if (!price || price < 0 || price > 100 || isNaN(Number(price))) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    if (price > 100) {
                                        err.price = "That price is way too high you need to cut it 💢"
                                        return err
                                    } else {
                                        err.price = "Enter a price between $0.01 and $100"
                                        return err
                                    }
                                })
                            } else {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    delete err.price
                                    return err
                                })
                            }
                            setPrice(e.target.value)
                        }}
                    ></input>
                </label>
                <label className="form-label">
                    Quantity
                    {errors.quantity && <p className="errors">{errors.quantity}</p>}
                    <input
                        className="form-input"
                        type="text"
                        value={quantity}
                        onChange={(e) => {
                            let quantity = e.target.value.trim()
                            if (!quantity || !Number.isInteger(Number(quantity)) || quantity < 1 || quantity > 100) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    err.quantity = "Enter a whole number from 1 to 100"
                                    return err
                                })
                            } else {
                                setErrors((prev) => {
                                    let err = { ...prev }
                                    delete err.quantity
                                    return err
                                })
                            }
                            setQuantity(e.target.value)
                        }}
                    />
                </label>
                <label className="form-label">
                    Description
                    {errors.description && <p className="errors">{errors.description}</p>}
                    <textarea
                        className="form-input"
                        value={description}
                        onChange={(e) => {
                            let description = e.target.value.trim()
                            if (!description || description.length <= 0 || description.length > 255) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    err.description = "Description must be 1 to 255 characters"
                                    return err
                                })
                            } else {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    delete err.description
                                    return err
                                })
                            }
                            setDescription(e.target.value)
                        }}
                    />
                </label>
                <div className="form-radio-buttons">
                    <label className="form-label">
                        Is it a giant plant?
                        <input
                            id="no-green"
                            type="checkbox"
                            value={isGiant}
                            checked={isGiant}
                            onChange={(e) => setIsGiant(e.target.checked)}
                        />
                    </label>

                    <label className="form-label">
                        Is it pet safe?
                        <input
                            id="no-green"
                            type="checkbox"
                            value={isPetSafe}
                            checked={isPetSafe}
                            onChange={(e) => setIsPetSafe(e.target.checked)}
                        />
                    </label>

                </div>
                {errors.image && <p className="errors">{errors.image}</p>}
                {uploadsEnabled &&
                <label className="form-label">
                    <div className="file-button">
                        Upload Image
                        <i className="fa-solid fa-cloud-arrow-up"></i>

                    </div>
                    <input
                        className="input-file"
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
                            setPreviewImage(e.target.files[0])
                        }}
                    />
                </label>
                }
                {uploadsEnabled === false &&
                    <p className="form-note">Photo uploads are turned off in this demo. Paste a new image URL to change the photo.</p>
                }
                <label className="form-label">
                    {uploadsEnabled ? "Or paste an image URL" : "Image URL"}
                    <input
                        className="form-input"
                        type="url"
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={(e) => {
                            let url = e.target.value.trim()
                            if (url && !/^https?:\/\/\S+$/.test(url)) {
                                setErrors(prev => ({ ...prev, image: "Enter a full image URL starting with http:// or https://" }))
                            } else {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    delete err.image
                                    return err
                                })
                            }
                            setImageUrl(e.target.value)
                        }}
                    />
                </label>
                <button className="form-button" type="submit">Save Changes</button>
            </form>
        </div >
    )
}
