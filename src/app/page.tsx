import FilteringAndSorting from '@/components/home/filter-sort';
import Servers from '@/components/home/servers';
import { getData } from '@/lib/actions';
import filterAndSort from '@/lib/filter-sort';
import { Server } from '@/lib/types';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
    status: string;
    sort: string;
  }>;
}) {
  const options = await searchParams;
  const servers: Server[] = await getData({ url: '/api/servers' });
  const filtered = filterAndSort(servers, options);

  

  return (
    <main className="container my-10">
      <FilteringAndSorting />
      <Servers servers={filtered} />
    </main>
  );
}
