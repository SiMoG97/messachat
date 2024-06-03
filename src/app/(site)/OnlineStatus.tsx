"use client";

import { useOnlineChannel } from "@/Hooks";

const OnlineStatus = () => {
  useOnlineChannel();
  return null;
};

export default OnlineStatus;
