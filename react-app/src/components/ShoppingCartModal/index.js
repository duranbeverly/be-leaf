import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import "./ShoppingCartModal.css"


export default function ShoppingCartModal({ cart }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(0)
    const [plant, setPlant] = useState()
    //    the price doesn't change really we just pull it from the cart/plant data
    const [price, setPrice] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const { closeModal } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    return (
        <div className="modal">
            <div className="top-wrapper">
                <h1>Your Cart</h1>
                <div className="products-div">
                    {/* in here you will have to map through all the items in the cart  */}
                </div>

            </div>
            <div className="bottom-wrapper">
                <div className="subtotal-div">
                    <p>Subtotal:</p>
                    {/* here you must add price plus quantity for al cart items */}
                    <p>$100</p>
                    <button>CHECKOUT</button>
                </div>
            </div>
        </div>
    )

}
