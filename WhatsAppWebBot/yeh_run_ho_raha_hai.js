const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');

client.on('qr', (qr) => {
    // console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        console.log(chats[0]);
        client.sendMessage(chats[0].id._serialized,"heyy bitch");
    });
});
client.on('message', message => {
	if(message.body === 'Hi') {
		message.reply('pong');
	}
});

client.initialize();