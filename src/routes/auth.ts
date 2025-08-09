import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

export const authRoutes = async (app: FastifyInstance) => {
  // Register
  app.post('/register', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const existing = await app.prisma.user.findUnique({ where: { email } });
    if (existing) {
      return reply.code(400).send({
        error: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await app.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
    });

    return { token };
  });

  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await app.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.code(401).send({
        error: 'Invalid credentials',
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return reply.code(401).send({
        error: 'Invalid credentials',
      });
    }

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
    });

    return { token };
  });
};
