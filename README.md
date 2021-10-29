# poemd

Self-generative poem engine 

## How to use it

1. Write a markdown file, for example `my_poem.md`
1. Lines starting with \`#\` are ignored
1. All lines before \`\`\`js are considered to be the poem
1. All lines in the js code block are the script part
1. You must define a state with `poem.__state__ = {}`
1. You may define multiple functions to act on your poems as such:
    - Assign lambdas to `poem.valid_identifier` or `poem["a_non_spaced_string"]`
    - They must accept an object with these keys: `tokens`, `position` and `state`
    - They must return an object with these same keys
1. All code in script is evaluated with `eval()` and so must be valid js
1. Run the script with `node poemd.js [-o|-w] my_poem.md`:
    - `-o` outputs the resulting poem
    - `-w` writes the resulting poem to the markdown file at the bottom of it

