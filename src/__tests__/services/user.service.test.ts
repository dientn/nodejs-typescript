import UserService from '../../server/services/user.service';
import UserRepository from  '../../server/repositories/user.repository'
// import { mocked } from 'ts-jest/utils';

jest.mock('../../server/repositories/user.repository', () => {
	return jest.fn().mockImplementation(() => {
		return { getAllUsers: jest.fn() }
	})
});

const userRepo:UserRepository = new UserRepository()
const userService:any = new UserService(userRepo);// mocked(UserService, true);

describe('User Service', () => {

  beforeEach(() => {
	// init mock if we need
    // mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    // mNext = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return correct result', async () => {
	(userRepo.getAllUsers as jest.MockedFunction<any>).mockResolvedValueOnce(
		[
			{ firstName: 'Emily' }
		]
	);
   	const result = await userService.getAllUsers();
	expect(userRepo.getAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
  });
});
