/*
Base By: Lezz DcodeR
Recode By: Your Name

Sosmed Creator Base:
- Tiktok Creator: https://tiktok.com/@lezzzcoder
- Github Creator: https://github.com/kyxle21
- YouTube Creator: https://youtube.com/@lezzdcoder

Semua Orang Bisa Menggunakan Base Ini,Tapi Tolong Jangan Pernah Hapus Credit Di Atas, Hargai Bang, Belajar Untuk Menghargai Seseorang Agar Kamu Juga Di Hargai ^_^ ( Dont Delete This Text )

Made With :♥️
*/

require("./settings")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const chalk = require('chalk')
const crypto = require('crypto')
const { exec } = require("child_process")
module.exports = async (ade, m, store) => {
try {
const from = m.key.remoteJid
const { 
  WA_DEFAULT_EPHEMERAL,
  getAggregateVotesInPollMessage,
  generateWAMessageFromContent,
  proto, 
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType
  } = require("baileys")
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : ''
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const mime = (quoted.msg || quoted).mimetype || ''
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const botNumber = await ade.decodeJid(ade.user.id)
const sender = m.key.fromMe ? (ade.user.id.split(':')[0]+'@s.whatsapp.net' || ade.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const OnlyDev = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;

const groupMetadata = isGroup ? await ade.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = isGroup ? groupMetadata.owner : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false

const prem = JSON.parse(fs.readFileSync("./database/premium.json"))
const OnlyPrem = prem.includes(m.sender)

//Fake Quoted
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}

const qbug = {key: {remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net'}, message: {listResponseMessage: {title: `Powered By Lezz`
}}}

const qdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: 'Powered By Lezz',jpegThumbnail: ""}}}

const qloc = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Powered By Lezz`,jpegThumbnail: ""}}}

const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Powered By Lezz`,jpegThumbnail: ""}}}

const qpayment = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Simple Bot"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}

const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `Lezz - Marketplace`, "description": null, "currencyCode": "IDR", "priceAmount1000": "999999999999999", "retailerId": `Powered By Lezz`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `Simple Bot By Lezz`,jpegThumbnail: ""}}}

// Random Image
const imageUrls = [
        "https://i.ibb.co/m944LxT/image.jpg",
        "https://i.ibb.co/mHSbM3d/image.jpg",
        "https://files.catbox.moe/g4ae8u.jpg",
        "https://files.catbox.moe/9vp33w.jpg",
        "https://files.catbox.moe/6s1c3e.jpg"
    ];
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
// Reply
const replyz = (teks) => {
    return ade.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'IDR',
            amount1000: 1000000,
            requestFrom: m.sender,
            noteMessage: {
                extendedTextMessage: {
                    text: teks,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                        }
                    }
                }
            }
        }
    }, {})
}

//Function Spam Call
async function sendOfferCall(X) {
    try {
        await ade.offerCall(X);
        console.log(chalk.white.bold(`Success Send Offer Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer Call To Target:`, error));
    }
}

async function sendOfferVideoCall(X) {
    try {
        await ade.offerCall(X, {
            video: true
        });
        console.log(chalk.white.bold(`Success Send Offer Video Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer Video Call To Target:`, error));
    }
}

// Tampilan Di Console
if (m.message) {
console.log(
    chalk.inverse(' 📬  [ Message ] ') + 
    ' ' + 
    chalk.black.bgGreen(new Date().toLocaleString()) + 
    ' ' + 
    chalk.black.bgBlue(budy || m.mtype) + '\n' +
    chalk.magenta('📣 Dari: ') + chalk.green(pushname) + ' ' + chalk.yellow(`(${m.sender})`) + '\n' +
    chalk.bgMagenta('📍 Di: ') + chalk.green(m.isGroup ? 'Grup' : 'Private Chat') + ' ' + chalk.green(from) + 
    '\n' + chalk.greenBright('✧──────── Base Bot By Lezz DcodeR ─────────✧')
   );
 }
// Gak Usah Di Apa Apain Jika Tidak Mau Error
let ppuser
try {
ppuser = await ade.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/2lw5hm.jpg'
}

switch (command) {
case 'menu': 
let kyxle = `ISI MENU ANDA`
 ade.sendMessage(m.chat, {
    video: {
        url: 'https://files.catbox.moe/9eg18t.mp4'
    },
    caption: kyxle,
    gifPlayback: true,
    gifAttribution: 1,
    contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
            showAdAttribution: true,
            title: 'Base Bot WhatsApp',
            body: 'Simple Bot WhatsApp Using Javascript.',
            thumbnailUrl: null,
            sourceUrl: 'https://github.com/kyxle21',
            mediaType: 1,
            renderLargerThumbnail: true
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0@newsletter',
            newsletterName: 'Powered By Lezz DcodeR',
            serverMessageId: -1
        }
    }
}, { quoted: qloc });
break

case 'self': {
    if (!OnlyDev) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam 
    ade.public = false
    m.reply(`Dingin Tetapi Tidak Kejam`)
}
break

case 'public': {
    if (!OnlyDev) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    ade.public = true
    m.reply(`Mode Sigma Aktif`)
}
break

case "addprem": {
    if (!OnlyDev) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62895428251533`)
    prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    let ceknya = await ade.onWhatsApp(prrkek) // Mengecek Apkah Nomor ${prrkek} Terdaftar Di WhatsApp 
    if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
    prem.push(prrkek)
    fs.writeFileSync("./database/premium.json", JSON.stringify(prem))
    m.reply(`Successfully Added ${prrkek} To Database`)
}
break

case "delprem": {
    if (!OnlyDev) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62895428251533`)
    ya = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    unp = prem.indexOf(ya)
    prem.splice(unp, 1)
    fs.writeFileSync("./database/premium.json", JSON.stringify(prem))
    reply(`Successfully Removed ${ya} From Database`)
}
break

case 'spamcall': {
    if (!OnlyDev) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    if (!text) return m.reply(`Example: ${prefix + command} 628xxx,amount`)
    let vii = text.split(",")
    if (vii.length < 2) return m.reply(`Example: ${prefix + command} 628xxx,amount`)
    let X = vii[0]
    let amount = vii[1]
    target = X + "@s.whatsapp.net"
    for (let i = 0; i < amount; i++) {
        await sendOfferCall(target)
        await new Promise(resolve => setTimeout(resolve, 3000)) // Delay 3 detik, Setting Sesuai Selera Lu Aja
    }
}
break
//End Case
default:
if (budy.startsWith('=>')) {
    if (!OnlyDev) return

    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}

if (budy.startsWith('>')) {
    if (!OnlyDev) return;
    try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        m.reply(String(err));
    }
}

if (budy.startsWith('$')) {
    if (!OnlyDev) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}

}
} catch (err) {
    console.log(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
