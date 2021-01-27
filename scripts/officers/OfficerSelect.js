import { useOfficers, getOfficers } from "./OfficerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})
// Get a reference to the DOM element where the <select> will be rendered

export const OfficerSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getOfficers()
    .then( () => {
      // Get all convictions from application state
      const officers = useOfficers()
      render(officers)
    })
}

const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            
                ${officersCollection.map(officer => `<option value="${officer.name}">${officer.name}</option>`)}
            
        </select>
    `
}