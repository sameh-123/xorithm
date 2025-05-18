import { NextResponse } from 'next/server';
import { readUsers } from '@/lib/read-write-json';
import { User } from '@/lib/types';

export async function POST(req: Request) {
  const { email, password } = await req.json();

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
  const user: User = users.find((u: any) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: 'no such user exists' }, { status: 404 });
  }

  if (user.password != password) {
    return NextResponse.json({ error: 'password incorrect' }, { status: 401 });
  }

  return NextResponse.json({ success: true, user });
}
