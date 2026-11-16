import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const envPath = path.join(rootDir, '.env');
const fallbackDatabaseUrl = 'file:./dev.db';

const ensureEnvFile = () => {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `DATABASE_URL="${fallbackDatabaseUrl}"\n`, 'utf8');
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const hasDatabaseUrl = /^\s*DATABASE_URL\s*=/.test(content);

  if (!hasDatabaseUrl) {
    const nextContent = `${content.trimEnd()}\nDATABASE_URL="${fallbackDatabaseUrl}"\n`;
    fs.writeFileSync(envPath, nextContent, 'utf8');
  }
};

ensureEnvFile();

if (!process.env.DATABASE_URL) {
  const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const match = envContent.match(/^\s*DATABASE_URL\s*=\s*["']?(.*?)["']?\s*$/m);
  if (match && match[1]) {
    process.env.DATABASE_URL = match[1];
  } else {
    process.env.DATABASE_URL = fallbackDatabaseUrl;
  }
}
