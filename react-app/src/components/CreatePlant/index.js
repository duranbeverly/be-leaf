import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { thunkCreatePlant, fetchUploadsEnabled, formatServerErrors } from "../../store/plants";
import "./CreatePlant.css"
import { ClockLoader } from "react-spinners"



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
    const [imageUrl, setImageUrl] = useState("")
    const [uploadsEnabled, setUploadsEnabled] = useState(null)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        fetchUploadsEnabled().then(setUploadsEnabled)
    }, [])

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

        dispatch(thunkCreatePlant(formData)).then((data) => {
            if (!data.current_plant) {
                setErrors(formatServerErrors(data.errors));
                setIsLoading(false);
            } else {
                history.push(`/plants/${data.current_plant.id}`)
            }
        })

    }

    if (!sessionUser) {
        return <Redirect to={{ pathname: "/login", state: { from: "/plants/new" } }} />
    }

    if (isLoading) {
        return (
            <div className="form-wrapper">
                <div style={{ opacity: 0.5 }}>
                    <div className="center-loading">
                        <ClockLoader color="#224229" size={30} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="form-wrapper">
            <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1 className="form-title">Create a Plant Listing</h1>
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
                                    err.description = "Description must be 11 to 255 characters"
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
                {uploadsEnabled &&
                <label className="form-label">
                    <div className="file-button">
                        <div className="file-check">
                            {fileName}
                            <span><i id={invisible} className="fa-solid fa-circle-check"></i></span>

                        </div>
                        <i className="fa-solid fa-cloud-arrow-up"></i>

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
                }
                {uploadsEnabled === false &&
                    <p className="form-note">Photo uploads are turned off in this demo. Paste an image URL, or leave it blank to use a default plant photo.</p>
                }
                <label className="form-label">
                    {uploadsEnabled ? "Or paste an image URL" : "Image URL (optional)"}
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
                <button className="form-button" type="submit">Create</button>
            </form>
        </div >
    )
}
