import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './PlantDetail.css'
import { thunkGetSinglePlant } from '../../store/plants';

export default function PlantDetail() {
    let { plantId } = useParams()
    console.log(plantId)
    console.log(typeof (plantId))
    // plantId = parseInt(plantId)
    // console.log(typeof (plantId))
    let dispatch = useDispatch()
    let allPlants = useSelector((state) => state.plant?.all_plants)
    let [cart, setCart] = useState(0)
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        console.log("going to get the plant by id, in frontend")
        dispatch(thunkGetSinglePlant(plantId)).then(() => setIsLoading(false))
    }, [dispatch, plantId])
    // we need to get the plant details from the state lets try that
    let plant = useSelector(state => state.plants?.all_plants[plantId])
    console.log("plant in the plant detail page", plant)


    if (isLoading) return <div className='plant-detail-wrapper'></div>
    return (
        // <>
        //     <h1>CAN YOU SEE ME</h1>
        // </>
        <div className='plant-detail-wrapper'>
            <div className='plant-detail-top'>
                <p className='plant-detail-header'>Plants</p>
                <span className='plant-detail-heading-division'>/</span>
                <p className='plant-detail-name'>{plant?.name}</p>
            </div>
            <div className='plant-detail-bottom'>
                <div className='plant-detail-pic-div'>
                    <div className='plant-detail-side-pics'>
                        {/* map through all the pics  */}
                        {plant?.images.map((image) => {
                            return <img className="plant-detail-side-image" src={image?.image}></img>
                        })}
                    </div>
                    <div className='plant-detail-main-pic'>
                        <img src={plant?.preview_image} ></img>
                    </div>
                </div>
                <div className='plant-detail-info'>
                    <div className='plant-detail-subheader'>
                        <h3>{plant?.name}</h3>
                        <p>{`$${plant?.price}`}</p>
                    </div>
                    <p className='plant-detail-description'>{plant?.description}</p>
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
                        <input type="number" value="1" min="1" max={plant?.quantity} step="1" onChange={(e) => setCart(e.target.value)} />
                        <button>ADD TO CART</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
