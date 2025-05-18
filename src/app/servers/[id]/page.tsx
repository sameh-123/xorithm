import { getData } from '@/lib/actions';
import { Server } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
export default async function ServerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const servers: Server[] = await getData({ url: '/api/servers' });
  const server = servers.find((item) => item.id === id);
  if (!server)
    return (
      <div className="container text-center min-h-130 italic text-red-500 sm:text-4xl text-2xl my-10 font-bold">
        No such server with this id !
      </div>
    );
  const { name, status, responseTime, uptime, ip, lastChecked, history } =
    server;

  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  });

  const historyLength = Math.min(30, history.length);
  return (
    <main className="container my-10 space-y-8 min-h-125">
      <section className="flex items-center justify-between">
        <h1 className="sm:text-3xl text-2xl font-bold">{name}</h1>
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
      </section>

      <div className="text-2xl">
        <span className="font-semibold">IP Address : </span>
        {ip}
      </div>

      <section className="sm:text-2xl text-xl flex flex-wrap items-center justify-between">
        <div className="text-slate-600">
          <span className="font-semibold text-black">Response Time : </span>
          {responseTime}
        </div>
        <div className="text-slate-600">
          <span className="font-semibold text-black">Up Time : </span>
          {uptime}
        </div>
      </section>

      <div className="text-end sm:text-2xl text-xl">
        <span className="font-semibold">Last checked at : </span>
        {formatter.format(new Date(lastChecked))}
      </div>

      <section>
        <h2 className="font-bold sm:text-3xl text-2xl">
          History for the last {historyLength} days :
        </h2>

        <div className="flex items-center gap-2 flex-wrap my-10">
          {history.reverse().map((item) => (
            <TooltipProvider key={item.timestamp}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    key={item.timestamp}
                    className={`w-2 ${
                      item.status == 'Up'
                        ? 'bg-green-500 h-8'
                        : item.status == 'Down'
                        ? 'bg-red-600 h-12'
                        : 'bg-orange-400 h-10'
                    } rounded-sm`}
                  ></div>
                </TooltipTrigger>
                <TooltipContent
                  className={`${
                    item.status == 'Up'
                      ? 'bg-green-500'
                      : item.status == 'Down'
                      ? 'bg-red-600'
                      : 'bg-orange-400'
                  }`}
                >
                  <div className="sm:text-2xl text-xl">
                    <div>{formatter.format(new Date(item.timestamp))}</div>
                    <div className="text-center font-semibold">
                      {item.status}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex items-center gap-4 *:flex *:items-center *:gap-1 *:text-lg *:font-semibold">
          <div>
            <div className="bg-green-500 size-5 rounded-full"></div>
            UP
          </div>
          <div>
            <div className="bg-orange-400 size-5 rounded-full"></div>
            DEGRADED
          </div>
          <div>
            <div className="bg-red-600 size-5 rounded-full"></div>
            DOWN
          </div>
        </div>
      </section>
    </main>
  );
}
