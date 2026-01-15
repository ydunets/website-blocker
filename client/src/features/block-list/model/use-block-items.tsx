import { useBlockListQuery } from "@/entities/block-list/queries";
import { useDebouncedValue } from "@/shared/lib/use-debounced-value";
import { useState } from "react";

export function useBlockItems() {
  const [q, setQ] = useState("");

  const blockListQuery = useBlockListQuery({ q: useDebouncedValue(q, 200) });

  const items = blockListQuery.data?.items ?? [];

  return { items, isLoading: blockListQuery.isLoading, q, setQ };
}