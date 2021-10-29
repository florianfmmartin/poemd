# This is a test poem

Roses are red
Violets are blue
There is x "are" in this poem

```js

poem.__state__ = {
    are_count: 0
}

poem.are = ({tokens, position, state}) => {
    return {
        tokens,
        position: position + 1,
        state: {
            ...state,
            are_count: state.are_count + 1
        }
    }
}

poem.x = ({tokens, position, state}) => {
    let new_tokens = tokens
    new_tokens[position] = state.are_count.toString()

    return {
        tokens: new_tokens,
        position: position + 1,
        state
    }
}

```


---

Roses are red 
Violets are blue 
There is 2 "are" in this poem