// Usage: npm run create-admin -- --email you@example.com --password "YourStrongPassword" --name "Your Name" --role ADMIN
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i+1] : undefined;
  };

  const email = get('--email') || process.env.ADMIN_EMAIL;
  const password = get('--password') || process.env.ADMIN_PASSWORD;
  const name = get('--name') || 'Admin';
  const role = (get('--role') || 'ADMIN').toUpperCase();

  if (!email || !password) {
    console.error('Missing --email/--password');
    process.exit(1);
  }

  const rounds = Number(process.env.BCRYPT_ROUNDS || '12');
  const hash = await bcrypt.hash(password, rounds);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('User already exists:', email);
  } else {
    const user = await prisma.user.create({ data: { email, passwordHash: hash, name, role } });
    console.log('Created admin user:', user.email);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
