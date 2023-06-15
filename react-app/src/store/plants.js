const GET_PLANTS = 'plants/GET_PLANTS'
const GET_CURR_PLANT = 'plants/GET_CURR_PLANT'
const CREATE_PLANT = 'plants/CREATE_PLANTS'
const EDIT_PLANT = 'plants/EDIT_PLANTS'
const DELETE_PLANT = 'plants/DELETE_PLANTS'


const getPlants = (plants) => ({
    type: GET_PLANTS,
    payload: plants
})

const currentPlant = (plant) => ({
    type: GET_CURR_PLANT,
    payload: plant
})

const createPlant = (newPlant) => ({
    type: CREATE_PLANT,
    payload: newPlant
})

const editPlant = (plant) => ({
    type: EDIT_PLANT,
    payload: plant
})

const deletePlant = (id) => ({
    type: DELETE_PLANT,
    payload: id
})


export const fetchPlants = () => async (dispatch) => {
    console.log("we are getting the plants in the thunk!! ")
    const res = await fetch('/api/plants')

    const data = await res.json()
    if (res.ok) {
        console.log("the data was okay here it is: ==== ", data)
        dispatch(getPlants(data))
    }
    else {
        return data
    }
}

export const thunkGetSinglePlant = (id) => async (dispatch) => {
    const res = await fetch(`/api/plants/${id}`)

    const data = await response.json()
    if (res.ok) {
        dispatch(currentPlant(data))
        return data
    } else {
        return data
    }
}

export const thunkCreatePlant = (formData) => async (dispatch) => {
    const res = await fetch('/api/plants/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(createPlant(data))
        return data
    } else {
        return { error: data.name[0] }
    }
}

export const thunkEditPlant = (formData, id) => async (dispatch) => {
    const res = await fetch(`/api/plants/${id}`, {
        method: "PUT",
        body: formData
    })

    const data = await res.json();
    if (res.ok) {
        dispatch(editPlant(id))
    } else {
        return data
    }

}

export const thunkDeletePlant = (id) => async (dispatch) => {
    const res = await fetch(`/api/plants/${id}`, {
        method: "DELETE"
    })
}


const initialState = {
    all_plants: {},
    current_plant: {}
}


export default function reducer(state = initialState, action) {
    console.log("my current state: ======================= ", state)
    console.log("the action coming in ", action)
    const newState = { ...state, all_plants: { ...state.all_plants }, current_plant: { ...state.current_plant } }
    switch (action.type) {
        case GET_PLANTS:
            newState.all_plants = { ...action.payload.all_plants }
            return newState
        case GET_CURR_PLANT:
            newState.current_plant = { ...action.payload }
            return newState
        default:
            return state;

    }

}
