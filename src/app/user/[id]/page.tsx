import { api } from "~/trpc/server";

export default async function UserPage(props: { params: { id: string } }) {
  const user = await api.user.getUser({
    id: Number(props.params.id) as number,
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-16">
      <p>First name: {user?.firstName}</p>
      <p>Last name: {user?.lastName}</p>
      <p>Email: {user?.email}</p>
      <p>Address: {user?.address}</p>
    </div>
  );
}
