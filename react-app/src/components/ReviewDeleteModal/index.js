import React from "react";
import { useDispatch, } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import "./ReviewDelete.css"

export default function ReviewDeleteModal({ reviewId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(thunkDeleteReview(reviewId))
        closeModal()
    }

    return (
        <div className="confirm-delete-div">
            <p className="del-title">Confirm you would like to delete:</p>
            <div className="button-div">
                <button className="not-confirm" onClick={(e) => closeModal()}>Do not delete</button>
                <button className="confirm" onClick={handleSubmit}>Delete</button>
            </div>
        </div>
    )
}
