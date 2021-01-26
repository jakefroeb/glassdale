export const criminal = (criminal) =>{
    return `
        <section class="criminal__card">
            <h2 class="criminal__name">${criminal.name}</h2>
            <div class="criminal__age">${criminal.age}</div>
            <div class="criminal__conviction">${criminal.conviction}</div>
            <div class="criminal__startDate">${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminal__endDate">${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</div>
        </section>
    `

}