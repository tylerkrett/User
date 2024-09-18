"use client";
import { api } from "~/trpc/react";

export default function LatestUser() {
  const [newUser] = api.user.getLatestUser.useSuspenseQuery();

  return (
    <p className="truncate">{`Your most recent human: ${newUser?.firstName ?? "No Humans yet."}`}</p>
  );
}
