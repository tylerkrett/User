"use client";
import { useStore } from "./utils";

export default function Users() {
  const store = useStore();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.createUser.mutate(store.state);
      }}
      className="grid gap-4"
    >
      <input
        type="text"
        placeholder="First name"
        required
        value={store.state.firstName}
        onChange={(e) =>
          store.setState({ ...store.state, firstName: e.target.value })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Last name"
        required
        value={store.state.lastName}
        onChange={(e) =>
          store.setState({ ...store.state, lastName: e.target.value })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={store.state.email}
        onChange={(e) =>
          store.setState({ ...store.state, email: e.target.value })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Address"
        required
        value={store.state.address}
        onChange={(e) =>
          store.setState({ ...store.state, address: e.target.value })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <button
        type="submit"
        className="rounded-full bg-purple-500 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={store.createUser.isPending}
      >
        {store.createUser.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
