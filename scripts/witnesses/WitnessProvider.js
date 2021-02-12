let witnesses = []

export const useWitnesses = () => {
    return witnesses.slice()
}

export const getWitnesses = async () => {
    const response = await fetch("https://criminals.glassdale.us/witnesses")
    const parsedWitnesses = await response.json()
    witnesses = parsedWitnesses
}
