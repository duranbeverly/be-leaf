import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkEditSubtractCart, thunkEditAddCart, thunkDeleteCartItem } from "../../store/cart"
import "./ShoppingCartModal.css"


export default function ShoppingCartModal({ plants }) {
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
    let [counter, setCounter] = useState(1)
    const cart = useSelector((state) => state.cart.all_items);


    // when you click on the fa-minus icon below you should be brought to this function which should subtract 1 to the previous cart quantity and then make a dispatch to update the amount in the database
    const handleMinus = (itemId) => {
        console.log("the journey to minus starts 🥙", itemId)
        const { plant_id, user_id, quantity } = cart[itemId]
        const currentItem = {
            plant_id,
            user_id,
            quantity
        }
        if (currentItem.quantity > 1) {
            console.log("currentItem before", currentItem)
            currentItem.quantity -= 1
            console.log("currentItem after minus 🎶", currentItem)
            dispatch(thunkEditSubtractCart(currentItem));
        }
    }
    // when you click on the fa-minus icon below you should be brought to this function which should add 1 to the previous cart quantity and then make a dispatch to update the amount in the database
    const handlePlus = (itemId, plantId) => {
        console.log("the journey to add starts 🐱‍💻", itemId)
        const { plant_id, user_id, quantity } = cart[itemId]
        const currentItem = {
            plant_id,
            user_id,
            quantity
        }
        // check that the amount you want to add to the cart does not exceed the available amount of that plant
        let plantAvailable = plants[plantId].quantity
        if (currentItem.quantity < plantAvailable) {
            console.log("currentItem", currentItem.quantity)
            currentItem.quantity += 1
            console.log("currentItem after adding 💞", currentItem.quantity)
            dispatch(thunkEditAddCart(currentItem));
        }
    }

    // this useEffect should give us the updated total in the cart
    useEffect(() => {
        let totalPrice = 0;
        if (cart) {
            Object.values(cart).forEach(item => {
                totalPrice += item.price;
            });
        }
        setTotalPrice(totalPrice);
    }, [cart]);

    // this useEffect makes it so I can change the styling only for this modal
    useEffect(() => {
        // make it so only for the cart modal appears on right
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.add("modal-right");
        }
    }, []);

    if (isLoading) return <div className='modal-right'></div>

    return (
        <div className="modal-right">
            {cart && Object.values(cart).length == 0 ? (
                <div className="modal">
                    <div className="top-wrapper">
                        <h1 className="cart-title">Your Cart</h1>
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
                        <h1 className="cart-title">Your Cart</h1>
                        <div className="products-div">
                            <div>

                            </div>
                            {Object.values(cart).map(item => {
                                return (
                                    <div key={item.id} className="item-div">
                                        <div className="item-left-div">
                                            <img className="cart-img" src={item.plant_image}></img>
                                        </div>
                                        <div className="item-right-div">
                                            <div className="cart-item-header">
                                                <p className="cart-item-name">{item.plant_name}</p>
                                                <p className="cart-item-name">{`$${item.price}`}</p>
                                            </div>
                                            <div className="cart-item-change">
                                                <div className="input-cart-small">
                                                    <i id="cart-icon" className="fa-solid fa-minus" onClick={() => handleMinus(item.id)}></i>
                                                    <div className='num'>
                                                        {item.quantity}
                                                    </div>
                                                    <i id="cart-icon" className="fa-solid fa-plus" onClick={() => handlePlus(item.id, item.plant_id)}></i>
                                                </div>
                                                <p className="cart-remove" onClick={(e) => dispatch(thunkDeleteCartItem(item.id))}>REMOVE</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="bottom-wrapper">
                        <div className="subtotal-div">
                            <div className="price-div">
                                <p className="cart-item-name">Subtotal:</p>
                                {/* here you must add price plus quantity for al cart items */}
                                <p className="cart-item-name">{totalPrice}</p>
                            </div>
                            <button className="cart-button-checkout">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            )

            }


        </div>
    )

}
