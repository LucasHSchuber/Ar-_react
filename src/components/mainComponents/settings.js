import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Importing api url and enpoints
import {BASE_URL, BASE_URL2, ITEM_ENDPOINT, CATEGORY_ENDPOINT, INFORMATION_ENDPOINT, UNIT_ENDPOINT } from '../../api';

//import css
import '../../assets/css/settings.css';

//start apge
function Settings() {
    //defining states

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [oldUnitId, setOldUnitId] = useState("");
    const [updatedUnit, setUpdatedUnit] = useState("");

    const [newCategory, setNewCategory] = useState("");
    const [deletedCategoryId, setDeletedCategoryId] = useState("");
    const [oldCategoryId, setOldCategoryId] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");

    const [newUnit, setNewUnit] = useState("");
    const [deletedUnitId, setDeletedUnitId] = useState("");

    const [error, setError] = useState({
        category: false,
        unit: false
    });



    // ALL CATEGORIES METHODS

    //fetching categories from categories table
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${CATEGORY_ENDPOINT}`);
            console.log(response.data);
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    //posting new category
    const PostNewCategory = async (e, newCategory) => {
        e.preventDefault();
        console.log("posting new category" + newCategory);
        try {
            const response = await axios.post(`${BASE_URL}${CATEGORY_ENDPOINT}`, {
                categoryName: newCategory
            });
            console.log(response.data);
            setNewCategory("");
            fetchCategories();
            setError({
                category: ""
            });

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            setError({
                category: error.response.data
            });
        }
    }

    //delete categories
    const confirmDeleteCategory = async (id) => {
        if (window.confirm("Är du säker på att du vill radera kategorin? Alla varor kopplade till kategorin kommer att försvinna från köket.")) {
            deleteCategory(id);
        }
    }
    const deleteCategory = async (id) => {
        // e.preventDefault();
        console.log("deleting category" + id);
        try {
            const response = await axios.delete(`${BASE_URL}${CATEGORY_ENDPOINT}/${id}`)
            fetchCategories();
        } catch (error) {
            console.log(error);
        }
    }

    //update categories
    const confirmEditCategory = async (id, updatedCategory) => {
        if (window.confirm("Är du säker på att du vill ändra namn på kategorin till " + updatedCategory + "?")) {
            updateCategory(id, updatedCategory);
        }
    }
    const updateCategory = async (id, updatedCategory) => {
        // e.preventDefault();
        console.log("new: " + updatedCategory);
        console.log("id: " + id);
        try {
            const response = await axios.put(`${BASE_URL}${CATEGORY_ENDPOINT}/${id}`, {
                CategoryID: id,
                CategoryName: updatedCategory
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            fetchCategories();
            setUpdatedCategory('');
        } catch (error) {
            console.log(error);
        }
    }





    // ALL UNIT METHODS

    //fetching units from unit table
    const fetchUnits = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${UNIT_ENDPOINT}`);
            console.log(response.data);
            setUnits(response.data);

        } catch (error) {
            console.log(error);
        }
    }


    //posting new unit
    const PostNewUnit = async (e, newUnit) => {
        e.preventDefault();
        console.log("posting new unit" + newUnit);
        try {
            const response = await axios.post(`${BASE_URL}${UNIT_ENDPOINT}`, {
                UnitName: newUnit
            });
            console.log(response.data);
            setNewUnit("");
            fetchUnits();
            setError({
                unit: ""
            });

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            setError({
                unit: error.response.data
            });
        }
    }

    //delete unit
    const confirmDeleteUnit = async (id) => {
        if (window.confirm("Är du säker på att du vill radera enheten? Alla varor kopplade till enheten kommer att försvinna från köket.")) {
            deleteUnit(id);
        }
    }
    const deleteUnit = async (id) => {
        // e.preventDefault();
        console.log("deleting unit" + id);
        try {
            const response = await axios.delete(`${BASE_URL}${UNIT_ENDPOINT}/${id}`)
            fetchUnits();
        } catch (error) {
            console.log(error);
        }
    }


    //update categories
    const confirmEditUnit = async (id, updatedUnit) => {
        if (window.confirm("Är du säker på att du vill ändra namn på kategorin till " + updatedUnit + "?")) {
            updateUnit(id, updatedUnit);
        }
    }
    const updateUnit = async (id, updatedUnit) => {
        // e.preventDefault();
        console.log("new: " + updatedUnit);
        console.log("id: " + id);
        try {
            const response = await axios.put(`${BASE_URL}${UNIT_ENDPOINT}/${id}`, {
                UnitID: id,
                UnitName: updatedUnit
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            fetchUnits();
            setUpdatedUnit('');
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
        <div className='py-md-4 py-sm-2 pb-5'>
            <h4 className='page-title py-3'>Inställningar</h4>

            <div>
                <div className='my-4'>
                    <h5 className='my-3'>Hantera kategorier</h5>
                    <p>Radera / Uppdatera / Lägg till nya kategorier</p>
                    {/* <p>Alla befintliga kategorier</p> */}
                    <div className="form-group-settings my-2">
                        <select className="modal-input" type="number" name="categoryID" onChange={(e) => setDeletedCategoryId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {categories.map(category => (
                                <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                            ))}
                        </select>
                        <button className="btn add-btn-settings mx-1" type='submit' onClick={() => confirmDeleteCategory(deletedCategoryId)}>Radera kategori <i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <hr className='hr-divider'></hr>
                    <div className="form-group-settings my-4">
                        <select className="modal-input" type="number" name="categoryID" onChange={(e) => setOldCategoryId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {categories.map(category => (
                                <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                            ))}
                        </select>
                        <input
                            id="category"
                            className='ml-1'
                            placeholder='Nytt namn'
                            value={updatedCategory}
                            onChange={(e) => setUpdatedCategory(e.target.value)}
                            required
                        >
                        </input>
                        <button className="btn add-btn-settings btn-responsive-settings mx-sm-1" type='submit' onClick={() => confirmEditCategory(oldCategoryId, updatedCategory)}>Spara ändringar <i class="fa-solid fa-check"></i></button>
                    </div>
                    <hr className='hr-divider'></hr>
                    <div>
                        <form onSubmit={(e) => PostNewCategory(e, newCategory)}>
                            <label htmlFor='category'></label>
                            <input
                                id="category"
                                placeholder='Kategori'
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                required
                            >
                            </input>
                            <button className="btn add-btn-settings mx-1" type='submit' >Lägg till kategori <i class="fa-solid fa-plus"></i></button>

                            {error.category && (
                                <div className="mt-3">Ops.. {error.category}</div>
                            )}

                        </form>
                    </div>
                </div>

                <hr className='hr my-5 my-md-1'></hr>

                <div className='my-4'>
                    <h5 className='my-3'>Hantera enheter</h5>
                    <p>Radera / Uppdatera / Lägg till nya enheter</p>
                    {/* <p>Alla befintliga enheter</p> */}
                    <div className="form-group-settings my-2">
                        <select className="modal-input initial-option" type="number" name="unitID" onChange={(e) => setDeletedUnitId(e.target.value)}>
                            <option value="" >Välj enhet</option>
                            {units.map(unit => (
                                <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                            ))}
                        </select>
                        <button className="btn add-btn-settings mx-1" type='submit' onClick={() => confirmDeleteUnit(deletedUnitId)}>Radera enhet <i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <hr className='hr-divider'></hr>
                    <div className="form-group-settings my-4">
                        <select className="modal-input" type="number" name="UnitID" onChange={(e) => setOldUnitId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {units.map(unit => (
                                <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                            ))}
                        </select>
                        <input
                            id="unit"
                            className='ml-1'
                            placeholder='Nytt namn'
                            value={updatedUnit}
                            onChange={(e) => setUpdatedUnit(e.target.value)}
                            required
                        >
                        </input>
                        <button className="btn add-btn-settings btn-responsive-settings mx-sm-1" type='submit' onClick={() => confirmEditUnit(oldUnitId, updatedUnit)}>Spara ändringar <i class="fa-solid fa-check"></i></button>
                    </div>
                    <hr className='hr-divider'></hr>
                    <form onSubmit={(e) => PostNewUnit(e, newUnit)}>
                        <label htmlFor='unit'></label>
                        <input
                            id="unit"
                            placeholder='Enhet'
                            value={newUnit}
                            onChange={(e) => setNewUnit(e.target.value)}
                            required
                        >
                        </input>
                        <button className="btn add-btn-settings mx-1" type='submit' >Lägg till enhet <i class="fa-solid fa-plus"></i></button>

                        {error.unit && (
                            <div className="mt-3">Ops.. {error.unit}</div>
                        )}
                    </form>
                </div>
            </div>

        </div >
    );


}

export default Settings;
