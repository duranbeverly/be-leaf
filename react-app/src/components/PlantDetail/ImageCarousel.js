import React from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import "./PlantDetail.css"
import { showFallbackImage, FALLBACK_PLANT_IMAGE } from "../../utils/images";

const ImageCarousel = React.memo(({ plant_id, preview_image, name }) => {
    let { plantId } = useParams()

    let images = useSelector(state => state.images.all_images)
    images = Object.values(images).filter((image) => image.plant_id === +plantId)

    return (
        <div className="image-carousel">
            <Carousel>
                <img alt={name || "plant"} src={preview_image} onError={showFallbackImage}></img>
                {images && images.map((image) => {
                    return (
                        <img key={image.id} alt={name || "plant"} src={image.image || FALLBACK_PLANT_IMAGE} onError={showFallbackImage}></img>
                    )
                })}
            </Carousel>
        </div>
    )
});

export default ImageCarousel;
