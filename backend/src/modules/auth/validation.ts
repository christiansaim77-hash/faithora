export function isEmail(email: string) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSignupInput(input: any) {
  if (!input) { const e: any = new Error('Invalid input'); e.status = 400; throw e; }
  const { name, email, password } = input;
  if (!name || typeof name !== 'string' || name.trim().length === 0) { const e: any = new Error('Name is required'); e.status = 400; throw e; }
  if (!email || !isEmail(email)) { const e: any = new Error('Valid email is required'); e.status = 400; throw e; }
  if (!password || typeof password !== 'string' || password.length < 8) { const e: any = new Error('Password must be at least 8 characters'); e.status = 400; throw e; }
  if (input.phone && typeof input.phone !== 'string') { const e: any = new Error('Phone must be a string'); e.status = 400; throw e; }
}

export function validateLoginInput(input: any) {
  if (!input) { const e: any = new Error('Invalid input'); e.status = 400; throw e; }
  const { email, password } = input;
  if (!email || !isEmail(email)) { const e: any = new Error('Valid email is required'); e.status = 400; throw e; }
  if (!password || typeof password !== 'string') { const e: any = new Error('Password is required'); e.status = 400; throw e; }
}
