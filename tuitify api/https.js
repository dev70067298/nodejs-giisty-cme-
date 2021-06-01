const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/fbtnodeapi.tuitify.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/fbtnodeapi.tuitify.com/fullchain.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(3000);

