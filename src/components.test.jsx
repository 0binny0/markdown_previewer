
import {test, expect} from "vitest";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {markdown_converter} from "./helpers.js";
import {MarkdownPreviewer, Editor, Previewer, Window} from "./components.jsx";

test("Verify that markdown is set to git flavored markdown", () => {
    expect(markdown_converter.defaults.breaks).toBe(true);
    expect(markdown_converter.defaults.gfm).toBe(true);
});

test("Verify that a <code> element contains a class name to signify a code block", () => {
    const html = markdown_converter.parse("    let x = 0;");
    expect(html).toMatch(/class="codeblock"/);
});

test("Verify that a user can edit markdown", () => {
    const {queryByRole} = render(<Editor />);
    const textarea = queryByRole("textbox");
    expect(textarea).toBeInTheDocument();
});

test("Verify that a section of the page is reserved to view rendered HTML", () => {
    const {getByRole} = render(<Previewer />);
    const html_previewer = getByRole("status");
    expect(html_previewer).toBeInTheDocument();
});

test("Verify that markdown is converted to HTML", async () => {
    const main_element = document.createElement("main");
    const {getByRole} = render(
        <MarkdownPreviewer />, {container: document.body.appendChild(main_element)}
    );
    await userEvent.type(getByRole("textbox"), "    hello world");
    const markdown_editor = getByRole("textbox");
    const html_previewer = getByRole("status");
    expect(markdown_editor).toHaveValue("    hello world");
    expect(html_previewer).toHaveTextContent("hello world");
});

test("Verify that a heading is displayed for a Window", () => {
    const main_element = document.createElement("main");
    const {getByText, getByRole} = render(
        <Window name="Editor"><Editor /></Window>, {container: document.body.appendChild(main_element)}
    );
    const window_heading = getByRole("heading", {"level": 2});
    expect(window_heading).toHaveTextContent("Editor");
    const markdown_editor = getByRole("textbox");
    expect(markdown_editor).toHaveAttribute("id", "editor");
});