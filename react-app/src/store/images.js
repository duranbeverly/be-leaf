const GET_IMAGES = 'images/GET_IMAGES'


const getImages = (images) => ({
    type: GET_IMAGES,
    payload: images
})


export const fetchImages = () => async (dispatch) => {
    const res = await fetch('/api/plant-images')

    const data = await res.json()
    if (res.ok) {
        dispatch(getImages(data))
        return data
    } else {
        return data
    }
}

const initialState = {
    all_images: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_IMAGES: {
            return { ...state, all_images: { ...action.payload.all_images } }
        }
        default:
            return state;
    }
}
