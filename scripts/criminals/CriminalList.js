import { getCriminals, useCriminals} from "./CriminalProvider.js"
import { Criminal} from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { Alibi } from "../alibis/Alibi.js"
import { getWitnesses, useWitnesses } from "../witnesses/WitnessProvider.js"
import { WitnessHTMLConverter } from "../witnesses/Witness.js"
import {getFacilities, useFacilities} from "../facilities/FacilityProvider.js"
import {getCriminalFacilities, useCriminalFacilities} from "../facilities/CriminalFacilityProvider.js"


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
        
        const facilities = useFacilities()
        const crimFac = useCriminalFacilities()
        render(matchingCriminals, facilities, crimFac)
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
  const facilities = useFacilities()
  const crimFac = useCriminalFacilities()
  render(filteredCriminals, facilities, crimFac);
})

eventHub.addEventListener("alibiChosen", event => {
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

const render = (criminalsToRender, allFacilities, allRelationships) => {
  // Step 1 - Iterate all criminals
  contentTarget.innerHTML = criminalsToRender.map(
      (criminalObject) => {
          // Step 2 - Filter all relationships to get only ones for this criminal
          const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

          // Step 3 - Convert the relationships to facilities with map()
          const facilities = facilityRelationshipsForThisCriminal.map(cf => {
              const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
              return matchingFacilityObject
          })

          // Must pass the matching facilities to the Criminal component
          return Criminal(criminalObject, facilities)
      }
  ).join("")
}

// Render ALL criminals initally
export const CriminalList = () => {
  // Kick off the fetching of both collections of data
  getCriminals()
      .then(getFacilities)
      .then(getCriminalFacilities)
      .then(
          () => {
              // Pull in the data now that it has been fetched
              const facilities = useFacilities()
              const crimFac = useCriminalFacilities()
              const criminals = useCriminals()

              // Pass all three collections of data to render()
              render(criminals, facilities, crimFac)
          }
      )
}