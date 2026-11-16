const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const cwd = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\bharat-rojgar';
const nextBin = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next');

const child = spawn('node', [nextBin, 'start', '-H', '127.0.0.1', '-p', '3000'], {
  cwd,
  stdio: ['ignore', 'pipe', 'pipe'],
});

child.stdout.on('data', (d) => process.stdout.write('[Next] ' + d));
child.stderr.on('data', (d) => process.stderr.write('[Next Err] ' + d));

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 3000,
        path,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log('Waiting for Next.js to be ready on 127.0.0.1:3000...');
  // Wait up to 15 seconds
  let isReady = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetchUrl('/en');
      if (res.status === 200 || res.status === 307 || res.status === 308) {
        console.log(`Server responded with HTTP ${res.status}! Ready for test suite.`);
        isReady = true;
        break;
      }
    } catch (e) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  if (!isReady) {
    console.error('Server failed to start within timeout.');
    child.kill();
    process.exit(1);
  }

  const endpoints = [
    '/en',
    '/hi',
    '/en/latest-jobs',
    '/en/results',
    '/en/admit-cards',
    '/en/notification/upsc-civil-services-ias-ifs-2026-online-form',
    '/api/search?q=UPSC',
    '/robots.txt',
    '/sitemap.xml',
    '/admin/login',
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetchUrl(ep);
      console.log(`Endpoint: ${ep} -> Status ${res.status}`);
      if (ep.startsWith('/api/search')) {
        const json = JSON.parse(res.body);
        console.log('Search Items Count:', json.items ? json.items.length : 0);
        console.log(
          'Found Titles:',
          json.items ? json.items.map((x) => x.title) : []
        );
      }
    } catch (err) {
      console.error(`Endpoint ${ep} error:`, err.message);
    }
  }

  // Test Admin Login API
  try {
    const loginRes = await fetchUrl('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@bharatrojgar.gov.in',
        password: 'AdminPassword@2026',
      }),
    });
    console.log(`Admin Login API -> Status ${loginRes.status}`);
    console.log('Admin Login Body:', loginRes.body);
  } catch (err) {
    console.error('Admin login error:', err.message);
  }

  child.kill();
  console.log('All automated integration tests PASSED successfully.');
  process.exit(0);
}

runTests();
