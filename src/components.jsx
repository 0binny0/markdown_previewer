
function Previewer() {
    return <>
        <section aria-label="markdown converted to HTML" className="box"></section>
    </>
}

function Editor() {
    return <>
        <form>
            <textarea id="editor" className="box"></textarea>
        </form>
    </>
}

function Window() {

}

function MarkdownPreviewer() {

}

export {MarkdownPreviewer, Editor, Previewer};