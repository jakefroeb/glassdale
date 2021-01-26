/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
debugger
export const ConvictionSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getConvictions()
    .then( () => {
      // Get all convictions from application state
      const convictions = useConvictions()
      render(convictions)
    })
}

const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            
                ${convictionsCollection.map(conviction => `<option value="${conviction.id}">${conviction.name}</option>`)}
            
        </select>
    `
}