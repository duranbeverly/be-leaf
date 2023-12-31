import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkEditPlant, thunkGetSinglePlant } from "../../store/plants";
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
    const [isLoading, setIsLoading] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) {
        history.push("/")
    }



    useEffect(() => {
        dispatch(thunkGetSinglePlant(plantId)).then((data) => {
            setName(data.current_plant.name);
            setPrice(data.current_plant.price);
            setQuantity(data.current_plant.quantity);
            setDescription(data.current_plant.description);
            setIsGiant(data.current_plant.is_giant);
            setIsPetSafe(data.current_plant.is_pet_friendly);
            setPreviewImage(data.current_plant.preview_image)
        }).then(() => setIsLoading(false))
    }, [dispatch, plantId])

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


        if (!previewImage) {
            newErrors.image = "Please choose an image";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const formData = new FormData();
        formData.append("preview_image", previewImage)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("quantity", quantity)
        formData.append("is_giant", isGiant)
        formData.append("is_pet_friendly", isPetSafe)

        setIsLoading(true)


        dispatch(thunkEditPlant(formData, plantId)).then((data) => {
            if (data.error) {
                setErrors(data.error);
                setIsLoading(false);
            } else {
                history.push(`/plants/${data.current_plant.id}`)
            }
        })

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
                <h1 className="form-title">Create a Plant Listing</h1>
                <label className="form-label">
                    Name **
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
                                    err.name = "Not a valid name"
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
                    Price **
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
                                        err.price = "Not a valid price"
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
                    Quantity **
                    {errors.quantity && <p className="errors">{errors.quantity}</p>}
                    <input
                        className="form-input"
                        type="text"
                        value={quantity}
                        onChange={(e) => {
                            let quantity = e.target.value.trim()
                            if (!quantity || quantity < 0 || quantity > 100 || isNaN(Number(quantity))) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    err.quantity = "Not a valid quantity"
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
                    Description **
                    {errors.description && <p className="errors">{errors.description}</p>}
                    <textarea
                        className="form-input"
                        value={description}
                        onChange={(e) => {
                            let description = e.target.value.trim()
                            if (!description || description.length <= 0 || description.length > 255) {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    err.description = "Not a valid description"
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
                <label className="form-label">
                    <div className="file-button">
                        Upload Image **
                        <i className="fa-light fa-cloud-arrow-up"></i>

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
                <button className="form-button" type="submit">Edit</button>
            </form>
        </div >
    )
}
