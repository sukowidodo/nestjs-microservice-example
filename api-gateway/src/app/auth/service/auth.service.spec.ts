import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  it('should register a user successfully when provided with valid data', async () => {
    const mockUserService = {
      save: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'avatar.png',
      }),
    };
    const mockBcryptService = {
      hash: jest.fn().mockResolvedValue('hashedPassword'),
    };
    const mockJWTService = {
      hash: jest.fn().mockResolvedValue(new JwtService(null)),
    };
    const authService = new AuthService(
      mockUserService as any,
      mockBcryptService as any,
      mockJWTService as any,
    );

    const registerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      avatar: 'avatar.png',
    };

    const result = await authService.register(registerDto);

    expect(mockBcryptService.hash).toHaveBeenCalledWith('password123');
    expect(mockUserService.save).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      avatar: 'avatar.png',
    });
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'avatar.png',
    });
  });

  it('should throw an error when registering with an already existing email', async () => {
    const mockUserService = {
      save: jest.fn().mockRejectedValue(new Error('User already exists')),
    };
    const mockBcryptService = {
      hash: jest.fn().mockResolvedValue('hashedPassword'),
    };

    const mockJWTService = {
      hash: jest.fn().mockResolvedValue(new JwtService(null)),
    };
    const authService = new AuthService(
      mockUserService as any,
      mockBcryptService as any,
      mockJWTService as any,
    );

    const registerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      avatar: 'avatar.png',
    };

    await expect(authService.register(registerDto)).rejects.toThrow(
      'User already exists',
    );

    expect(mockBcryptService.hash).toHaveBeenCalledWith('password123');
    expect(mockUserService.save).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      avatar: 'avatar.png',
    });
  });
});
