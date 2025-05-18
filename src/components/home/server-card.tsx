import { Server } from '@/lib/types';
import { Timer, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ServerCard({ server }: { server: Server }) {
  const { name, status, uptime, responseTime, lastChecked, id } = server;
  const formatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date(lastChecked));
  return (
    <Link
      href={`/servers/${id}`}
      className="col-span-2 md:col-span-1 flex flex-col gap-4 p-4 rounded-xl shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="sm:text-2xl text-xl font-semibold">{name}</div>
        <div
          className={`sm:text-lg text-white font-semibold p-2 rounded-lg sm:w-30 w-25 text-center  ${
            status == 'Up'
              ? 'bg-green-500'
              : status == 'Down'
              ? 'bg-red-600'
              : 'bg-orange-400'
          }`}
        >
          {status}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl flex items-center gap-1 text-slate-600 font-bold">
          <Timer size={30} />
          {responseTime}
        </div>
        <div className="flex items-center gap-1 text-xl">
          <TrendingUp className="text-green-500" />
          {uptime}
        </div>
      </div>
      <div className="self-end text-gray-700 font-light">{formatted}</div>
    </Link>
  );
}
