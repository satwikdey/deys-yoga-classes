const fs = require('fs');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
require('dotenv').config();

const PORT = Number(process.env.PORT || 5000);
const BUILD_DIR = path.join(__dirname, 'build');
const MAX_BODY_SIZE = 1024 * 1024;
const MIME_TYPES = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

const jsonResponse = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const parseJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error('Message is too large.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid request body.'));
      }
    });

    req.on('error', reject);
  });
};

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const getTransporter = () => {
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length) {
    throw new Error(`Missing SMTP config: ${missingVars.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const sendContactEmail = async ({ name, email, message }) => {
  const transporter = getTransporter();
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  await transporter.sendMail({
    from: `"Dey Yoga Classes" <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: 'New Yoga Inquiry - Dey Yoga Classes',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Yoga Inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `
  });
};

const handleContactRequest = async (req, res) => {
  if (req.method === 'OPTIONS') {
    jsonResponse(res, 204, {});
    return;
  }

  if (req.method !== 'POST') {
    jsonResponse(res, 405, { success: false, message: 'Method not allowed.' });
    return;
  }

  try {
    const { name = '', email = '', message = '' } = await parseJsonBody(req);
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanMessage = String(message).trim();

    if (!cleanName || !isValidEmail(cleanEmail) || !cleanMessage) {
      jsonResponse(res, 400, {
        success: false,
        message: 'Please enter a valid name, email, and message.'
      });
      return;
    }

    await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage
    });

    jsonResponse(res, 200, {
      success: true,
      message: 'Message sent successfully.'
    });
  } catch (error) {
    console.error('Contact form error:', error.message);
    jsonResponse(res, 500, {
      success: false,
      message: 'Could not send the message right now. Please call or email directly.'
    });
  }
};

const getStaticFilePath = (urlPath) => {
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const requestedPath = safePath === '/' ? '/index.html' : safePath;
  return path.join(BUILD_DIR, requestedPath);
};

const serveStaticFile = (req, res) => {
  if (!fs.existsSync(BUILD_DIR)) {
    jsonResponse(res, 404, {
      success: false,
      message: 'Build folder not found. Run npm run build first.'
    });
    return;
  }

  const filePath = getStaticFilePath(new URL(req.url, `http://${req.headers.host}`).pathname);
  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? filePath
    : path.join(BUILD_DIR, 'index.html');
  const contentType = MIME_TYPES[path.extname(finalPath)] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(finalPath)
    .on('error', () => {
      res.writeHead(500);
      res.end('Unable to load file.');
    })
    .pipe(res);
};

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/api/contact') {
    handleContactRequest(req, res);
    return;
  }

  serveStaticFile(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
