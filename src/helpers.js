
import {Marked, marked} from "marked";

const renderer = new marked.Renderer();
renderer.code = function(code, infostring, escaped) {
    return `<pre><code class="codeblock">${code}</code></pre>`;
}

function initialize_markdown() {
    return new Marked({breaks: true, gfm: true, renderer: renderer});
}

const markdown_converter = initialize_markdown();

export {markdown_converter};