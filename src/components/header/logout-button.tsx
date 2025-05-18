'use client';
import { deleteToken } from '@/lib/actions';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const handleClick = async () => {
    await deleteToken();
    router.push('/login');
  };
  return (
    <Button onClick={handleClick} className="sm:text-xl text-lg cursor-pointer">
      Log Out
    </Button>
  );
}
