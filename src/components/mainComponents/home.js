import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// importing bg images
import bgImg1 from '../../assets/images/bg1.jpg';
import bgImg2 from '../../assets/images/bg2.jpg';
import bgImg3 from '../../assets/images/bg3.jpg';
import bgImg4 from '../../assets/images/bg4.jpg';
import bgImg5 from '../../assets/images/bg5.jpg';
import bgImg6 from '../../assets/images/bg6.jpg';

//import css
import '../../assets/css/home.css';


//start apge
function Home() {

    //defining states
    const [items, setItems] = useState([]);

    //generate an bg image to home.js
    const generateRandomBG = () => {
        //array with bg-images
        let imgArray = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6];
        let randomIndex = Math.floor(Math.random() * imgArray.length);
        //choosen bg-image (path to image)
        let randomImg = imgArray[randomIndex];
        let BGel = document.getElementById("home-wrapper");
        BGel.style.backgroundImage = `url(${randomImg})`;
    }


    // Function to fetch items from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5249/api/item');
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    };



    useEffect(() => {
        generateRandomBG();
        fetchItems();
    }, []);


    return (
        <div className='home-wrapper' id="home-wrapper" >

            <div className='nav-wrapper d-flex justify-content-center'>
                <Link to="/kitchen" className='nav-box'>
                    <div>
                        <h6>Köket</h6>
                    </div>
                    <div>
                        <i className="fa-solid fa-2x fa-kitchen-set"></i>
                    </div>
                </Link>
                {/* Link to /additem */}
                <Link to="/additem" className='nav-box'>
                    <div>
                        <h6>Lägg till</h6>
                    </div>
                    <div>
                        <i className="fa-solid fa-2x  fa-plus"></i>
                    </div>
                </Link>
            </div>
            <div className='nav-wrapper d-flex justify-content-center'>
                {/* Link to /information */}
                <Link to="/information" className='nav-box'>
                    <div>
                        <h6>Info</h6>
                    </div>
                    <div>
                        <i className="fa-solid fa-2x fa-info"></i>
                    </div>
                </Link>
                {/* Link to /settings */}
                <Link to="/settings" className='nav-box'>
                    <div>
                        <h6>Inställningar</h6>
                    </div>
                    <div>
                        <i className="fa-solid fa-2x fa-gear"></i>
                    </div>
                </Link>
            </div>

            <div className="status-wrapper d-flex justify-content-center">
                <div className="circle-box">
                    <div>
                        <h5>Antal olika varor i köket: </h5>
                    </div>
                    <div className="circle">{items.length}
                    </div>
                </div>
                <div className="circle-box">
                    <div>
                        <h5>Totalt antal varor i köket: </h5>
                    </div>
                    <div className="circle">
                        {items.reduce((sum, item) => sum + item.amount, 0)}
                    </div>
                </div>
            </div>

        </div>
    );


}

export default Home;
