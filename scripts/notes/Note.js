export const NoteHTMLConverter = (noteObject) => {
    return `
        <section class="note">
            <div class="note__text">${ noteObject.text }</div>
            <div class="note__title">Title: ${ noteObject.title }</div>
            <div class="note__date">Date: ${noteObject.date}</div>
        </section>
    `
}