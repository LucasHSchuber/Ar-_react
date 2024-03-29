import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing api url and enpoints
import { BASE_URL, BASE_URL2, ITEM_ENDPOINT, CATEGORY_ENDPOINT, INFORMATION_ENDPOINT, UNIT_ENDPOINT } from '../../api';

//import css
import '../../assets/css/information.css';

//start apge
function Information() {
    //defining states
    const [information, setInformation] = useState([])

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    const [openForm, setOpenForm] = useState(true);

    //fetching information from db
    const fetchInformation = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${INFORMATION_ENDPOINT}`);
            console.log(response.data);
            setInformation(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchInformation();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("handlesubmit test");

        try {
            const response = await axios.post(`${BASE_URL}${INFORMATION_ENDPOINT}`, {
                Title: title,
                Writer: writer,
                Description: description
            })

            console.log(response.data);

            setWriter("");
            setDescription("");
            setTitle("");

            fetchInformation();

        } catch (error) {
            console.log(error);
        }

    }



    const openInformationForm = () => {
        var informationFormEl = document.getElementById("information-form");

        if (informationFormEl.style.display === "block") {
            informationFormEl.style.display = "none";
            setOpenForm(true);
        } else {
            informationFormEl.style.display = "block";
            setOpenForm(false);
        }
    }

    const confirmDeleteInformation = (info) => {

        if (window.confirm("Är du säker på att du vill radera '" + info.title + "'?")) {
            deleteInformation(info.id);
        }
    }

    const deleteInformation = async (id) => {
        console.log(id);
        try {
            // Send delete request to the API
            await axios.delete(`${BASE_URL}${INFORMATION_ENDPOINT}/${id}`);
            console.log("Information deleted");
            fetchInformation();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='py-md-4 py-sm-2  pb-5'>
            <h4 className='py-3 page-title'>Information</h4>
            <div className='wrapper-info py-4 row'>
                {information.map(info => (
                    <div className='info-box col-md-4 d-flex' key={info.id}>
                        <div>
                            <h5 className='info-title'>{info.title}</h5>
                            <span>Av: {info.writer}  ({info.created.substring(0, 10)})</span>
                            <p className='info-description'>{info.description}</p>
                        </div>
                        <div className='del-info-btn-box'>
                            <button className="del-info-btn" onClick={() => confirmDeleteInformation(info)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="information-button btn my-3" onClick={openInformationForm}>
                {openForm ? (
                    <>
                        Skriv nytt <i className="fa-solid fa-chevron-down"></i>
                    </>
                ) : (
                    <>
                        Stäng <i className="fa-solid fa-xmark"></i>
                    </>
                )}
            </button>

            <div id="information-form">
                <h5>Skriv nytt inlägg:</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Namn</label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Namn'
                            value={writer}
                            onChange={(e) => setWriter(e.target.value)}
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Titel</label>
                        <input
                            type="text"
                            id="title"
                            placeholder='Titel'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        ></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Meddelande</label>
                        <textarea
                            type="text"
                            id="description"
                            placeholder='Meddelande'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <button className="send-btn btn" type='submit' >Skicka <i class="fa-solid fa-plus"></i></button>
                    </div>
                </form>

            </div>

        </div>
    );


}

export default Information;
