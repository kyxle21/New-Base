/*
🗣️: Kenapa Rapi Banget Bang?
🗣️: Gw Pake Fitur Dari Mt Manager Yahh, Jadi Jangan Bilang Ini Pake Chat Gepeteh

*/

const {
    default: makeWASocket,
    DisconnectReason,
    makeInMemoryStore,
    jidDecode,
    proto,
    getContentType,
    useMultiFileAuthState,
    downloadContentFromMessage
} = require("baileys");
const pino = require('pino');
const {
    Boom
} = require('@hapi/boom');
const chalk = require('chalk');
const fs = require('fs');
const readline = require("readline");
const PhoneNumber = require('awesome-phonenumber');

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};
//
async function startBotz() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("session")
    const ade = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    //
    if (!ade.authState.creds.registered) {
        const phoneNumber = await question('Enter Your Number Start With Your Country Code:\n');
        let code = await ade.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(`CODE PAIRING :`, code);
    }
    store.bind(ade.ev)

    ade.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!ade.public && mek.key.remoteJid !== global.owner + "@s.whatsapp.net" && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(ade, mek, store)
            require("./case")(ade, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

    // Setting
    ade.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    ade.getName = (jid, withoutContact = false) => {
        id = ade.decodeJid(jid)
        withoutContact = ade.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = ade.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === ade.decodeJid(ade.user.id) ?
            ade.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    //
    ade.public = true

    ade.serializeM = (m) => smsg(ade, m, store);
    ade.ev.on('connection.update', (update) => {
        const {
            connection,
            lastDisconnect
        } = update;
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.restartRequired || reason === DisconnectReason.timedOut) {
                startBotz();
            } else if (reason === DisconnectReason.loggedOut) {} else {
                ade.end(`Unknown DisconnectReason: ${reason}|${connection}`);
            }
        } else if (connection === 'open') {

            console.log('Successfully Connected To Server' + JSON.stringify(ade.user.id, null, 2));
        }
    });
    //
    ade.ev.on('creds.update', saveCreds)

    ade.sendText = (jid, text, quoted = '', options) => ade.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted
    })

    ade.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    return ade
}
//
startBotz()

function smsg(ade, m, store) {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = ade.decodeJid(m.fromMe && ade.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = ade.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted)
                m.quoted = m.quoted[type]
            }
            if (typeof m.quoted === 'string') m.quoted = {
                text: m.quoted
            }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
            m.quoted.sender = ade.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === ade.decodeJid(ade.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false
                let q = await store.loadMessage(m.chat, m.quoted.id, conn)
                return exports.smsg(conn, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? {
                    participant: m.quoted.sender
                } : {})
            })
            m.quoted.delete = () => ade.sendMessage(m.quoted.chat, {
                delete: vM.key
            })
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => ade.copyNForward(jid, vM, forceForward, options)
            m.quoted.download = () => ade.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg.url) m.download = () => ade.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? ade.sendMedia(chatId, text, 'file', '', m, {
        ...options
    }) : ade.sendText(chatId, text, m, {
        ...options
    })
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => ade.copyNForward(jid, m, forceForward, options)

    return m
}

//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})