import { getToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer() {
  const token = await getToken();
  if (!token) return null;
  return (
    <footer className="bg-black clip-slope-top h-50 flex flex-row-reverse items-center p-10">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={2000}
          height={2000}
          className="sm:w-50 w-30 invert"
        />
      </Link>
    </footer>
  );
}
