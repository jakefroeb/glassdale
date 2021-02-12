import { useCriminals } from "../criminals/CriminalProvider.js";
import { useCriminalFacilities } from "./CriminalFacilityProvider.js";
import { useFacilities } from "./FacilityProvider.js";
import { Facility} from "./Facility.js"

const contentTarget = document.querySelector(".facilityContainer")
const eventHub = document.querySelector(".container")

export const facilityList = () =>{
    const facilities = useFacilities()
    const criminalFacilities = useCriminalFacilities()
    const criminals = useCriminals()
    const facilityCriminalMatch = facilities.map(facilty =>{
        const criminalRelationshipToThisFacility = criminalFacilities.filter(cf => cf.facilityId === facilty.id)
        const criminalsInFacility = criminalRelationshipToThisFacility.map(cf => {
            return criminals.find(criminal => cf.criminalId === criminal.id)         
        }
        )
        return Facility(criminalsInFacility, facilty)
    })
    contentTarget.innerHTML = facilityCriminalMatch
}
eventHub.addEventListener("faciliesButtonClicked", event =>{
    facilityList()
})