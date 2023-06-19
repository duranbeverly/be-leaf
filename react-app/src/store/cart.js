const GET_CART_ITEMS = 'cart/GET_CART_ITEMS'
const CREATE_CART_ITEM = 'cart/ADD_CART_CREATE'
const EDIT_ITEM_QUANTITY = 'cart/ADD_CART_ITEM_QUANTITY'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'

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

export const fetchCartItems = () => async (dispatch) => {
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
    const res = await fetch('/api/cart', {
        method: "POST",
        body: cartItem
    })

    const data = res.json()

    if (res.ok) {
        dispatch(createCartItem(data))
        return data
    } else {
        return data
    }
}


export const thunkEditAddCart = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: "PUT",
        body: cartItem
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
        body: cartItem
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
    switch (action.type) {
        case GET_CART_ITEMS: {
            const allItems = { ...action.payload.all_items }
            return {
                ...state,
                all_items: allItems
            }
        }
        case CREATE_CART_ITEM: {
            const newState = {
                ...state,
                all_items: {
                    ...state.all_items,
                    [action.payload.current_item.id]: {
                        ...action.payload.current_item
                    }
                }
            }
        } case EDIT_ITEM_QUANTITY: {
            const newState = {
                ...state,
                all_items: {
                    ...state.all_items,
                    [action.payload.current_item]: {
                        ...action.payload.current_item
                    }
                },
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
        }
        default:
            return state;
    }
}
