'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomSelect from '../shared/custom-select';
import { sortSelect, statusSelect } from '@/lib/constants';
import { Button } from '../ui/button';

export default function Filter() {
  const search = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [status, setStaus] = useState('All');
  const [sort, setSort] = useState('normal');

  const handleClick = () => {
    const params = new URLSearchParams(search.toString());
    if (name) params.set('name', name);
    else params.delete('name');

    if (status && status != 'All') params.set('status', status);
    else params.delete('status');

    if (sort && sort != 'normal') params.set('sort', sort);
    else params.delete('sort');

    router.push(`?${params.toString()}`, { scroll: true });
  };
  return (
    <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-8 *:text-xl flex-wrap border border-slate-100 rounded-lg shadow-xl p-4">
      <Input
        name="name"
        placeholder="server name..."
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="max-w-50 focus-visible:ring-primary focus-visible:ring-1 !text-xl"
      />
      <CustomSelect
        placeholder="Select a status"
        values={statusSelect}
        value={status}
        setValue={setStaus}
      />
      <CustomSelect
        placeholder="Sort by.."
        values={sortSelect}
        value={sort}
        setValue={setSort}
      />

      <Button
        className="px-3 py-2 min-w-20 bg-primary text-white rounded-3xl font-semibold cursor-pointer hover:bg-primary/90"
        onClick={handleClick}
      >
        Go
      </Button>
    </div>
  );
}
