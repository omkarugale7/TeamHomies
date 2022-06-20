const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');

client.on('qr', (qr) => {
    // console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        const myGroup = chats.find(
            (chat) => chat.name === "Abhijit Puri"
        );
        client.archiveChat(
            myGroup.id._serialized);
        // console.log(chats[0]);
        // client.sendMessage(chats[0].id._serialized,"heyy bitch");
    });
});
client.on('message', message => {
    if (message.body === 'Hi omkar') {
        message.reply('sir is busy and till then I his assistant Sarla will assist you');
    }
    else if (message.body === 'i am nilay') {
        message.reply('ohh hi im Sarla and yes fuck off');
    }
    else if (message.body === 'i am shree') {
        message.reply('hi Shree leave Sarla and chat arya');
    }
    else if (message.body === 'i am gopal') {
        message.reply('hi lod bless Sarla');
    }
    else if (message.body === 'i am tanaya') {
        message.reply('ok');
    }
    else if (message.body === 'i am akshata') {
        message.reply('Hi Akshu , sarla is delighted to meet you');
    }
    else if (message.body === 'i am vishal') {
        message.reply('Hi vishal , y r u so dam saxy');
    }
    else if (message.body === 'i am mandar') {
        message.reply('heyy heeyyyy handsome , sarla wants to meet you soon');
    }
    else if (message.body === 'i am sagar') {
        message.reply('Hi sagar please speak fast kal subah panvel nikalna hai');
    }
    else if (message.body === 'i am sahil') {
        message.reply('Hi Sahil , Sarla is looking for someone placed in google ;)');
    }
    else if (message.body === 'i am mrunal') {
        message.reply('Hi Mrunal , Sarla is jealous of someone more beautiful than her');
    }
    else if (message.body === 'i am sharvari') {
        message.reply('abhyas kr ali mothi try kryla');
    }

});

client.initialize();