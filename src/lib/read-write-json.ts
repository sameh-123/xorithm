import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');
console.log(filePath);
export async function readUsers() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function writeUsers(users: any[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}
