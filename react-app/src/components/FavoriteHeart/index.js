import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { thunkAddFav, thunkDeleteFav } from "../../store/session";
import "./FavoriteHeart.css"

// Heart toggle used on the plant cards and the plant detail page.
// It is an inline SVG so it never depends on an icon font loading.
export default function FavoriteHeart({ plantId, className = "" }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const user = useSelector((state) => state.session.user)
    const [isSaving, setIsSaving] = useState(false)
    const isFav = Boolean(user && user.favorites && user.favorites[plantId])

    const handleClick = async (e) => {
        // the heart sits inside a link to the plant, don't follow it
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            return history.push('/login', { from: location.pathname })
        }
        if (isSaving) return

        setIsSaving(true)
        await dispatch(isFav ? thunkDeleteFav(plantId) : thunkAddFav(plantId))
        setIsSaving(false)
    }

    return (
        <button
            type="button"
            className={`fav-heart ${isFav ? "fav-heart-on" : ""} ${className}`}
            onClick={handleClick}
            aria-pressed={isFav}
            aria-label={isFav ? "Remove from favorites" : user ? "Add to favorites" : "Log in to save favorites"}
            title={isFav ? "Remove from favorites" : user ? "Add to favorites" : "Log in to save favorites"}
            disabled={isSaving}
        >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path d="M12 21s-6.7-4.35-9.33-8.2C.6 9.75 2.1 5.5 6.05 5.05 8.3 4.8 10.05 6 12 8.1c1.95-2.1 3.7-3.3 5.95-3.05 3.95.45 5.45 4.7 3.38 7.75C18.7 16.65 12 21 12 21z" />
            </svg>
        </button>
    )
}
