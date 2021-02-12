export const Facility = (criminals, facility) => {

    
    return `
        <section class="facility__card">
            <div class="facility__name">${facility.facilityName}</div>
            <div class="facility__security">${facility.securityLevel}</div>
            <div class="facility__capacity">${facility.capacity}</div>
            <div>
                <h2>Criminals</h2>
                <ul>
                    ${criminals.map(criminal => `<li>${criminal.name}</li>`).join("")}
                </ul>
            </div>

        </section>
    `
}