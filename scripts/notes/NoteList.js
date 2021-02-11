import { getNotes, useNotes } from './NoteProvider.js'
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js'

const contentTarget = document.querySelector(".noteList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList();
})
eventHub.addEventListener("noteStateChanged", customEvent => {
    NoteList();
})

const render = (noteCollection, criminalCollection) => {
    contentTarget.innerHTML = noteCollection.map(note => {
        // Find the related criminal
        debugger
        const relatedCriminal = criminalCollection.find(criminal => criminal.id === parseInt(note.criminalId))

        return `
            <section class="note">
                <h2>Note about ${relatedCriminal.name}</h2>
                ${note.text}
            </section>
        `
    })
}

export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()

            render(notes, criminals)
        })
}