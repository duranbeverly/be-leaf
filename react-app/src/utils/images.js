// Shown when a plant photo can't load (for example a broken image URL on a new listing)
export const FALLBACK_PLANT_IMAGE = "https://be-leaf.s3.amazonaws.com/plant6.jpg"

export const showFallbackImage = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = FALLBACK_PLANT_IMAGE
}
