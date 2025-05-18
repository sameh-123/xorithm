import Image from 'next/image';
import LogoutButton from './logout-button';
import { getData, getToken } from '@/lib/actions';
import { User } from '@/lib/types';
import Link from 'next/link';

export default async function Header() {
  const token = await getToken();
  if (!token) return null;
  const user: User = await getData({ url: `users/${token}` });
  return (
    <header className="bg-black text-white flex items-center justify-between sm:p-10 p-5">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={2000}
          height={2000}
          className="sm:w-30 w-20 invert"
        />
      </Link>
      <div className="flex items-center gap-5">
        <div className="sm:text-xl text-lg font-semibold hidden sm:block">
          {user.name}
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
