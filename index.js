const { spawn } = require("child_process")
const rgbMatch = /[0-9]{1,5}, [0-9]{1,5}, [0-9]{1,5}/
const withinChannelRange = x => typeof x === "number" && x >= 0 && 255 >= x
const platform = require("os").platform()

module.exports = (r = 255, g = 255, b = 255) => {
    if (!withinChannelRange(r) || !withinChannelRange(g) || !withinChannelRange(b)) {
        throw new Error("RGB values are not numbers or not between 0-255.")
    }
    if (platform !== "darwin") {
        throw new Error("This colour picker requires macOS.")
    }
    const sixteenBitR = (r / 255) * 65535
    const sixteenBitG = (g / 255) * 65535
    const sixteenBitB = (b / 255) * 65535
    const child = spawn("osascript", ["-e", `choose color default color {${sixteenBitR}, ${sixteenBitG}, ${sixteenBitB}}`])
    return new Promise((res, rej) => {
        child.on("error", e => rej(e))
        child.stdout.on("data", part => {
            const chunk = part.toString().trim()
            if (chunk.match(rgbMatch)) {
                const parts = chunk.split(",")
                const r = Math.floor((Number(parts[0].trim()) / 65535) * 255)
                const g = Math.floor((Number(parts[1].trim()) / 65535) * 255)
                const b = Math.floor((Number(parts[2].trim()) / 65535) * 255)
                res([r, g, b])
            }
        })
    })
}
