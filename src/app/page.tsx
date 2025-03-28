import { IpTracker } from "@/components/IpTracker";
import { getUserIp } from "./actions/ip";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const ipInfo = await getUserIp();

  return (
    <main className="container mx-auto py-10 px-4 min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">IP Address Tracker</h1>
        <p className="text-gray-500 mb-8">
          This page tracks changes in your IP address over time. Each time your IP
          changes, a new entry will be added to the table below.
        </p>
        <IpTracker ipInfo={ipInfo} />
      </div>
      
      <footer className="mt-12 pb-6 text-center text-sm text-gray-500">
        Made with <span className="text-red-500">❤️</span> by farhancdr
      </footer>
    </main>
  );
}
