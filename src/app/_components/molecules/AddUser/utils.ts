import { useState } from "react";

import { api } from "~/trpc/react";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
};

export function useStore() {
  const utils = api.useUtils();
  const [state, setState] = useState(defaultState);
  const createUser = api.user.create.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      setState(defaultState);
    },
  });
  return {
    state,
    setState,
    createUser,
  };
}
