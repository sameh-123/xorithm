import SignUpForm from '@/components/auth/signup-form';
import Link from 'next/link';
import React from 'react';

export default function SignUp() {
  return (
    <>
      <SignUpForm />
      <div className="text-xl my-4">
        already have an account?{' '}
        <Link href="/login" className="text-blue-900 font-semibold">
          log in
        </Link>
      </div>
    </>
  );
}
