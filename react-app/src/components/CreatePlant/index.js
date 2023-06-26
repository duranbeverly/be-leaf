import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreatePlant } from "../../store/plants";
import "./CreatePlant.css"



export default function CreatePlant() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [isGiant, setIsGiant] = useState(false)
    const [isPetSafe, setIsPetSafe] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("Upload Image")
    const [invisible, setInvisible] = useState("invisible")
    const [isLoading, setIsLoading] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) {
        history.push("/")
    }

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

        if (!name) {
            newErrors.name = "Please choose a name"
        }

        if (!price) {
            newErrors.price = "Please choose a price"
        }

        if (!description) {
            newErrors.description = "Please create a description"
        }

        if (!quantity) {
            newErrors.quantity = "Please choose a quantity"
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

        dispatch(thunkCreatePlant(formData)).then((data) => {
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
            <div className="form-wrapper">
                <h1 className="review-title">Loading Changes...</h1>
            </div>
        )
    }

    return (
        <div className="form-wrapper">
            <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1 className="form-title">Create a Plant Listing</h1>
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
                    // required
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
                            if (!price || price <= 0 || price > 100 || isNaN(Number(price))) {
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
                    // required
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
                    // required
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
                            if (!description || description.length <= 10 || description.length > 255) {
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
                    // required
                    />
                </label>
                <div className="form-radio-buttons">
                    <label className="form-label" >
                        Is it a giant plant?
                        <input

                            id="no-green"
                            type="checkbox"
                            checked={isGiant}
                            onChange={(e) => setIsGiant(e.target.checked)}
                        />
                    </label>

                    <label className="form-label" >
                        Is it pet safe?
                        <input
                            id="no-green"
                            type="checkbox"
                            checked={isPetSafe}
                            onChange={(e) => setIsPetSafe(e.target.checked)}
                        />
                    </label>

                </div>
                {errors.image && <p className="errors">{errors.image}</p>}
                <label className="form-label">
                    <div className="file-button">
                        <div className="file-check">
                            {fileName}
                            <span><i id={invisible} className="fa-solid fa-circle-check"></i></span>

                        </div>
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
                                    setInvisible("invisible")
                                    setFileName("Upload Image")
                                    return err
                                })
                            } else {
                                setErrors(prev => {
                                    let err = { ...prev }
                                    delete err.image
                                    return err
                                })
                            }
                            setFileName(file.name)
                            setInvisible("visible")
                            setPreviewImage(file)
                        }}
                    // required
                    />
                </label>
                <button className="form-button" type="submit">Create</button>
            </form>
        </div >
    )
}
