const GET_PLANTS = 'plants/GET_PLANTS'
const CREATE_PLANT = 'plants/CREATE_PLANTS'
const EDIT_PLANT = 'plants/EDIT_PLANTS'
const DELETE_PLANT = 'plants/DELETE_PLANTS'


const getPlants = (plants) => ({
    type: GET_PLANTS,
    plants
})


const createPlant = (newPlant) => ({
    type: CREATE_PLANT,
    newPlant
})

const editPlant = (plant) => ({
    type: EDIT_PLANT,
    plant
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
    }
    else {
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
    if(res.ok) {
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
    switch (action.type) {
        case GET_PLANTS:
            const newState = { ...state, all_plants: { ...state.all_plants }, current_plant: { ...state.current_plant } }
            for (let key in newState) {
                newState[key]["images"] = [...newState[key]["images"]]
            }
            return newState
        default:
            return state;

    }

}
