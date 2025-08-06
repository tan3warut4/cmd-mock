// types/fastify-jwt.d.ts
import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { userId: string; tenantId: string; role: string }; // ตอน sign
    user: { userId: string; tenantId: string; role: string }; // ตอน verify
  }
}
