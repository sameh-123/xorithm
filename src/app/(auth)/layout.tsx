import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative px-8">
      <Image
        src="/logo.png"
        alt="logo"
        className="sm:w-80 w-60 invert mb-8"
        width={2000}
        height={2000}
      />
      <Image
        src="/auth.webp"
        alt="auth background"
        width={2000}
        height={2000}
        className="absolute w-full h-full object-cover inset-0 -z-2"
      />
      <div className="absolute w-full h-full inset-0 -z-1 bg-black/70"></div>
      <section className="bg-white w-full max-w-2xl p-5 rounded-lg shadow-2xl">
        {children}
      </section>
    </main>
  );
}
