import bcrypt from 'bcryptjs';

const options = {
  rounds: 10
}

export async function hash(password: string) {
  return bcrypt.hash(password, options.rounds);
}

export async function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

