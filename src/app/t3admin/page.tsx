import { CustomParam } from "@/components/CustomParam";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function T3Admin() {

  return (
    <main className="container mx-auto py-10 px-4 min-h-screen flex flex-col">
      <CustomParam />
    </main>
  );
}
