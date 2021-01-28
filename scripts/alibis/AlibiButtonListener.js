const eventHub = document.querySelector(".container")
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("associates--")){
        const customEvent = new CustomEvent("alibiChosen", {
            detail: {
                alibiThatWasChosen: clickEvent.target.value
            }
        })
        eventHub.dispatchEvent(customEvent)
}
  }
  
  )