const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const CREATE_CART_ITEM = 'cart/ADD_CART_CREATE'
const EDIT_ITEM_QUANTITY = 'cart/EDIT_ITEM_QUANTITY'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'
const DELETE_CART = 'cart/DELETE_CART'

const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    payload: cartItems
})

const createCartItem = (cartItem) => ({
    type: CREATE_CART_ITEM,
    payload: cartItem
})

const editCartItem = (cartItem) => ({
    type: EDIT_ITEM_QUANTITY,
    payload: cartItem
})

const deleteCartItem = (id) => ({
    type: DELETE_CART_ITEM,
    id
})

const deleteCart = () => ({
    type: DELETE_CART
})

export const fetchCartItems = () => async (dispatch) => {
    console.log("we are in the thunk to grab cart items 🍎🍊")
    const res = await fetch('/api/cart')

    const data = await res.json()
    if (res.ok) {
        dispatch(getCartItems(data))
        return data
    } else {
        return data
    }
}

export const thunkCreateCartItem = (cartItem) => async (dispatch) => {
    console.log("we are in the thunk to create 🐱‍🚀 ", cartItem)
    const res = await fetch('/api/cart', {
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: {
            "Content-Type": "application/json" // Specify the content type as JSON
        }
    })

    const data = await res.json()
    console.log("what we get from the backend 🌯🕳", data)
    if (res.ok) {
        dispatch(createCartItem(data))
        return data
    } else {
        return data
    }
}


export const thunkEditAddCart = (cartItem) => async (dispatch) => {
    console.log("we are in the thunk to add 😃 ", cartItem)
    const res = await fetch('/api/cart', {
        method: "PUT",
        body: JSON.stringify(cartItem),
        headers: {
            "Content-Type": "application/json" // Specify the content type as JSON
        }
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(editCartItem(data))
        return data
    } else {
        return data
    }

}


export const thunkEditSubtractCart = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/cart/subtract', {
        method: "PUT",
        body: JSON.stringify(cartItem),
        headers: {
            "Content-Type": "application/json" // Specify the content type as JSON
        }
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(editCartItem(data))
        return data
    } else {
        return data
    }
}

export const thunkDeleteCartItem = (id) => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE"
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(deleteCartItem(id))
        return { message: "successfully deleted" }
    } else {
        return data
    }
}

export const thunkDeleteCart = () => async (dispatch) => {
    console.log("we are in the thunk to delete 🕳🌯")
    const res = await fetch(`/api/cart/checkout`, {
        method: "DELETE"
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(deleteCart())
        return { message: "successfully deleted" }
    } else {
        return data
    }

}

const initialState = {
    all_items: {},
    current_item: {}
}

export default function reducer(state = initialState, action) {
    console.log("in the reducer for cart 🥐 ", action.type, action.payload)
    switch (action.type) {
        case GET_CART_ITEMS: {
            const allItems = { ...action.payload.all_items }
            return {
                ...state,
                all_items: allItems
            }
        }
        case CREATE_CART_ITEM: {
            console.log("what is the payload? 🌹😎✔", action.payload.current_item)
            const newState = {
                ...state,
                all_items: {
                    ...state.all_items,
                    [action.payload.current_item.id]: {
                        ...action.payload.current_item
                    }
                }
            }
            return newState

        } case EDIT_ITEM_QUANTITY: {
            console.log("what is the payload? 🌹😎", action.payload.current_item)
            const newState = {
                ...state,
                all_items: { ...state.all_items, [action.payload.current_item.id]: { ...action.payload.current_item } },
                current_item: { ...action.payload.current_item }
            }
            return newState

        } case DELETE_CART_ITEM: {
            const newState = {
                ...state,
                all_items: { ...state.all_items },
                current_item: { ...state.current_item }
            }
            delete newState.all_items[action.id]
            delete newState.current_item[action.id]
            return newState
        } case DELETE_CART: {
            const newState = {
                ...state,
                all_items: {},
                current_item: {}
            }
            return newState
        }
        default:
            return state;
    }
}
