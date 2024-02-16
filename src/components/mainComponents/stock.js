import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import css
import '../../assets/css/stock.css';

//start apge
function Stock() {
    //defining states
    const [items, setItems] = useState([]);
    // const [error, setError] = useState(null);

    const [editedItem, setEditedItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const [searchString, setSearchString] = useState("");
    const [searchResult, setSearchResult] = useState("");







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
        // Function to fetch items from search 
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5249/api/item/search/${searchString}`)
                console.log(response.data);
                setSearchResult(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        if (searchString.trim() !== "") {
            fetchSearchResults();
        } else {
            setSearchResult([]);
        }

    }, [searchString]);

    //On mount
    useEffect(() => {
        // Fetch items on component mount
        fetchItems();
        fetchUnits();
        fetchCategories();
    }, []);



    const stockUpdate = async (id, amount) => {
        console.log(id, amount);

        //trigger this method to update table when search is the the search field.
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5249/api/item/search/${searchString}`);
                console.log(response.data);
                setSearchResult(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        try {
            if (amount !== "") { //make sure input not empty to update db with empty variable

                const response = await axios.put(`http://localhost:5249/api/item/updatestock/${id}?amount=${amount}`);
                console.log(response.data);
                fetchItems();
                fetchSearchResults(); //trigger method to update table dynamically
            }

        } catch (error) {
            console.log(error);
        }
    }



    const confirmDelete = (item) => {
        if (window.confirm("Är du säker på att du vill radera '" + item.itemName + "' från köket?")) {
            deleteItem(item.itemID);
        }
    }

    const deleteItem = async (id) => {
        console.log(id);
        try {
            // Send delete request to the API
            await axios.delete(`http://localhost:5249/api/item/${id}`);
            console.log("Item deleted");
            // Fetch updated items after deleted
            fetchItems();
        } catch (error) {
            console.log(error);
        }
    }




    const submitEditItem = async (e) => {
        e.preventDefault();
        let id = editedItem.itemID;
        console.log(id);
        console.log(editedItem);
        try {
            const response = await axios.put(`http://localhost:5249/api/item/${id}`, editedItem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchItems();
            closeModal();
            console.log("edited item", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };




    const openEditModal = (item) => {
        setEditedItem(item);
        setShowEditModal(true);
        console.log("Edit modal opened");
    }

    const closeModal = () => {
        setShowEditModal(false);
    };



    return (
        <div className='py-md-4 py-sm-2  pb-5'>
            <h4 className='py-3 page-title'>Köket</h4>
            {/* <h3 className='my-3'>Items</h3> */}
            <form className="form-inline">
                <input
                    className="form-control search-bar my-4"
                    type="search"
                    placeholder="Sök efter vara eller kategori.."
                    aria-label="Search"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />

            </form>
            <table>
                <thead>
                    <tr>
                        <th>Vara</th>
                        <th>Mängd</th>
                        <th>Kategori</th>
                        <th>Antal</th>
                        <th className='th-force-small'>Nytt antal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchResult.length > 0 ? searchResult : items).map((item) => (
                        <tr key={item.itemID} className={item.amount === 0 ? 'zero-quantity-alert' : ''}>
                            <td>{item.itemName}</td>
                            <td>{item.quantity} {item.unitName}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.amount} st</td>
                            <td className='th-force-small' style={{ border: 'none', borderBottom: '1px dotted black' }}>
                                <input
                                    style={{ border: 'none' }}
                                    id="amount"
                                    className='th-force-small'
                                    type="number"
                                    pattern="[0-9]*"
                                    value={item.Amount}
                                    onChange={(e) => stockUpdate(item.itemID, e.target.value)}
                                />
                            </td>
                            <td className=''>
                                <button className="edit-btn" onClick={() => openEditModal(item)}><i class="fa-solid fa-pen"></i></button>
                                <button className="del-btn" onClick={() => confirmDelete(item)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Edit Item Modal */}
            {showEditModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editedItem.itemName}</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" >
                                <form onSubmit={submitEditItem}>
                                    {/* Form inputs with pre-filled values */}
                                    <div className='d-flex'>
                                        <div className="form-group-modal">
                                            <label htmlFor="itemName">Vara</label>
                                            <input className="modal-input" type="text" name="itemName" value={editedItem.itemName} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group-modal ml-1">
                                            <label htmlFor="categoryID">Kategori</label>
                                            <select className="modal-input" type="number" name="categoryID" value={editedItem.categoryID} onChange={handleInputChange} >
                                                {categories.map(category => (
                                                    <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="form-group-modal">
                                            <label htmlFor="itemName">Quantity</label>
                                            <input className="modal-input" type="text" name="quantity" value={editedItem.quantity} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group-modal ml-1">
                                            <label htmlFor="unitId">Enhet</label>
                                            <select className="modal-input" type="number" name="unitId" defaultValue={editedItem.unitID} onChange={handleInputChange}>
                                                {units.map(unit => (
                                                    <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Other inputs */}
                                    <button type="submit" className="save-changes-btn mt-3">Spara ändringar <i class="fa-solid fa-check"></i></button>
                                </form>
                            </div>
                            <div className='modal-footer'>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }



        </div >

    );
}

export default Stock;
