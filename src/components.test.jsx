
import {test, expect} from "vitest";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {initialize_markdown} from "./helpers.js";
import {MarkdownPreviewer, Editor, Previewer} from "./components.jsx";

test("Verify that markdown is set to git flavored markdown", () => {
    const markdown = initialize_markdown();
    expect(markdown.defaults.breaks).toBe(true);
    expect(markdown.defaults.gfm).toBe(true);
});

test("Verify that a user can edit markdown", () => {
    const {queryByRole} = render(<Editor />);
    const textarea = queryByRole("textbox");
    expect(textarea).toBeInTheDocument();
});

test("Verify that a section of the page is reserved to view rendered HTML", () => {
    const {getByRole} = render(<Previewer />);
    const html_previewer = getByRole("region", {"name": "markdown converted to HTML"});
    expect(html_previewer).toBeInTheDocument();
});

// test("Verify that markdown is converted to HTML", () => {
//     const main_element = document.createElement("main");
//     const {getByRole} = render(
//         <MarkdownPreviewer />, {container: document.body.appendChild(main_element)}
//     );
//     userEvent.type(getByRole("textbox", "# hello world"));
//     const html_previewer = getByRole("region", {"name": "Converted HTML"});
//     expect(html_previewer).toContainElement("<h1>hello world</h1>");
//
// });