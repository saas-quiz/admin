import { fetcher, fetcherOpt } from "@/lib/utils";
import { useDataStore } from "@/stores/data";
import { IGroup } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useGroups = () => {
  const { groups, setGroups } = useDataStore();
  const [error, setError] = useState(null);
  const { data, isLoading } = useSWR(groups.length === 0 ? "/api/groups" : null, fetcher, fetcherOpt);

  useEffect(() => {
    if (data && !data?.ok) {
      setError(data?.error || "Something went wrong");
    }
    if (data && data?.ok && data?.data && !groups.length) {
      setGroups(data.data || []);
    }
  }, [data, isLoading]);

  const fetchResult: IGroup[] = data?.data || [];
  return { groups: groups.length ? groups : fetchResult, isLoading, error };
};
