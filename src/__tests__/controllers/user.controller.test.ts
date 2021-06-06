import UserController from '../../server/controllers/user.controller';
import UserService from '../../server/services/user.service';
// import { mocked } from 'ts-jest/utils';

jest.mock('../../server/services/user.service.ts', () => {
	return jest.fn().mockImplementation(() => {
		return { getAllUsers: jest.fn() }
	})
});

const repo:any = {}
const userService:any = new UserService(repo);// mocked(UserService, true);
const userController = new UserController(userService)

describe('User Controller', () => {
  let mRes: any;
  let mNext: () => void;
  beforeEach(() => {
    mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mNext = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return correct result', async () => {
    const mReq = {};
	mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
	(userService.getAllUsers as jest.MockedFunction<any>).mockResolvedValueOnce(
		[
			{ name: 'Emily' }
		]
	);
   	await userController.getAllUsers(mReq, mRes, mNext);
	expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(
		{
			users: [
				{ name: 'Emily' }
			]
		}
	);
  });
});
