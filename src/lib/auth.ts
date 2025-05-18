import CredentialsProvider from 'next-auth/providers/credentials';
import { readUsers } from '@/lib/read-write-json';
import { User } from './types';
import { setToken } from './actions';

CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    const users = await readUsers();
    const user = users.find(
      (u: User) =>
        u.email === credentials?.email && u.password === credentials?.password
    );
    if (user) {
      await setToken(user.id);
      return user;
    }
    return null;
  },
});
