/**
 * Servidor HTTP Nativo para o Pluga Flow
 * Subdomínio de Produção: pluga.xpanel.com.br
 * Porta padrão: 3000 (ou variável de ambiente PORT)
 */

const http = require('http');
const https = require('https');
const dns = require('dns');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // ========================================================
  // API: Consulta de Disponibilidade de Domínio Próprio
  // ========================================================
  if (parsedUrl.pathname === '/api/check-domain') {
    const rawDomain = (parsedUrl.query.domain || '').toString().toLowerCase().trim();
    const cleanDomain = rawDomain.replace(/[^a-z0-9\.\-]/g, '');

    if (!cleanDomain || !cleanDomain.includes('.')) {
      res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: 'Domínio inválido. Ex: sualoja.com.br' }));
      return;
    }

    // Se for .br -> consulta oficial no RDAP do Registro.br
    if (cleanDomain.endsWith('.br')) {
      const rdapReq = https.get(`https://rdap.registro.br/domain/${cleanDomain}`, {
        headers: { 'User-Agent': 'PlugaFlow-DomainChecker/1.0' },
        timeout: 4000
      }, (rdapRes) => {
        const isAvailable = rdapRes.statusCode === 404;
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({
          domain: cleanDomain,
          available: isAvailable,
          source: 'registro.br'
        }));
      });

      rdapReq.on('error', () => {
        // Fallback via DNS local
        dns.resolve(cleanDomain, (err) => {
          const available = !!(err && err.code === 'ENOTFOUND');
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ domain: cleanDomain, available, source: 'dns-fallback' }));
        });
      });
      return;
    }

    // Se for outro TLD (.com, .net, etc.) -> consulta via resolução DNS
    dns.resolve(cleanDomain, (err) => {
      const available = !!(err && err.code === 'ENOTFOUND');
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ domain: cleanDomain, available, source: 'dns' }));
    });
    return;
  }

  // Normaliza o caminho para arquivos estáticos
  let safePath = path.normalize(decodeURI(parsedUrl.pathname));
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  // Evita Directory Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 - Acesso Negado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback para index.html se for SPA ou 404
      const notFoundPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(notFoundPath, (err404, content404) => {
        if (!err404) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content404);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - Arquivo não encontrado');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Headers de cache
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    };

    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400'; // 1 dia de cache para assets
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Pluga Flow Landing Page no ar!`);
  console.log(`📍 URL Local:        http://localhost:${PORT}`);
  console.log(`🌐 Subdomínio Alvo:  https://pluga.xpanel.com.br`);
  console.log(`📁 Diretório Raiz:   ${PUBLIC_DIR}`);
  console.log(`====================================================`);
});
