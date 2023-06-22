import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./OrderConfirmed.css"


export default function OrderConfirmed() {
    let history = useHistory()
    const { closeModal } = useModal()


    useEffect(() => {
        // Remove the "modal-right" class from the modal when the component mounts
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.remove("modal-right");
        }

        // Clean up by adding the "modal-right" class back when the component unmounts
        return () => {
            if (modal) {
                modal.classList.add("modal-right");
            }
        };
    }, []);

    return (
        <div className="order-form">
            <h2 className="order-title">Order Confirmed</h2>
            <p className="order-logo">Keep nurturing your seeds and they will continue to grow.</p>
            <img src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1687389984/plant-grow-img_npqafm.png"></img>
            <p className="order-logo">We be-leaf in you!</p>
            <button className="review-button" onClick={() => {
                history.push('/plants')
                closeModal()
            }}>Continue Shopping</button>
        </div>
    )
}
