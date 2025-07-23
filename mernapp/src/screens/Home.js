import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />

            {/* Carousel Section */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark"
                                type="search"
                                placeholder="Type in..."
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Sushi Platter" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Chicken" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Content Section */}
            <div className='container'>
                {
                    foodCat.length !== 0
                        ? foodCat.map((category) => (
                            <div className='row mb-3' key={category._id || category.CategoryName}>
                                <div>
                                    <h3>{category.CategoryName}</h3>
                                </div>
                                <hr />
                                {
                                    foodItem.length !== 0
                                        ?
                                        foodItem
                                            .filter(item =>
                                                item.CategoryName === category.CategoryName &&
                                                item.name.toLowerCase().includes(search.toLowerCase())
                                            )
                                            .map(filterItems => (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                      
                                                    ></Card>
                                                </div>
                                            ))
                                        :
                                        <div>No such data found</div>
                                }
                            </div>
                        ))
                        : <div>Loading categories...</div>
                }
            </div>

            <Footer />
        </div>
    );
}
