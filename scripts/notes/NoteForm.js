import { saveNote } from "./NoteProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        clickEvent.preventDefault();
        
        // Make a new object representation of a note
        const newNote = {
            date : document.querySelector("#noteDate").value,
            title : document.querySelector("#noteTitle").value,
            text : document.querySelector("#noteText").value,
            // Key/value pairs here
        }

        // Change API state and application state
        saveNote(newNote)
    }
})


const render = () => {
    contentTarget.innerHTML = `
    <form action="">
                <fieldset class="inputForm">
                    <label for="noteDate">Date of entry</label>
                    <input type="date" name="noteDate" id="noteDate">
                    <label for="noteTitle">Title</label>
                    <input type="text" name="noteTitle" id="noteTitle">
                    <textarea name="noteText" id="noteText" rows="10" cols="30">Notes</textarea>
                    <button id="saveNote">Save Note</button>
                </fieldset>             
            </form>
    `
}

export const NoteForm = () => {
    render()
}