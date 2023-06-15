import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './PlantDetail.css'
import { thunkGetSinglePlant, fetchPlants } from '../../store/plants';

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
    let [plant2, setPlant2] = useState({})
    let [counter, setCounter] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        console.log("going to get the plant by id, in frontend")
        dispatch(fetchPlants()).then(() => dispatch(thunkGetSinglePlant(plantId)).then(() => setIsLoading(false)))

    }, [dispatch, plantId])
    // we need to get the plant details from the state lets try that
    let plant = useSelector(state => state.plants?.all_plants[plantId])
    console.log("plant in the plant detail page", plant)

    const handleMinus = () => {
        if (counter > 0) {
            setCounter((prev) => prev - 1)
        }
    }

    const handlePlus = () => {
        setCounter((prev) => prev + 1)
    }

    if (isLoading) return <div className='plant-detail-wrapper'></div>
    return (

        <div className='wrapper'>
            <div className='plant-detail-top'>
                <p className='plant-detail-header'>Plants</p>
                <span className='plant-detail-heading-division'>/</span>
                <p className='plant-detail-name'>{plant?.name}</p>
            </div>

            <div className='plant-detail-wrapper'>
                <div className='plant-detail-bottom'>
                    <div className='plant-detail-pic-div'>
                        <div className='plant-detail-main-pic'>
                            <img className='pic' src={plant?.preview_image} ></img>
                        </div>
                    </div>
                    <div className='plant-detail-info'>
                        <div className='plant-detail-subheader'>
                            <h3 className='side-title'>{plant?.name}</h3>
                            <p className='price'>{`$${plant?.price}`}</p>
                        </div>
                        <p className='plant-detail-description'>{plant?.description}</p>
                        <div className='make-colors-small'>
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

                        </div>
                        <div className='plant-detail-buttons'>
                            <div className="input-cart" onChange={(e) => setCart(e.target.value)}>
                                <i class="fa-solid fa-minus" onClick={handleMinus}></i>
                                <div className='num'>
                                    {counter}
                                </div>
                                <i className="fa-solid fa-plus" onClick={handlePlus}></i>
                            </div>
                            <button className='cart-button'>ADD TO CART</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
