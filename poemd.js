const fs = require("fs")

const argv = process.argv
const output = argv[2]
const poem_fn = argv[3]

if (! (output == "-o" || output == "-w")) {
    console.error(`Output is not \"-o\" or \"-w\", but ${output}`)
    process.exit(1)
}

fs.readFile(poem_fn, "utf8", (err, data) => {
    if (err) {
        quit_with_error(err)
    } else {
        main(data, poem_fn, output)
    }
})

const quit_with_error = (err) => {
    console.error(err)
    process.exit(1)
}

const main = (md, fn, output) => {
    let poem = {}

    const {text, script} = parse(md)

    try {
        eval(script)
    } catch (err) {
        quit_with_error(err)
    }

    poem.__tokens__ = tokenize(text)

    const new_text = run_poem(poem)

    if (output == "-o") {
        console.log(new_text)
    } else if (output == "-w") {
        const new_md = md + "\n---\n\n" + new_text

        fs.writeFile(fn, new_md, (err) => {
            if (err) {
                quit_with_error(err)
            }
        })
    }
}

const parse = (text) => {
    const text_lines = text.split("\n").filter(line => line != "").filter(line => line[0] != "#")
    const script_start = text_lines.findIndex(line => line == "```js")
    const script_end = text_lines.findIndex(line => line == "```")

    if (script_start == -1 || script_end == -1) {
        console.error("No script delimited by \" ```js \" and \" ``` \"")
        process.exit(1)
    }

    return {
        text: text_lines.slice(0, script_start).join("\n"),
        script: text_lines.slice(script_start + 1, script_end).join("\n")
    }
}

const tokenize = (text) => {
    return [...text.matchAll(/\S+|\n/g)].map(v => v[0])
}

const run_poem = (poem) => {
    poem.__position__ = 0

    const keys = Object.keys(poem)

    while (poem.__position__ < poem.__tokens__.length) {
        const word = poem.__tokens__[poem.__position__]

        if (keys.includes(word)) {
            const result = poem[word]({ tokens: poem.__tokens__, position: poem.__position__, state: poem.__state__ })

            poem.__tokens__ = result.tokens
            poem.__position__ = result.position
            poem.__state__ = result.state
        } else {
            poem.__position__++
        }
    }

    const text = poem.__tokens__.join(" ").replace(/\n /g, "\n")

    return text
}

