import { Server } from './types';

export default function filterAndSort(
  servers: Server[],
  options: {
    name: string;
    status: string;
    sort: string;
  }
): Server[] {
  const { name, status, sort } = options;
  let filtered = servers;
  if (name) filtered = filtered.filter((item) => item.name === name);
  if (status) filtered = filtered.filter((item) => item.status === status);
  if (sort) {
    filtered = filtered.sort((a, b) => {
      const sortKey = sort[2] == 'r' ? 'responseTime' : 'uptime';
      const sortOrder = sort[0] == 'a' ? 'asc' : 'desc';
      let aVal: string | number = a[sortKey];
      let bVal: string | number = b[sortKey];

      if (sortKey === 'uptime') {
        const isANa = a.uptime === 'N/A';
        const isBNa = b.uptime === 'N/A';
        if (isANa && !isBNa) return sortOrder === 'asc' ? 1 : -1;
        if (!isANa && isBNa) return sortOrder === 'asc' ? -1 : 1;
        if (isANa && isBNa) return 0;

        aVal = parseFloat(a.uptime.replace('%', ''));
        bVal = parseFloat(b.uptime.replace('%', ''));
      }

      if (sortKey === 'responseTime') {
        const isANa = a.responseTime === 'N/A';
        const isBNa = b.responseTime === 'N/A';
        if (isANa && !isBNa) return sortOrder === 'asc' ? 1 : -1;
        if (!isANa && isBNa) return sortOrder === 'asc' ? -1 : 1;
        if (isANa && isBNa) return 0;

        aVal = parseInt(a.responseTime.replace('ms', ''), 10);
        bVal = parseInt(b.responseTime.replace('ms', ''), 10);
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return filtered;
}
