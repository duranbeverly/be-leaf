import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddFav, thunkDeleteFav } from "../../store/session";
import './PlantDetail.css'
import OpenModalButton from '../OpenModalButton';
import { thunkGetSinglePlant, fetchPlants } from '../../store/plants';
import ShoppingCartModal from '../ShoppingCartModal';
import { fetchCartItems, thunkCreateCartItem } from '../../store/cart';
import { NavLink, useHistory } from 'react-router-dom';

export default function PlantDetail() {
    let { plantId } = useParams()

    let dispatch = useDispatch()
    let allPlants = useSelector((state) => state.plants?.all_plants)
    let [cart, setCart] = useState(0)
    let [isLoading, setIsLoading] = useState(true)
    let [plant2, setPlant2] = useState({})
    let [counter, setCounter] = useState(1)
    let user = useSelector((state) => state.session.user)
    let cartInfo = useSelector((state) => state.cart.all_items)
    const [selectedColor, setSelectedColor] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true)

        dispatch(fetchPlants()).then(() => dispatch(thunkGetSinglePlant(plantId))).then(() => dispatch(fetchCartItems()).then(() => setIsLoading(false)))

    }, [dispatch, plantId])
    // we need to get the plant details from the state lets try that
    let plant = useSelector(state => state.plants?.all_plants[plantId])

    const handleMinus = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1)
        }
    }

    const handlePlus = () => {
        if (counter + 1 <= plant.quantity) {
            setCounter((prev) => prev + 1)

        }
    }

    const handleAddToCart = () => {
        setIsLoading(true)

        let cartItem = {
            "user_id": user.id,
            "plant_id": parseInt(plantId),
            "quantity": counter
        }

      
        dispatch(thunkCreateCartItem(cartItem)).then(() => setIsLoading(false))

    }

    if (isLoading) return <div className='plant-detail-wrapper'></div>
    return (

        <div className='wrapper'>
            <div className='plant-detail-top'>
                <p onClick={() => history.push("/plants")} className='plant-detail-header'>Plants</p>
                <span className='plant-detail-heading-division'>/</span>
                <p className='plant-detail-name'>{plant?.name}</p>
            </div>

            <div className='plant-detail-wrapper'>
                <div className='plant-detail-bottom'>
                    <div className='plant-detail-pic-div'>
                        <div className='plant-detail-main-pic'>
                            {/* if there is a user this allows you to add to delete to your favorites */}
                            {user && user.favorites[plantId] ?
                                (<i onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(thunkDeleteFav(plantId))
                                }} className="fa-duotone fa-heart"></i>) :
                                (<i onClick={(e) => {
                                    e.preventDefault()
                                    {
                                        if (!user) {
                                            return history.push('/login')
                                        } else {
                                            dispatch(thunkAddFav(plantId))
                                        }
                                    }


                                }} className="fa-regular fa-heart"></i>)
                            }
                            <img className='pic' src={plant?.preview_image} ></img>
                        </div>
                    </div>
                    <div className='plant-detail-info'>
                        <div className='plant-detail-subheader'>
                            <h3 className='side-title'>{plant?.name}</h3>
                            <p className='price'>{`$${plant?.price}`}</p>
                        </div>
                        <p className='plant-detail-description'>{plant?.description}</p>
                        <p className='plant-detail-description'>{`Currently Available: ${plant?.quantity}`}</p>
                        <div className='make-colors-small'>
                            <p className='pot-colors'>Pot Colors:</p>
                            <div className='plant-detail-pot-colors'>
                                <div
                                    className={`plant-detail-stone ${selectedColor === 'stone' ? 'selected' : ''}`}
                                    onClick={() => {
                                        selectedColor === 'stone' ? setSelectedColor('') :
                                            setSelectedColor('stone')
                                    }}
                                >
                                    <div className='stone'></div>
                                    <p>STONE</p>
                                </div>
                                <div className={`plant-detail-charcoal ${selectedColor === 'charcoal' ? 'selected' : ''} `}
                                    onClick={() => {
                                        selectedColor === 'charcoal' ? setSelectedColor('') :
                                            setSelectedColor('charcoal')
                                    }}
                                >
                                    <div className='charcoal'></div>
                                    <p>CHARCOAL</p>
                                </div>
                                <div className={`plant-detail-slate ${selectedColor === 'slate' ? 'selected' : ''}  `}
                                    onClick={() => {
                                        selectedColor === 'slate' ? setSelectedColor('') :
                                            setSelectedColor('slate')
                                    }}
                                >
                                    <div className='slate'></div>
                                    <p>SLATE</p>
                                </div>
                            </div>

                        </div>
                        <div className='plant-detail-buttons'>
                            <div className="input-cart" onChange={(e) => setCart(e.target.value)}>
                                <i className="fa-solid fa-minus" onClick={handleMinus}></i>
                                <div className='num'>
                                    {counter}
                                </div>
                                <i className="fa-solid fa-plus" onClick={handlePlus}></i>
                            </div>
                            {user ? (
                                <OpenModalButton
                                    className="cart-button"
                                    buttonText="ADD TO CART"
                                    modalComponent={<ShoppingCartModal cart={cartInfo} plants={allPlants} />}
                                    onButtonClick={handleAddToCart}
                                />

                            ) : (
                                <NavLink
                                    className="cart-button-login"
                                    exact to='/login'
                                >
                                    ADD TO CART
                                </NavLink>

                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
