import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import css
import '../../assets/css/home.css';

//start apge
function Home() {
    //defining states



    //fetching categories from categories table
    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5249/api/category');
    //         console.log(response.data);
    //         setCategories(response.data);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    //On mount
    // useEffect(() => {
    //     // Fetch items on component mount
    //     fetchCategories();
    // }, []);



    return (
        <div className=''>

            <div className='nav-wrapper d-flex justify-content-center'>
                <Link to="/stock" className='nav-box'>
                    <div>
                        <h6>Överblicka köket</h6>
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
                        <h6>Information</h6>
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

        </div>
    );


}

export default Home;
