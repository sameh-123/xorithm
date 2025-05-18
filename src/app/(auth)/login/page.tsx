import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LogIn() {
  return (
    <>
      <LoginForm />
      <div className="text-xl my-4">
        don't have an account yet?{' '}
        <Link href="/signup" className="text-blue-900 font-semibold">
          sign up
        </Link>
      </div>
    </>
  );
}
