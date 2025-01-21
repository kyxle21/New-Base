const fs = require('fs')
const chalk = require('chalk')

//Settings
global.owner = "6287881504863"
global.namabot = "Base"

/*
global.img = fs.readFileSync('./tempat/gambar/anda.jpg')
global.aud = fs.readFileSync('./tempat/audio/anda.mp3')
*/


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})