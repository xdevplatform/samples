/**
 * Webhook Server (CRC + Event Delivery) - X API v2
 *
 * Docs: https://docs.x.com/x-api/webhooks/introduction
 * Required env vars: CONSUMER_SECRET
 */

const http = require('http');
const crypto = require('crypto');

const consumerSecret = process.env.CONSUMER_SECRET;
if (!consumerSecret) {
  throw new Error('CONSUMER_SECRET environment variable is not set');
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost:8080'}`);
  if (url.pathname !== '/webhooks') {
    res.writeHead(404);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    const crcToken = url.searchParams.get('crc_token');
    if (!crcToken) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No crc_token' }));
      return;
    }
    const digest = crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ response_token: `sha256=${digest}` }));
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        console.dir(JSON.parse(body), { depth: null });
      } catch {
        console.log(body);
      }
      res.writeHead(200);
      res.end();
    });
  } else {
    res.writeHead(405);
    res.end();
  }
});

server.listen(8080, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:8080/webhooks');
});
