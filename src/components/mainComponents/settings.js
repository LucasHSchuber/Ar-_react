import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import css
import '../../assets/css/settings.css';

//start apge
function Settings() {
    //defining states

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);



    //fetching categories from categories table
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5249/api/category');
            console.log(response.data);
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    //fetching units from unit table
    const fetchUnits = async () => {
        try {
            const response = await axios.get('http://localhost:5249/api/unit');
            console.log(response.data);
            setUnits(response.data);

        } catch (error) {
            console.log(error);
        }
    }


    //On mount
    useEffect(() => {
        // Fetch items on component mount
        fetchUnits();
        fetchCategories();
    }, []);


    return (
        <div className='py-md-4 py-sm-2'>
            <h4 className='py-md-3 '>Inställningar</h4>

            <ul>
                <li>Lägga till kategori och enhet</li>
                <li>ta bort kategori och enhet</li>
                <li>Kunna ändra och lägga till information på informations-sidan</li>
            </ul>

            <div>
                <div className='my-4'>
                    <form>
                        <h5>Lägg till ny kategori</h5>
                        <p>Alla befintliga kategorier</p>
                        <div className="form-group">
                            <select className="modal-input" type="number" name="categoryID">
                                <option value="">Välj kategori</option>
                                {categories.map(category => (
                                    <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor='category'></label>
                        <input
                            placeholder='Kategori'
                        >
                        </input>
                        <button className="add-btn mx-1" type='submit'>Lägg till kategori</button>
                    </form>
                </div>

                <hr className='hr'></hr>

                <div className='my-4'>
                    <form>
                        <h5>Lägg till ny enhet</h5>
                        <p>Alla befintliga enheter</p>
                        <div className="form-group">
                            <select className="modal-input initial-option" type="number" name="unitId">
                                <option value="" >Välj enhet</option>
                                {units.map(unit => (
                                    <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor='unit'></label>
                        <input
                            placeholder='Enhet'
                        >
                        </input>
                        <button className="add-btn mx-1" type='submit'>Lägg till enhet</button>
                    </form>
                </div>
            </div>

        </div>
    );


}

export default Settings;
