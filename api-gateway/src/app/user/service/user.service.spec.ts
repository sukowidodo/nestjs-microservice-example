import { UserService } from './user.service';

describe('UserService', () => {
  it('should throw error when email does not exist in database', async () => {
    const mockUserRepository = {
      findOneByOrFail: jest.fn().mockRejectedValue(new Error('User not found')),
    };
    const userService = new UserService(mockUserRepository as any);
    const email = 'nonexistent@example.com';
    await expect(userService.findByEmail(email)).rejects.toThrow(
      'User not found',
    );
    expect(mockUserRepository.findOneByOrFail).toHaveBeenCalledWith({ email });
  });

});
