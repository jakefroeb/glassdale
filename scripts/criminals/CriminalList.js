import { getCriminals, useCriminals} from "./CriminalProvider.js"
import { Criminal} from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { Alibi } from "../alibis/Alibi.js"
import { getWitnesses, useWitnesses } from "../witnesses/WitnessProvider.js"
import { WitnessHTMLConverter } from "../witnesses/Witness.js"


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")
const alibiTarget = document.querySelector(".alibiContainer")

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

eventHub.addEventListener("showWitnessesClicked", event =>{
    WitnessList()
})

const renderWitnesses = (witnesses) =>{
  let witnessHTMLRepresentation = ""
  for(const witness of witnesses){
    witnessHTMLRepresentation += WitnessHTMLConverter(witness)
  }
  contentTarget.innerHTML= `
      <h3>Witnesses</h3>
      <section class="witnessList">
      ${witnessHTMLRepresentation}
      </section>`
  
}

const WitnessList = () => {
  getWitnesses()
      .then(() => {
          const allWitnesses = useWitnesses()
          renderWitnesses(allWitnesses)
      })
}

eventHub.addEventListener("officerSelected", event => {
  // How can you access the officer name that was selected by the user?
  const officerName = event.detail.officer

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

eventHub.addEventListener("alibiChosen", event => {
  debugger
  const criminals = useCriminals()
  const criminal = criminals[event.detail.alibiThatWasChosen-1]
  const alibis = criminal.known_associates
  let alibiHTMLRepresentation = ""
  for(const alibi of alibis){
    alibiHTMLRepresentation += Alibi(alibi)
  }
  alibiTarget.innerHTML = `
    <h3>${criminal.name} Alibis</h3>
    ${alibiHTMLRepresentation}`
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