import { deleteAllLocalStorage } from "../LocalStorageManager";
import delete_save from "../images/saveScreen/delete_data_icon.png";

function DeleteAllSavedDataButton() {
  return <img src={delete_save} onClick={deleteStorage}></img>;
}

/**
 * Deletes all local storage (that was created via this website) with a push of a button
 */
function deleteStorage() {
  //Deletes all content (made by THIS website) from the local storage

  deleteAllLocalStorage();

  //Refreshes page
  location.reload();
}

export default DeleteAllSavedDataButton;