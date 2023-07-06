import React from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import "./PlantDetail.css"

const ImageCarousel = React.memo(({ plant_id, preview_image }) => {
    let { plantId } = useParams()

    let images = useSelector(state => state.images.all_images)
    images = Object.values(images).filter((image) => image.plant_id === +plantId)

    return (
        <div className="image-carousel">
            <Carousel>
                <img alt={plant_id} src={preview_image}></img>
                {images && images.map((image) => {
                    return (
                        <img key={image.id} alt={image.id} src={image.image || "https://be-leaf.s3.amazonaws.com/plant6.jpg"}></img>
                    )
                })}
            </Carousel>
        </div>
    )
});

export default ImageCarousel;
