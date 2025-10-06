const http = require('http');
const next = require('next');

const app = next({ dev: false, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log('> Ready on port ' + port);
  });
});