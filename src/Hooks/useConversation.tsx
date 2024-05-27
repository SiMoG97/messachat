import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useConversation() {
  // const params = useParams() || {};
  const query = useSearchParams();
  // console.log(query.get("conversationId"));

  return useMemo(() => {
    const conversationId = query.get("conversationId") ?? "";
    const isOpen = !!conversationId;
    return { conversationId, isOpen };
  }, [query]);
}
