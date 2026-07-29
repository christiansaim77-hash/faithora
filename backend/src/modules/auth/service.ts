import { AppDataSource } from '../../database';
import { User } from '../../database/entities/User';
import bcrypt from 'bcrypt';
import { signToken } from './jwt';
import { validateSignupInput, validateLoginInput } from './validation';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

type SignupInput = { name: string; email: string; phone?: string; password: string };
type LoginInput = { email: string; password: string };

function safeUser(u: User) {
  return {
    id: u.id,
    name: (u as any).name || u.displayName || null,
    email: u.email,
    phone: (u as any).phone || null,
    emailVerified: (u as any).emailVerified || false,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export async function signup(input: SignupInput) {
  validateSignupInput(input);

  const repo = AppDataSource.getRepository(User);

  const existingByEmail = await repo.findOne({ where: { email: input.email } });
  if (existingByEmail) {
    const err: any = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  if (input.phone) {
    const existingByPhone = await repo.findOne({ where: { phone: input.phone } });
    if (existingByPhone) {
      const err: any = new Error('Phone number already in use');
      err.status = 409;
      throw err;
    }
  }

  const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = repo.create({
    email: input.email,
    password: hashed,
    displayName: input.name,
    ...(input.phone ? { phone: input.phone } : {}),
    ...(input.name ? { name: input.name } : {}),
    emailVerified: false,
  } as any);

  await repo.save(user);

  const token = signToken({ userId: user.id, email: user.email });

  return { user: safeUser(user as User), token };
}

export async function login(input: LoginInput) {
  validateLoginInput(input);

  const repo = AppDataSource.getRepository(User);

  const user = await repo.findOne({ where: { email: input.email } });
  if (!user || !user.password) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(input.password, user.password);
  if (!match) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = signToken({ userId: user.id, email: user.email });

  return { user: safeUser(user as User), token };
}
