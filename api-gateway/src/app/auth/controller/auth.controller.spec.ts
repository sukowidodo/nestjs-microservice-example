import { AuthController } from './auth.controller';

describe('AuthController', () => {
  it('should register a new user when provided with valid data', async () => {
    const authService = {
      register: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'avatar.png',
      }),
    };
    const authController = new AuthController(authService as any);
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      avatar: 'avatar.png',
    };
    const result = await authController.register(registerDto);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'avatar.png',
    });
  });
  it('should return conflict error when email already exists', async () => {
    const authService = {
      register: jest.fn().mockRejectedValue(new Error('User already exists')),
    };
    const authController = new AuthController(authService as any);
    const registerDto = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
      avatar: 'avatar.png',
    };
    try {
      await authController.register(registerDto);
    } catch (error) {
      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(error.message).toBe('User already exists');
    }
  });
});
