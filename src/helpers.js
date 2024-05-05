
import {Marked} from "marked";

function initialize_markdown() {
    return new Marked({breaks: true, gfm: true});
}

export {initialize_markdown};