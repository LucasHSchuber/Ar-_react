import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    // Function to fetch items from the API
    const fetchItemsToday = async () => {
        try {
            const response = await axios.get('http://localhost:5249/api/item/today');
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
            const response = await axios.post('http://localhost:5249/api/item', {
                ItemName: itemName,
                CategoryID: categoryID,
                Quantity: quantity,
                UnitID: unitID,
                Amount: amount
            });
            console.log(response.data);
            // Reset form fields after successful submission
            setItemName('');
            setCategoryID('');
            setUnitID('');
            setAmount('');
            setQuantity('');

            fetchItemsToday();
        } catch (error) {
            console.error('Error adding item:', error);
            console.error('Response from API:', error.response.data);
            setError({
                errorAlreadyExistsInDb: error.response.data
            });
        }
    };




    return (

        <div className='py-md-4 py-sm-2'>
            <h4 className='py-md-3'>Lägg till vara</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group mx-1">
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
                <div className="form-group">
                    <label htmlFor="categoryID">Kategori</label>
                    <select className="modal-input" type="number" name="categoryID" value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}>
                        <option value="">Välj kategori</option>
                        {categories.map(category => (
                            <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>

                <button className="add-btn mt-3" type="submit">Lägg till vara <i class="fa-solid fa-plus"></i></button>
            </form>

            {error.errorAlreadyExistsInDb && (
                <div className="error-message mt-3">Ops.. {error.errorAlreadyExistsInDb}</div>
            )}


            <hr className='hr'></hr>

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
                                {/* <td>{item.unitName}</td> */}
                                <td className='d-flex'>
                                    <p>{item.amount}</p>
                                </td>
                                <td>
                                    {/* Button to delete item */}
                                    {/* <button className="del-btn" onClick={() => confirmDelete(item)}>Delete</button>
                                    <button className="edit-btn" onClick={() => openEditModal(item)}>Edit</button> */}
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
