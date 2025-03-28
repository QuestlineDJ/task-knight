import { useState } from 'react';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import { LoadFile } from '../LocalStorageManager';

function SaveWindow() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
        <button className='open-screen-button' onClick={() => setOpen(!isOpen)}>Toggle Save Screen</button>
        {isOpen ? (
            <div className='modal_container'>
            <div className="modal">
            <p className='close-popup' onClick={() => setOpen(false)}>X</p>
                <div className="content">
                    <h2>TEST</h2>
                </div>
                <li className='button'><SaveButton/></li>
                <input type="file" accept='.txt' className='button' onChange={LoadFile}></input>
            </div>
        </div>
        ) : null}
        
        </>
    )
}

export default SaveWindow;