# macos-node-colour-selector
Exposes the macOS colour selector in a easy to use Promise-based Node API.
```js
const colourSelector = require("macos-node-colour-selector")

// You can also set the defaults for the R, G, B values by passing them as args. The default is 255, 255, 255.
colourSelector().then(colours => {
    console.log(`R: ${colours[0]}`)
    console.log(`G: ${colours[1]}`)
    console.log(`B: ${colours[2]}`)
})
```
