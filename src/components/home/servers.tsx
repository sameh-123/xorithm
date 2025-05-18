import ServerCard from '@/components/home/server-card';
import { Server } from '@/lib/types';

export default function Servers({ servers }: { servers: Server[] }) {
  if (!servers || servers.length == 0) {
    return (
      <section className="italic text-center text-red-400 sm:text-3xl text-2xl font-semibold h-100">
        no such servers found !
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-10 mx-auto w-full">
      {servers.map((server) => (
        <ServerCard server={server} key={server.id} />
      ))}
    </section>
  );
}
