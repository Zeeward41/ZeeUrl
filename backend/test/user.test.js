import { describe, it, expect, vi } from 'vitest'
import { getMe } from '../controllers/user.js'
import ErrorResponse from '../utils/errorResponse.js'

// Mock de la fonction asyncHandler
vi.mock('../middleware/async.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    default: actual.default,
  };
});

describe('getMe', () => {
  it('should return user data if user exists', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@gmail.com', role: 'user' };
    const mockReq = { user: mockUser };
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const mockNext = vi.fn();

    await getMe(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockUser,
    });
    expect(mockNext).not.toHaveBeenCalled();
});

  it('should call next with ErrorResponse if user not found', async () => {
    const mockReq = { user: null }
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }
    const mockNext = vi.fn()

    await getMe(mockReq, mockRes, mockNext)

    expect(mockNext).toHaveBeenCalledWith(new ErrorResponse('User Not found', 404))
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
  })
})