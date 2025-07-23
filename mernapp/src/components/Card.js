import React, { useEffect, useRef, useState } from 'react';
import { useCartDispatch, useCartState } from './ContextReducer';
import './Card.css';  // Import the CSS file for styling

export default function Card(props) {
    let dispatch = useCartDispatch();
    let data = useCartState();  // Accessing the cart

    // Logs whenever the cart updates
    useEffect(() => {
        console.log("Cart updated:", data);
    }, [data]);

    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [isAdded, setIsAdded] = useState(false);  // State to track if item is added to cart

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                setIsAdded(true); // Set to true when added
                return;
            } else if (food.size !== size) {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
                setIsAdded(true); // Set to true when added
                return;
            }
        }
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
        setIsAdded(true); // Set to true when added
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className="card-container">
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "420px" }}>
                <img
                    src={props.foodItem.img || "https://via.placeholder.com/200x150?text=No+Image"}
                    className="card-img-top"
                    alt="Food"
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 select-qty" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className="m-2 h-100 select-size" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                );
                            })}
                        </select>

                        <div className="d-inline h-100 fs-5">
                            Rs.{finalPrice}/-
                        </div>
                        <hr />
                        <button
                            className={`btn ${isAdded ? 'btn-success' : 'btn-secondary'} add-to-cart-btn`}
                            onClick={handleAddToCart}
                            disabled={isAdded}  // Disable the button after adding to cart
                        >
                            {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
