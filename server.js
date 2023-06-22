const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'POST' && pathname === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = querystring.parse(body);
      const text = data['input-box'];
      const url = `second.html?text=${encodeURIComponent(text)}`;
      res.writeHead(302, { 'Location': url });
      res.end();
    });
  } else if (req.method === 'GET' && pathname === '/') {
    fs.readFile('main.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache'
        });
        res.end(data);
      }
    });
  } else if (pathname === '/second.html') {
    const text = query.text;
    fs.readFile('second.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
      } else {
        const html = data.toString().replace('{{text}}', text);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});