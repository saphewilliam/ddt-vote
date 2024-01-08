import { migrate } from 'drizzle-orm/libsql/migrator';
import { database } from '@/lib/database';

async function main(): Promise<void> {
  await migrate(database, { migrationsFolder: './migrations' });
}

main().catch((e) => {
  // eslint-disable-next-line no-console -- console error is allowed
  console.error(e);
  process.exit(1);
});
