import { useState } from 'react';
import SaveButton from './SaveButton';
import DeleteAllSavedDataButton from './DeleteAllSavedDataButton';
import { loadFile } from '../LocalStorageManager';

function SaveWindow() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
        <button className='open-screen-button' onClick={() => setOpen(!isOpen)}>Toggle Save Screen</button>
        {isOpen ? (
            <div className='modal_container'>
            <div className="modal">
            <p className='close-popup' onClick={() => setOpen(false)}>X</p>
            <p className='delete-all-saved-data-button'><DeleteAllSavedDataButton/></p>
                <div className="content">
                    <h2>TEST</h2>
                </div>
                <li className='button'><SaveButton/></li>
                <input type="file" accept='.txt' className='button' onChange={loadFile}></input>
            </div>
        </div>
        ) : null}
        
        </>
    )
}

export default SaveWindow;