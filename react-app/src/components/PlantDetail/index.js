import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './PlantDetail.css'

export default function PlantDetail() {
    const plantId = useParams()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(getSinglePlant(plantId)).then(() => setIsLoading(false))
    }, [dispatch, plantId])

    const plant = useSelector(state => state.plants.all_plants[plantId])

    if (isLoading) return <div className='plant-detail-wrapper'></div>
    return (
        <div className='plant-detail-wrapper'>
            <div className='plant-detail-top'>
                <p className='plant-detail-header'>Plants</p>
                <span className='plant-detail-heading-division'>/</span>
                <p className='plant-detail-name'>{plant.name}</p>
            </div>
            <div className='plant-detail-bottom'>
                <div className='plant-detail-pic-div'>
                    <div className='plant-detail-side-pics'>
                        {/* map through all the pics  */}
                        {plant.images.map((image) => {
                            <img className="plant-detail-side-image" src={image.image}></img>
                        })}
                    </div>
                    <div className='plant-detail-main-pic'>
                        <img src={plant.preview_image} />
                    </div>
                </div>
                <div className='plant-detail-info'>
                    <div className='plant-detail-subheader'>
                        <h3>{plant.name}</h3>
                        <p>{`$${plant.price}`}</p>
                    </div>
                    <p className='plant-detail-description'>{plant.description}</p>
                    <div className='plant-detail-pot-colors'>
                        <div className='plant-detail-stone'>
                            <div className='stone'></div>
                            <p>STONE</p>
                        </div>
                        <div className='plant-detail-charcoal'>
                            <div className='charcoal'></div>
                            <p>CHARCOAL</p>
                        </div>
                        <div className='plant-detail-slate'>
                            <div className='slate'></div>
                            <p>SLATE</p>
                        </div>
                    </div>
                    <div className='plant-detail-buttons'>
                        <input type="number" value="1" min="1" max={plant.quantity} step="1" />
                        <button>ADD TO CART</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
