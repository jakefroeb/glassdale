import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";
import { saveNote } from "./NoteProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        clickEvent.preventDefault();
        
        // Make a new object representation of a note
        const newNote = {
            criminalId : document.querySelector("#noteForm--criminal").value,
            text : document.querySelector("#noteText").value,
            // Key/value pairs here
        }

        // Change API state and application state
        saveNote(newNote)
    }
})


const render = (criminals) => {
    contentTarget.innerHTML =
    `
    <form action="">
                <fieldset class="inputForm">
                <select id="noteForm--criminal" class="criminalSelect">
                ${criminals.map(criminal => `<option value="${ criminal.id }">${ criminal.name }</option>)`)}
                </select>
                    <textarea name="noteText" id="noteText" rows="10" cols="30">Notes</textarea>
                    <button id="saveNote">Save Note</button>
                </fieldset>             
            </form>
    `
}

export const NoteForm = () => {
    getCriminals().then(()=>{
        const criminals = useCriminals()
        render(criminals)
    })
}