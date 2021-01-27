import { getCriminals, useCriminals} from "./CriminalProvider.js"
import { Criminal} from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
  if (event.detail.crimeThatWasChosen !== "0"){
    // Use the property you added to the event detail.
    const convictionsArray = useConvictions();
    const foundConviction = convictionsArray.find(conviction => conviction.id === parseInt(event.detail.crimeThatWasChosen))

        /*
            Filter the criminals application state down to the people that committed the crime
        */
        let matchingCriminals = useCriminals().filter(currentCriminal => foundConviction.name === currentCriminal.conviction)
        render(matchingCriminals)
        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
    }
})

eventHub.addEventListener("officerSelected", event => {
  // How can you access the officer name that was selected by the user?
  const officerName = event.detail.officer
  debugger

  // How can you get the criminals that were arrested by that officer?
  const criminals = useCriminals()
  const filteredCriminals = criminals.filter(
      criminalObject => {
          if (criminalObject.arrestingOfficer === officerName) {
              return true
          }
      }
  )
  render(filteredCriminals);
})

const render = criminalCollection => {
  let criminalsHTMLRepresentations = ""
  for(const criminal of criminalCollection){
    criminalsHTMLRepresentations += Criminal(criminal)
  }
    contentTarget.innerHTML= `
      <h3>Criminals</h3>
      <section class="criminalsList">
      ${criminalsHTMLRepresentations}
      </section>`
}


// Render ALL criminals initally
export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const appStateCriminals = useCriminals()
            render(appStateCriminals)
        })
}