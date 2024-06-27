import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  it('should hash a simple string correctly', async () => {
    const bcryptService = new BcryptService();
    const value = 'simpleString';
    const hashedValue = await bcryptService.hash(value);
    expect(hashedValue).not.toBe(value);
    expect(hashedValue).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it('should return true when password matches hashed password', async () => {
    const bcryptService = new BcryptService();
    const password = 'password123';
    const hashedPassword = await bcryptService.hash(password);
    const result = await bcryptService.compare(password, hashedPassword);
    expect(result).toBe(true);
  });
});
