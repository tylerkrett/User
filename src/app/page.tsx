import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import AddUser from "./_components/molecules/AddUser";
import LatestUser from "./_components/molecules/LatestUser";
import Users from "./_components/molecules/Users";

export default async function Home() {
  void api.user.getLatestUser.prefetch();
  return (
    <HydrateClient>
      <main className="grid grid-cols-2 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white max-lg:grid-cols-1">
        <div>
          <div className="sticky top-0 flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Add a human
            </h1>

            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <h3 className="text-2xl font-bold">
                First Steps: Adding a human
              </h3>
              <div className="text-lg">
                Simply use the form below, you can delete them anytime.
              </div>
            </div>

            <LatestUser />
            <AddUser />
          </div>
        </div>

        <Users />
      </main>
    </HydrateClient>
  );
}
