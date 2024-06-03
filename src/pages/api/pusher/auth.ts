import { pusherServer } from "@/lib/pusher";
import { authOptions } from "@/server/auth";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const BodySchema = z.object({
  socket_id: z.string(),
  channel_name: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401);

  const { socket_id, channel_name } = BodySchema.parse(req.body);

  const data = { user_id: session.user.email };

  const authResponse = pusherServer.authorizeChannel(
    socket_id,
    channel_name,
    data,
  );

  return res.send(authResponse);
}
