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
    id
})


export const fetchPlants = () => async (dispatch) => {
    const res = await fetch('/api/plants')

    const data = await res.json()
    if (res.ok) {
        dispatch(getPlants(data))
        return data
    }
    else {
        return data
    }
}

export const thunkGetSinglePlant = (plantId) => async (dispatch) => {

    const res = await fetch(`/api/plants/${plantId}`)

    const data = await res.json()
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
        body: formData
    })

    const data = await res.json();

    if (res.ok) {

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
        dispatch(editPlant(data))
        return data
    } else {
        return data
    }

}

export const thunkDeletePlant = (id) => async (dispatch) => {
    const res = await fetch(`/api/plants/${id}`, {
        method: "DELETE"
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(deletePlant(id))
        return { message: 'Successfully deleted' }
    } else {
        return data
    }
}


const initialState = {
    all_plants: {},
    current_plant: {}
}


export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_PLANTS: {
            const allPlants = { ...action.payload.all_plants };
            return {
                ...state,
                all_plants: allPlants
            };
        }
        case GET_CURR_PLANT: {
            const currentPlant = { ...action.payload.current_plant };
            return {
                ...state,
                current_plant: currentPlant
            };
        }
        case CREATE_PLANT: {
            const newState = {
                ...state,
                all_plants: {
                    ...state.all_plants,
                    [action.payload.current_plant.id]: {
                        ...action.payload.current_plant
                    }
                }
            };
         
            return newState;
        }
        case EDIT_PLANT: {
            const newState = {
                ...state,
                all_plants: {
                    ...state.all_plants,
                    [action.payload.current_plant.id]: {
                        ...action.payload.current_plant
                    }
                },
                current_plant: { ...action.payload.current_plant }
            }
            return newState;
        }
        case DELETE_PLANT: {
            const newState = {
                ...state,
                all_plants: { ...state.all_plants }, current_plant: { ...state.current_plant }
            }
            delete newState.all_plants[action.id]
            delete newState.current_plant[action.id]
            return newState
        }
        default:
            return state;
    }
}
