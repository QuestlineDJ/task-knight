import {saveFile} from '../LocalStorageManager';

function SaveButton() {
    return <button onClick={saveFile}>Save to File</button>
}

export default SaveButton;