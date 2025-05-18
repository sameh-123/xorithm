import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <main className="h-svh w-full flex items-center justify-center">
      <LoaderCircle className="size-20 animate-spin" />
    </main>
  );
}
