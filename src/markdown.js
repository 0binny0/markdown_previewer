
const initial_markdown = `
# Markdown Editor (using Marked.js w/ React)

Documentation on how to use markdown:

* [Github Flavored Markdown]: <https://github.github.com/gfm/#TOC> 
[Github Flavored Markdown]
 
## Code snippets
### Code Block

*A JavaScript function can be used as a **constructor** to create user defined object instances*
* [Constructor Function]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#using_a_constructor_function>
[Constructor Function]

\`\`\`
function Object() {
    //pass
}

let object = new Object();
\`\`\`

### Inline code
*A Javascript function can also be called with an object like this:* \`func.call(obj)\`

* [Function.prototype.call()]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call>
[Function.prototype.call()]

## Lists
### Unordered list
* A
* B
* C

### Ordered list
1) A
2) B
3) C
`;

export {initial_markdown};