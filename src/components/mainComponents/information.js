import React, { useState, useEffect } from 'react';
import axios from 'axios';

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("handlesubmit test");

        try {
            const response = await axios.post('http://localhost:5249/api/information', {
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
            await axios.delete(`http://localhost:5249/api/information/${id}`);
            console.log("Information deleted");
            fetchInformation();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='py-md-4 py-sm-2'>
            <h4 className='py-md-3 '>Information</h4>
            <div className='wrapper-info py-4'>
                {information.map(info => (
                    <div className='info-box d-flex justify-content-between' key={info.id}>
                        <div>
                            <h5 className='info-title'>{info.title}</h5>
                            <span>Av: {info.writer}</span>
                            <p className='info-description'>{info.description}</p>
                        </div>
                        <div>
                            <button className="del-info-btn" onClick={() => confirmDeleteInformation(info)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="information-button" onClick={openInformationForm}>
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
                        <button type='submit' >Skicka <i class="fa-solid fa-plus"></i></button>
                    </div>
                </form>

            </div>

        </div>
    );


}

export default Information;
