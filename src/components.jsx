
import {useRef, useState, forwardRef, useEffect, useLayoutEffect} from "react";

import {markdown_converter} from './helpers.js';
import {initial_markdown} from "./markdown.js";

const markdown_component_windows = document.getElementsByClassName("window_wrapper");

function Previewer(props) {
    function render_html() {
        return {
            __html: markdown_converter.parse(props.markdown)
        }
    }

    return <>
        <output for="editor" className="box scroll_content" dangerouslySetInnerHTML={render_html()}></output>
    </>
};

const Editor = forwardRef(function Editor(props, ref) {

    return <>
        <form>
            <textarea ref={ref} id="editor" className="box editor_box" onInput={props.onTyping}></textarea>
        </form>
    </>
});

function Window({children, name}) {
    return <section className="window_wrapper" id="">
        <div className="heading_wrapper">
            <h2 className={"window_title"}>{name}</h2>
            {/* icon widget goes here */}
        </div>
        {children}
    </section>

}

function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(``);
    const markdown_editor_ref = useRef(null);

    useEffect(
        () => {
            markdown_editor_ref.current.innerHTML = initial_markdown;
            setMarkdown(initial_markdown);
        }, []
    );

    function resize_markdown_windows(){
          // sets the proportional height of the html previewer and markdown editor
          const box_height = ((window.innerHeight / 2) - 22.5);
          const box_margin = box_height - (box_height - 5);
          console.log([...markdown_component_windows, markdown_editor_ref.current]);
          [...markdown_component_windows, markdown_editor_ref.current].forEach((box, i) => {
              if (i === 0 || i === 2) {
                  box.style.height = `${box_height}px`;
              }
              if (i < 2) {
                  box.style.margin = `${box_margin}px 0 ${box_margin} 0`;
              }
          })
        }

    useLayoutEffect(resize_markdown_windows, []);


    function handleMarkdownInput(e) {
        console.log(e.currentTarget.value);
        setMarkdown(e.currentTarget.value);
    }

    return <main className="main_content">
        <Window name={"Previewer"}>
            <Previewer markdown={markdown} />
        </Window>
        <Window name={"Editor"}>
            <Editor ref={markdown_editor_ref} onTyping={handleMarkdownInput} />
        </Window>
    </main>
}

export {MarkdownPreviewer, Editor, Previewer, Window};