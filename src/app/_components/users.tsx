"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
};

export function Users() {
  const [users] = api.user.getUsers.useSuspenseQuery();
  const [newUser] = api.user.getLatestUser.useSuspenseQuery();
  const utils = api.useUtils();
  const [state, setState] = useState(defaultState);
  const createUser = api.user.create.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      setState(defaultState);
    },
  });

  return (
    <div className="w-full max-w-xs">
      {newUser ? (
        <p className="truncate">Your most recent user: {newUser?.firstName}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      {users ? (
        users.map((user) => {
          return (
            <>
              <p className="truncate">
                Your most recent user: {user.firstName}
              </p>
            </>
          );
        })
      ) : (
        <></>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser.mutate(state);
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="First name"
          required
          value={state.firstName}
          onChange={(e) => setState({ ...state, firstName: e.target.value })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Last name"
          required
          value={state.lastName}
          onChange={(e) => setState({ ...state, lastName: e.target.value })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={state.address}
          onChange={(e) => setState({ ...state, address: e.target.value })}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
