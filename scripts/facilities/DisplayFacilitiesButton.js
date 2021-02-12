const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")

export const ShowFacilityButton = () => {
    contentTarget.innerHTML = "<button id='showFacilities'>Show Facilities</button>"
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showFacilities"){
        const customEvent = new CustomEvent("faciliesButtonClicked")
        eventHub.dispatchEvent(customEvent)
}
  }
  )

