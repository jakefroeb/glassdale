import { getCriminals, useCriminals } from "./CriminalProvider.js"
import {criminal} from "./Criminal.js"

export const CriminalList = () => {

    getCriminals()
      .then(() => {
        const criminalArray = useCriminals()
    
        let criminalsHTMLRepresentations = ""
  
        for (const criminalObj of criminalArray) {
  
          criminalsHTMLRepresentations += criminal(criminalObj)
        }
          document.querySelector(".criminalsContainer").innerHTML = criminalsHTMLRepresentations
         
          
    
  })
}