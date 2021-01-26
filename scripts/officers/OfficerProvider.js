let officers = []

export const useOfficers = () => {
    return officers.slice()
}

export const getOfficers = async () => {
    const response = await fetch("https://criminals.glassdale.us/officers")
    const parsedOfficers = await response.json()
    console.table(parsedOfficers)
    officers = parsedOfficers
}
