import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useConversation() {
  const params = useParams() || {};

  return useMemo(() => {
    const conversationId = params?.conversationId;
    const isOpen = !!conversationId;
    return { conversationId, isOpen };
  }, [params.conversationId]);
}
