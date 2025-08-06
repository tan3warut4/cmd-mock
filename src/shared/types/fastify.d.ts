import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      email: string;
      [key: string]: any; // include other fields from the token if needed
    };
  }
}