

let criminals = []

export const useCriminals = () => {
    return criminals.slice()
}

export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                criminals = parsedCriminals
            }
        )

    // const response = await fetch("https://criminals.glassdale.us/criminals")
    // const parsedCriminals = await response.json()
    // criminals = parsedCriminals
}