
import {test, expect} from "vitest";

import {initialize_markdown} from "./helpers.js";

test("Verify that markdown is set to git flavored markdown", () => {
    const markdown = initialize_markdown();
    expect(markdown.defaults.breaks).toBe(true);
    expect(markdown.defaults.gfm).toBe(true);
});