import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'servers.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);
  return NextResponse.json(jsonData);
}
