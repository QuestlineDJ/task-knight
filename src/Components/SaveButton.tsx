import {saveFile} from '../LocalStorageManager';
import download_button from "../images/saveScreen/download_button.png";

function SaveButton() {
    return <img src={download_button} onClick={saveFile}></img>
}

export default SaveButton;