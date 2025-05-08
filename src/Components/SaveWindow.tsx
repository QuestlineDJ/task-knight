import SaveButton from "./SaveButton";
import DeleteAllSavedDataButton from "./DeleteAllSavedDataButton";
import { loadFile } from "../LocalStorageManager";
import "../SaveScreen.css";
import saveBanner from "../images/saveScreen/saved_banner.png";
import gray_cancel_buton from "../images/saveScreen/gray_cancel_button.png";
import gray_confirm_button from "../images/saveScreen/gray_confirm_button.png";
import cancel_buton from "../images/saveScreen/cancel_button.png";
import confirm_button from "../images/saveScreen/confirm_button.png";
import upload_button from "../images/saveScreen/upload_button.png";

const pictures = [
  gray_cancel_buton,
  cancel_buton,
  gray_confirm_button,
  confirm_button
];

function SaveWindow() {
  var isButtonActive = false;
  var file: File | null;

  return (
    <div className="scale">
      <div className="scale delete">
        <DeleteAllSavedDataButton />
      </div>

      <aside className="scale heading">
        <img src={saveBanner}></img>
      </aside>

      <div className="scale download">
        <SaveButton />
      </div>

      <div className="scale cancel-button">
        <img src={pictures[0]} id="cancel" onClick={cancelUpload}></img>
      </div>

      <div className="scale confirm-button">
        <img src={pictures[2]} id="confirm" onClick={confirmUpload}></img>
      </div>

      <input
        id="selectFile"
        type="file"
        title=" "
        accept=".txt"
        className="scale upload"
        onChange={uploadFile}

        style={{
          backgroundImage: "url(" + upload_button + ")"
        }}
      >
      </input>
    </div>
  );

  function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) {
      console.log("File is null");
      return;
    }

    file = event.target.files[0];
    event.target.value = "";
    //Finds buttons, casted to an image element
    const cancelElement: HTMLImageElement = document.getElementById("cancel") as HTMLImageElement;
    const confirmElement: HTMLImageElement = document.getElementById("confirm") as HTMLImageElement;

    //Null checks
    if (nullCheck(cancelElement, confirmElement)) {
      cancelElement.src = pictures[1];
      confirmElement.src = pictures[3];
      isButtonActive = true;
    }
  }

  function confirmUpload() {
    if (!file) {
      return;
    }

    //Finds buttons, casted to an image element
    const cancelElement: HTMLImageElement = getImage("cancel");
    const confirmElement = getImage("confirm");

    //Null checks
    if (nullCheck(cancelElement, confirmElement)) {
      if (isButtonActive) {
        cancelElement.src = pictures[0];
        confirmElement.src = pictures[2];
        isButtonActive = false;
        loadFile(file);
      }
    }
  }

  function cancelUpload() {
    //Finds buttons, casted to an image element
    const cancelElement: HTMLImageElement = getImage("cancel");
    const confirmElement = getImage("confirm");

    //Null checks
    if (nullCheck(cancelElement, confirmElement)) {
      if (isButtonActive) {

        cancelElement.src = pictures[0];
        confirmElement.src = pictures[2];
        isButtonActive = false;

        if (!file) {
          return;
        }

        file = null;
      }
    }
  }

  /**
   * 
   * @param id string - the ID of the HTMLImageElement to be found
   * @returns the HTMLImageElement that was found via the ID
   */
  function getImage(id: string): HTMLImageElement {
    return document.getElementById(id) as HTMLImageElement;
  }

  /**
   * Null checks two images.
   * @param image1 the first image to null check
   * @param image2 the second image to null check
   * @returns boolean. If either image is null, returns false. Otherwise, true
   */
  function nullCheck(image1: HTMLImageElement, image2: HTMLImageElement): boolean {
    //Null Check
    if (!image1 || !image2) {
      console.error("NUll button detected"); //Null image found
      return false;
    }
    return true; //Null image was not found
  }
}

export default SaveWindow;