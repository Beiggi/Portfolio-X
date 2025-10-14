// /server/src/index.ts
import 'dotenv/config';

import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { z } from 'zod';
import { sendContactEmail } from './email.js';

const server = Fastify({ logger: true });

// PRUEBA DE DEPURACIÓN: Vamos a confirmar que la variable se está leyendo.
console.log('SMTP Host from .env:', process.env.EMAIL_SMTP_HOST);

// Middlewares
server.register(helmet);
server.register(rateLimit, {
  max: 10, // 10 requests
  timeWindow: '1 minute',
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Ruta de contacto
server.post('/api/contact', async (request, reply) => {
  try {
    const data = contactSchema.parse(request.body);
    await sendContactEmail(data.name, data.email, data.message);
    reply.code(200).send({ message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.code(400).send({ message: 'Invalid input', errors: error.issues });
    } else {
      server.log.error(error);
      reply.code(500).send({ message: 'Internal server error' });
    }
  }
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
