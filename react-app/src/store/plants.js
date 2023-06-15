const GET_PLANTS = 'plants/GET_PLANTS'
const GET_CURR_PLANT = 'plants/GET_CURR_PLANT'
const CREATE_PLANT = 'plants/CREATE_PLANT'
const EDIT_PLANT = 'plants/EDIT_PLANT'
const DELETE_PLANT = 'plants/DELETE_PLANT'


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
    const res = await fetch('/api/plants')

    const data = await res.json()
    if (res.ok) {
        dispatch(getPlants(data))
    }
    else {
        return data
    }
}

export const thunkGetSinglePlant = (plantId) => async (dispatch) => {
    console.log("im in the thunk to get a single plant! ")
    const res = await fetch(`/api/plants/${plantId}`)

    const data = await res.json()
    if (res.ok) {
        console.log("this is what we get back from the backend :) ========== ", data)
        dispatch(currentPlant(data))
        return data
    } else {
        return data
    }
}

export const thunkCreatePlant = (formData) => async (dispatch) => {
    console.log("create a new plant thunk ==== ", formData)
    const res = await fetch("/api/plants/new", {
        method: "POST",
        body: formData
    })

    const data = await res.json();

    if (res.ok) {
        console.log("what we get after creating a plant: ", data)
        dispatch(createPlant(data))
        return data
    } else {
        return data
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
    // const newState = { ...state, all_plants: { ...state.all_plants }, current_plant: { ...state.current_plant } }
    switch (action.type) {
        case GET_PLANTS:
            let newState = { ...state }
            newState.all_plants = { ...action.payload.all_plants }
            // newState.all_plants = { ...action.payload.all_plants }
            // let newImages = []
            // let images = action.payload.all_plants.images
            // for (let image in images) {
            //     newImages.push(image["id"] = image)
            // }
            // newState.all_plants.images = newImages
            console.log("this is the new state: ", newState)
            return newState
        case GET_CURR_PLANT:
            let newState2 = { ...state }
            newState2.current_plant = { ...newState2.current_plant, ...action.payload.current_plant }
            // let newImage = []
            // let images2 = action.payload.current_plant.images
            // for (let image in images2) {
            //     newImage.push(image["id"] = image)
            // }
            // newState.current_plants.images = newImage
            return newState2
        case CREATE_PLANT:
            let newState3 = { ...state }
            newState3.all_plants[action.payload.id] = { ...action.payload.current_plant }
            console.log("this is the new state: ", newState3)
            return newState3
        default:
            return state;

    }

}
