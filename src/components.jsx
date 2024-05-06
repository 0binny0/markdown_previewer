
import {useRef, forwardRef} from "react";

import {markdown_converter} from './helpers.js';

const Previewer = forwardRef(function Previewer(props, ref) {
    return <>
        <output for="editor" contentEditable="true" ref={ref} className="box"></output>
    </>
});

function Editor(props) {
    return <>
        <form>
            <textarea id="editor" className="box" onChange={props.onTyping}></textarea>
        </form>
    </>
}

function Window({children, name}) {
    return <section className="window_wrapper">
        <div className="heading_wrapper">
            <h2>{name}</h2>
            {/* icon widget goes here */}
        </div>
        {children}
    </section>

}

function MarkdownPreviewer() {

    const html_render_ref = useRef(null);

    function handleMarkdownInput(e) {
        html_render_ref.current.innerHTML = markdown_converter.parse(
            e.currentTarget.value
        );
    }

    return <main className="main_content">
        <Window name={"Previewer"}>
            <Previewer ref={html_render_ref} />
        </Window>
        <Window name={"Editor"}>
            <Editor onTyping={handleMarkdownInput} />
        </Window>
    </main>
}

export {MarkdownPreviewer, Editor, Previewer, Window};