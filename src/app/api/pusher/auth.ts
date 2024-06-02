import { pusherServer } from "@/lib/pusher";
import { authOptions } from "@/server/auth";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const BodySchema = z.object({
  socketId: z.string(),
  channel: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401);

  const { socketId, channel } = BodySchema.parse(req.body);

  const data = { user_id: session.user.id };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return res.send(authResponse);
}
