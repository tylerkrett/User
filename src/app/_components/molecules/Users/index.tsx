"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useStore } from "./utils";
import { Button } from "~/components/ui/button";
import Anchor from "../../atoms/Anchor";

export default function Users() {
  const store = useStore();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-16">
      <Table>
        <TableCaption>A list of your humans/users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell className="text-right">
                <Anchor href={`/user/${user.id}`} className="mr-4">View</Anchor>
                <Button variant="destructive" onClick={() => store.deleteUser.mutate({ids: [user.id]})}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {!Boolean(store.users.length) && !store.isLoading && (
            <TableRow>
              <TableCell className="font-medium" colSpan={4}>
                Please add a human.
              </TableCell>
            </TableRow>
          )}
          {store.isLoading && (
            <TableRow>
              <TableCell className="font-medium" colSpan={4}>
                Loading results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button
        className="mt-8"
        variant="secondary"
        disabled={!store.hasMore || store.isLoading}
        onClick={async () => await store.fetchNextPage()}
      >
        {store.hasMore ? "Fetch more" : "No more to fetch buddy"}
      </Button>
    </div>
  );
}
