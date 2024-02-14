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
            const response = await axios.get('http://localhost:5249/api/category');
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
            const response = await axios.post('http://localhost:5249/api/category', {
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
            const response = await axios.delete(`http://localhost:5249/api/category/${id}`)
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
            const response = await axios.put(`http://localhost:5249/api/category/${id}`, {
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
            const response = await axios.get('http://localhost:5249/api/unit');
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
            const response = await axios.post('http://localhost:5249/api/unit', {
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
            const response = await axios.delete(`http://localhost:5249/api/unit/${id}`)
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
            const response = await axios.put(`http://localhost:5249/api/unit/${id}`, {
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
        <div className='py-md-4 py-sm-2'>
            <h4 className='py-md-3 '>Inställningar</h4>

            <div>
                <div className='my-4'>
                    <h5>Hantera kategorier</h5>
                    <p>Alla befintliga kategorier</p>
                    <div className="form-group">
                        <select className="modal-input" type="number" name="categoryID" onChange={(e) => setDeletedCategoryId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {categories.map(category => (
                                <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                            ))}
                        </select>
                        <button className="add-btn mx-1" type='submit' onClick={() => confirmDeleteCategory(deletedCategoryId)}>Radera kategori</button>
                    </div>
                    <div className="form-group">
                        <select className="modal-input" type="number" name="categoryID" onChange={(e) => setOldCategoryId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {categories.map(category => (
                                <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                            ))}
                        </select>
                        <input
                            id="category"
                            className='ml-1'
                            placeholder='Nytt namn på kategorin'
                            value={updatedCategory}
                            onChange={(e) => setUpdatedCategory(e.target.value)}
                            required
                        >
                        </input>
                        <button className="add-btn mx-1" type='submit' onClick={() => confirmEditCategory(oldCategoryId, updatedCategory)}>Ändra</button>
                    </div>
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
                        <button className="add-btn mx-1" type='submit' >Lägg till kategori</button>

                        {error.category && (
                            <div className="mt-3">Ops.. {error.category}</div>
                        )}

                    </form>
                </div>

                <hr className='hr'></hr>

                <div className='my-4'>
                    <h5>Hantera enheter</h5>
                    <p>Alla befintliga enheter</p>
                    <div className="form-group">
                        <select className="modal-input initial-option" type="number" name="unitID" onChange={(e) => setDeletedUnitId(e.target.value)}>
                            <option value="" >Välj enhet</option>
                            {units.map(unit => (
                                <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                            ))}
                        </select>
                        <button className="add-btn mx-1" type='submit' onClick={() => confirmDeleteUnit(deletedUnitId)}>Radera enhet</button>
                    </div>
                    <div className="form-group">
                        <select className="modal-input" type="number" name="UnitID" onChange={(e) => setOldUnitId(e.target.value)}>
                            <option value="">Välj kategori</option>
                            {units.map(unit => (
                                <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                            ))}
                        </select>
                        <input
                            id="unit"
                            className='ml-1'
                            placeholder='Nytt namn på enheten'
                            value={updatedUnit}
                            onChange={(e) => setUpdatedUnit(e.target.value)}
                            required
                        >
                        </input>
                        <button className="add-btn mx-1" type='submit' onClick={() => confirmEditUnit(oldUnitId, updatedUnit)}>Ändra</button>
                    </div>
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
                        <button className="add-btn mx-1" type='submit' >Lägg till enhet</button>

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
