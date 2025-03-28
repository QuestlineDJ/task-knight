import {SaveFile} from '../LocalStorageManager';

function SaveButton() {
    return <button onClick={SaveFile}>Save to File</button>
}

export default SaveButton;