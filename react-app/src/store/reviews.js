const GET_REVIEWS = 'reviews/GET_REVIEWS'
const GET_CURR_REVIEW = 'reviews/GET_CURR_REVIEW'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})

const currentReview = (review) => ({
    type: GET_CURR_REVIEW,
    payload: review
})

const createReview = (newReview) => ({
    type: CREATE_REVIEW,
    payload: newReview
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    payload: review
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})


export const fetchReviews = () => async (dispatch) => {
    const res = await fetch('/api/reviews')

    const data = await res.json()
    if (res.ok) {
        dispatch(getReviews(data))
        return data
    } else {
        return data
    }
}

export const thunkGetSingleReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`)

    const data = await res.json()
    if (res.ok) {
        dispatch(currentReview(data))
        return data
    } else {
        return data
    }
}

// remember to check that the api routes match to these fetch requests

export const thunkCreateReview = (formData) => async (dispatch) => {
    const res = await fetch('/api/reviews/new', {
        method: "POST",
        body: formData
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(createReview(data))
        return data
    } else {
        return data
    }
}


export const thunkEditReview = (formData, id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        body: formData
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(editReview(data))
        return data
    } else {
        return data
    }
}

export const thunkDeleteReview = (id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(deleteReview(id))
        return { message: 'Successfully deleted' }
    } else {
        return data
    }
}

const initialState = {
    all_reviews: {},
    current_review: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            const allReviews = { ...action.payload.all_reviews }

            return {
                ...state,
                all_reviews: allReviews
            }
        }
        case GET_CURR_REVIEW: {
            const currentReview = { ...action.payload.current_review }
            return {
                ...state,
                current_review: currentReview
            }

        }
        case CREATE_REVIEW: {
            const newState = {
                ...state,
                all_reviews: {
                    ...state.all_reviews,
                    [action.payload.current_review.id]: {
                        ...action.payload.current_review
                    }
                }
            }
            return newState
        }
        case EDIT_REVIEW: {
            const newState = {
                ...state,
                all_reviews: {
                    ...state.all_reviews,
                    [action.payload.current_review.id]: {
                        ...action.payload.current_review
                    }
                },
                current_review: { ...action.payload.current_review }
            }
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = {
                ...state,
                all_reviews: { ...state.all_reviews },
                current_review: { ...state.current_review }
            }
            delete newState.all_reviews[action.id]
            delete newState.current_review[action.id]
            return newState
        }
        default:
            return state;
    }
}
