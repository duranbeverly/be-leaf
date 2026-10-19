import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteHeart from "../FavoriteHeart";
import OpenModalButton from '../OpenModalButton';
import { fetchPlants } from '../../store/plants';
import ShoppingCartModal from '../ShoppingCartModal';
import { fetchImages } from '../../store/images';
import { fetchCartItems, thunkCreateCartItem } from '../../store/cart';
import { NavLink, useHistory } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import './PlantDetail.css'
import { ClockLoader } from "react-spinners"

export default function PlantDetail() {
    let { plantId } = useParams()

    let dispatch = useDispatch()
    let allPlants = useSelector((state) => state.plants?.all_plants)
    let [isLoading, setIsLoading] = useState(true)
    let [counter, setCounter] = useState(1)
    let user = useSelector((state) => state.session.user)
    let cartInfo = useSelector((state) => state.cart.all_items)
    const [selectedColor, setSelectedColor] = useState(null);
    const history = useHistory();

    // we need to get the plant details from the state lets try that
    let plant = useSelector(state => state.plants?.all_plants?.[plantId])

    useEffect(() => {
        let isMounted = true
        setIsLoading(true);

        // on a refresh the store is empty, so wait for the plants before deciding
        // whether this plant exists
        Promise.all([
            dispatch(fetchPlants()),
            dispatch(fetchImages())
        ]).catch(() => null).then(() => {
            if (isMounted) setIsLoading(false)
        })

        if (user) {
            dispatch(fetchCartItems())
        }

        return () => { isMounted = false }
    }, [dispatch, plantId]);

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
        if (user.id !== plant?.user_id) {
            let cartItem = {
                user_id: user.id,
                plant_id: parseInt(plantId),
                quantity: counter
            };

            dispatch(thunkCreateCartItem(cartItem));
        }
    };

    if (isLoading) {
        return (
            <div className='plant-detail-wrapper' style={{ opacity: 0.5 }}>
                <div className="center-loading">
                    <ClockLoader color="#224229" size={30} />
                </div>
            </div>
        )
    }


    if (!plant) {
        return (
            <div className="wrapper-lost">
                <div className="form-title not-found">
                    <div className="title-lost">
                        We couldn't find that plant
                    </div>
                    <NavLink className="cart-button-login" to="/plants">SEE ALL PLANTS</NavLink>
                </div>
            </div>
        )
    }

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
                        <div className='pics-to-left'>
                            <ImageCarousel plant_id={plant?.id} preview_image={plant?.preview_image} name={plant?.name} />
                        </div>
                        <div className='plant-detail-main-pic'>
                            {/* if there is a user this allows you to add to delete to your favorites */}
                            <FavoriteHeart plantId={plantId} />
                            {/* <img alt={plant?.name} className='pic' src={plant?.preview_image} ></img> */}
                        </div>
                    </div>
                    {/* this is the information about the plant */}
                    <div className='plant-detail-info'>
                        <div className='plant-detail-subheader'>
                            <h3 className='side-title'>{plant?.name}</h3>
                            <p className='price'>{`$${plant?.price}`}</p>
                        </div>
                        <p className='plant-detail-description'>{plant?.description}</p>
                        <p className='plant-detail-description'>{`Currently Available: ${plant?.quantity}`}</p>
                        <div className='make-colors-small'>
                            {/* code to select a pot color for the plant */}
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
                        {/* code for adding to cart */}
                        <div className='plant-detail-buttons'>
                            <div className="input-cart">
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
                                    id={user.id === plant?.user_id ? "disabled" : undefined}
                                    modalComponent={
                                        user.id !== plant?.user_id ? (
                                            <ShoppingCartModal cart={cartInfo} plants={allPlants} />
                                        ) : (
                                            null
                                        )
                                    }
                                    onButtonClick={handleAddToCart}
                                />

                            ) : (
                                <NavLink
                                    className="cart-button-login"
                                    to='/login'
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
