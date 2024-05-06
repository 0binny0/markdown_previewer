
import {Marked} from "marked";

function initialize_markdown() {
    return new Marked({breaks: true, gfm: true});
}

const markdown_converter = initialize_markdown()

export {markdown_converter};