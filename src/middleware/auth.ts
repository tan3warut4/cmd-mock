import { FastifyRequest, FastifyReply } from "fastify";

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Invalid or missing token",
    });
  }
};
