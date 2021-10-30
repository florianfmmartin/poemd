# Bugs in my code

9 little bugs in the code

```js

poem.__state__ = {}

poem["bugs"] = ({tokens, position, state}) => {
    const number_of_bugs = Number(tokens[position - 2])

    if (number_of_bugs == 1) {
        const new_tokens = ["\n",
                            number_of_bugs.toString(), ..."little bugs \n".split(" "),
                            ..."Take one down \n".split(),
                            ..."Patch it around \n".split(),
                            ..."No more bugs in the code !".split(" ")]
        const new_position = position + 9000

        return {
            tokens: [...tokens, ...new_tokens],
            position: new_position,
            state: state
        }
    } else {
        const new_tokens = ["\n",
                            number_of_bugs.toString(), ..."little bugs \n".split(" "),
                            ..."Take one down \n".split(),
                            ..."Patch it around \n".split(),
                            (number_of_bugs - 1).toString(), ..."little bugs in the code".split(" ")]
        const new_position = position + 8 // not sure about the number but (:

        return {
            tokens: [...tokens, ...new_tokens],
            position: new_position,
            state: state
        }
    }
}

```

