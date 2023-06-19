import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import "./ShoppingCartModal.css"


export default function ShoppingCartModal({ cart }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(0)
    const [plant, setPlant] = useState()
    //    the price doesn't change really we just pull it from the cart/plant data
    const [price, setPrice] = useState()
    const [totalPrice, setTotalPrice] = useState(0)
    const { closeModal } = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory()
    let [cart2, setCart] = useState(0)
    let [counter, setCounter] = useState(1)

    const handleMinus = () => {

    }

    const handlePlus = () => {

    }

    useEffect(() => {
        let totalPrice = 0;
        if (cart) {
            Object.values(cart).forEach(item => {
                totalPrice += item.price;
            });
        }
        setTotalPrice(totalPrice);
    }, [cart]);

    return (
        <>
            {cart && Object.values(cart).length == 0 ? (
                <div className="modal">
                    <div className="top-wrapper">
                        <h1>Your Cart</h1>
                        <div className="products-div">
                            Your Cart is Empty !
                            <img className="review-index-img" alt="Palm Plant" src="https://be-leaf.s3.amazonaws.com/plant3.jpg"></img>
                        </div>

                    </div>
                    <div className="bottom-wrapper">
                        <div className="subtotal-div">
                            <button className="cart-button" onClick={(e) => history.push('/plants')}>Continue Shopping</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="modal">
                    <div className="top-wrapper">
                        <h1>Your Cart</h1>
                        <div className="products-div">
                            <div>

                            </div>
                            {Object.values(cart).map(item => {
                                return (
                                    <div className="item-div">
                                        <div className="item-left-div">
                                            <img className="cart-img" src={item.plant_image}></img>
                                        </div>
                                        <div className="item-right-div">
                                            <div className="cart-item-header">
                                                <p>{item.plant_name}</p>
                                                <p>{`$${item.price}`}</p>
                                            </div>
                                            <div className="cart-item-change">
                                                <div className="input-cart" onChange={(e) => setCart(e.target.value)}>
                                                    <i className="fa-solid fa-minus" onClick={handleMinus}></i>
                                                    <div className='num'>
                                                        {counter}
                                                    </div>
                                                    <i className="fa-solid fa-plus" onClick={handlePlus}></i>
                                                </div>
                                                <p>REMOVE</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="bottom-wrapper">
                        <div className="subtotal-div">
                            <p>Subtotal:</p>
                            {/* here you must add price plus quantity for al cart items */}
                            <p>{totalPrice}</p>
                            <button className="cart-button">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            )

            }


        </>
    )

}
