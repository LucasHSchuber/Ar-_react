import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Importing api url and enpoints
import { BASE_URL, BASE_URL2, ITEM_ENDPOINT, CATEGORY_ENDPOINT, INFORMATION_ENDPOINT, UNIT_ENDPOINT } from '../../api';

//import css
import '../../assets/css/additem.css';



function AddItem() {
    //defines states
    const [itemName, setItemName] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [unitID, setUnitID] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const [items, setItems] = useState([]);
    const [error, setError] = useState({
        errorAlreadyExistsInDb: false,
        errorItemName: false
    });




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

    // Function to fetch items from the API
    const fetchItemsToday = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${ITEM_ENDPOINT}/today`);
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            setError(error);
        }
    };

    //On mount
    useEffect(() => {
        // Fetch items on component mount
        fetchUnits();
        fetchCategories();
        fetchItemsToday();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(itemName);
        console.log(categoryID);
        console.log(quantity);
        console.log(unitID);
        console.log(amount);

        try {
            const response = await axios.post(`${BASE_URL}${ITEM_ENDPOINT}`, {
                ItemName: itemName,
                CategoryID: categoryID,
                Quantity: quantity,
                UnitID: unitID,
                Amount: amount
            });
            console.log(response.data);
            // Reset form fields after successful submission
            setItemName('');
            // setCategoryID('');
            // setUnitID('');
            // setAmount('');
            // setQuantity('');

            fetchItemsToday();
        } catch (error) {
            console.error('Error adding item:', error);
            console.error('Response from API:', error.response.data);
            setError({
                errorAlreadyExistsInDb: error.response.data
            });
        }
    };



    const confirmDelete = (item) => {
        if (window.confirm("Är du säker på att du vill radera '" + item.itemName + "' från köket?")) {
            deleteItem(item.itemID);
        }
    }

    const deleteItem = async (id) => {
        console.log(id);
        try {
            // Send delete request to the API
            await axios.delete(`${BASE_URL}${ITEM_ENDPOINT}/${id}`);
            console.log("Item deleted");
            // Fetch updated items after deleted
            fetchItemsToday();
        } catch (error) {
            console.log(error);
        }
    }





    return (

        <div className='py-md-4 py-sm-2  pb-5'>
            <h4 className='py-3 page-title'>Lägg till vara</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group-additem">
                    <label htmlFor="itemName">Vara</label>
                    <input
                        type="text"
                        id="itemName"
                        placeholder='Vara'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-additem">
                    <label htmlFor="amount">Antal</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder='Antal'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className='d-flex'>
                    <div className="form-group-additem">
                        <label htmlFor="quantity">Mängd</label>
                        <input
                            type="number"
                            id="quantity"
                            placeholder='Mängd'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-additem mx-1 mt-1">
                        <label htmlFor="unitId" >Enhet</label>
                        <select className="modal-input initial-option" type="number" name="unitId" value={unitID}
                            onChange={(e) => setUnitID(e.target.value)}>
                            <option value="" >Välj enhet</option>
                            {units.map(unit => (
                                <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group-additem">
                    <label htmlFor="categoryID">Kategori</label>
                    <select className="modal-input" type="number" name="categoryID" value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}>
                        <option value="">Välj kategori</option>
                        {categories.map(category => (
                            <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>

                <button className="add-btn-additem btn mt-3" type="submit">Lägg till vara <i class="fa-solid fa-plus"></i></button>
            </form>

            {error.errorAlreadyExistsInDb && (
                <div className="error-message mt-3">Ops.. {error.errorAlreadyExistsInDb}</div>
            )}


            <hr className='hr mt-5'></hr>

            <div className='my-3'>
                <h5 className='py-3'>Tillagda varor idag:</h5>
                <table>
                    <thead>
                        <tr>
                            <th>Vara</th>
                            <th>Mängd</th>
                            <th>Kategori</th>
                            {/* <th>Enhet</th> */}
                            <th>Antal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.itemID} className={item.amount === 0 ? 'zero-quantity-alert' : ''}>
                                <td>{item.itemName}</td>
                                <td>{item.quantity} {item.unitName}</td>
                                <td>{item.categoryName}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <button className="del-btn" onClick={() => confirmDelete(item)}><i class="icon fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default AddItem;
