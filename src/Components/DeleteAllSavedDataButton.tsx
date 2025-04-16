import { deleteAllLocalStorage } from "../LocalStorageManager";

function DeleteAllSavedDataButton() {
  return <button onClick={deleteStorage}>Delete All Progress</button>;
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
