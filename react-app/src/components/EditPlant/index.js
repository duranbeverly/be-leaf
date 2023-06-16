import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import { thunkEditPlant } from "../../store/plants";
import { NavLink } from "react-router-dom";


export default function EditPlant() {
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
    const [isLoading, setIsLoading] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) {
        history.push("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (name.length > 50 || name.length === 0) {
            newErrors.name = "Enter a name, it must not be longer than 50 characters";
        }

        if (!price || price < 0 || isNaN(Number(price))) {
            newErrors.price = "Price must be a valid number";
        }

        if (!quantity || isNaN(Number(quantity))) {
            newErrors.quantity = "Quantity must be a valid number";
        }

        if (!description || description.length > 255) {
            newErrors.description = "Enter a description, not longer than 255 characters";
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

        console.log("we begin ☮")
        dispatch(thunkEditPlant(formData)).then((data) => {
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
                <h1>Loading Changes...</h1>
            </div>
        )
    }

    return (
        <div className="form-wrapper">
            <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1 className="form-title">Create a Plant Listing</h1>
                <label className="form-label">
                    Name
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>

                <label className="form-label">
                    Price
                    <input
                        className="form-input"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </label>
                <label className="form-label">
                    Quantity
                    <input
                        className="form-input"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    Description
                    <textarea
                        className="form-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <div className="form-radio-buttons">
                    <label className="form-label">
                        Is it a giant plant?
                        <input
                            className="form-input"
                            type="checkbox"
                            checked={isGiant}
                            onChange={(e) => setIsGiant(e.target.checked)}
                        />
                    </label>

                    <label className="form-label">
                        Is it pet safe?
                        <input
                            className="form-input"
                            type="checkbox"
                            checked={isPetSafe}
                            onChange={(e) => setIsPetSafe(e.target.checked)}
                        />
                    </label>

                </div>
                <label className="form-label">
                    Preview Image
                    <input
                        className="form-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPreviewImage(e.target.files[0])}
                    />
                </label>
                <button className="form-button" type="submit">Create</button>
            </form>
        </div >
    )
}
