import { promises as fs } from 'fs';
import path from 'path';
import { Server } from './types';

export async function getServers(): Promise<Server[]> {
  const filePath = path.join(process.cwd(), 'data', 'servers.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);
  return jsonData;
}
