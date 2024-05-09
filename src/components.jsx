
import {useRef, forwardRef, useEffect} from "react";

import {markdown_converter} from './helpers.js';

const markdown_component_windows = document.getElementsByClassName("window_wrapper");

const Previewer = forwardRef(function Previewer(props, ref) {
    return <>
        <output for="editor" ref={ref} className="box"></output>
    </>
});

const Editor = forwardRef(function Editor(props, ref) {

    function handleTextareaSizeChange(e) {
        const current_textarea_size = e.currentTarget.height;
        const editor_window = document.getElementsByClassName("window_wrapper")[1];
    }

    return <>
        <form>
            <textarea ref={ref} id="editor" className="box" onChange={props.onTyping}></textarea>
        </form>
    </>
});

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
    const markdown_editor_ref = useRef(null);

    useEffect(() => {
        const resizer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                markdown_component_windows[1].style.height = `${entry.contentRect.height + 75}px`;
            })
        });
        resizer.observe(markdown_editor_ref.current);
    }, []);

    useEffect(
      () => {
          window.addEventListener("resize", function(e) {
          const box_height = (this.innerHeight / 2) - 20;
          const box_margin = box_height - (box_height - 10);
          console.log(box_height);
          [...markdown_component_windows, markdown_editor_ref.current].forEach((box, i) => {
              if (box.id === "editor") {
                  box.style.height = `${box_height - 70}px`;
              } else {
                  box.style.height = `${box_height}px`;
              }

              if (i < 2) {
                  box.style.margin = `${box_margin}px auto`;
                  box.style.border = "1px solid";
                // box.classList.add("window_margin");
            }
          })
        })
      }, []
  )

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
            <Editor ref={markdown_editor_ref} onTyping={handleMarkdownInput} />
        </Window>
    </main>
}

export {MarkdownPreviewer, Editor, Previewer, Window};