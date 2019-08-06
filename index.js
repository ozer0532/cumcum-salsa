// Dependencies
const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config.js').line;

const menuFunction = require('./menufunction.js');      // Gunakan task
const clientPushMessage = require('./clientpushmessage.js');
const pesan = require('./pesan.js');
const randomize = require('./randomizer.js');
const database = require('./database.js');
const task6 = require('./task6.js');

const replyAPI = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});
const pushAPI = LineClient.connect({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});

// Main Process
const MainHandler = new LineHandler()
  .onEvent(context => {
    await context.sendText('Hello World');
  })


// Connection Handling
replyAPI.onEvent(MainHandler);

const server = createServer(replyAPI);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
