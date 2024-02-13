import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import css
import '../../assets/css/settings.css';

//start apge
function Settings() {
    //defining states




    return (
        <div className='py-md-4 py-sm-2'>
            <h4 className='py-md-3 '>Inställningar</h4>

            <ul>
                <li>Lägga till kategori och enhet</li>
                <li>ta bort kategori och enhet</li>
                <li>Kunna ändra och lägga till information på informations-sidan</li>
            </ul>

        </div>
    );


}

export default Settings;
