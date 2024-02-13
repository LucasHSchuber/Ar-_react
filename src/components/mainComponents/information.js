import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import css
import '../../assets/css/information.css';

//start apge
function Information() {
    //defining states
    const [information, setInformation] = useState([])



    //fetching information from db
    const fetchInformation = async () => {
        try {
            const response = await axios.get('http://localhost:5249/api/information');
            console.log(response.data);
            setInformation(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchInformation();
    }, []);




    return (
        <div className=''>

            <p>Information</p>

        </div>
    );


}

export default Information;
