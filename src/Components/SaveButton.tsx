import {saveFile} from '../LocalStorageManager';

function SaveButton() {
    return <img src='src\images\saveScreen\download_button.png' onClick={saveFile}></img>
}

export default SaveButton;