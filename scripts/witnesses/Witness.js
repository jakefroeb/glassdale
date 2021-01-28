export const WitnessHTMLConverter = (witnessObject) => {
    return `
        <section class="witness">
            <div class="witness__name">${ witnessObject.name }</div>
            <div class="witness__statement">Title: ${ witnessObject.statements }</div>
        </section>
    `
}