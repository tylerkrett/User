import { useMemo } from "react";
import { api } from "~/trpc/react";

export function useStore() {
  const utils = api.useUtils();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    api.user.getUsers.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      },
    );
  const deleteUser = api.user.delete.useMutation({
    onSuccess: async () => {
      await await utils.user.invalidate();
    },
  });
  const users = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return {
    data,
    users,
    isLoading: isLoading || isFetchingNextPage,
    fetchNextPage,
    deleteUser,
    hasMore:
      data?.pages?.length && data?.pages[data.pages?.length - 1]?.nextCursor,
  };
}
