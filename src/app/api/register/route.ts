import { NextResponse } from 'next/server';
import { readUsers, writeUsers } from '@/lib/read-write-json';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: 'name field is missing' },
      { status: 400 }
    );
  }
  if (!email) {
    return NextResponse.json(
      { error: 'email field is missing' },
      { status: 400 }
    );
  }
  if (!password) {
    return NextResponse.json(
      { error: 'password field is missing' },
      { status: 400 }
    );
  }

  const users = await readUsers();
  const existing = users.find((u: any) => u.email === email);

  if (existing) {
    return NextResponse.json({ error: 'user already exists' }, { status: 409 });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(newUser);
  await writeUsers(users);

  return NextResponse.json({ success: true, user: newUser });
}
