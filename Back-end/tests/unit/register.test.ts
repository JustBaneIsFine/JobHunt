import { createUserHandler } from '../../routes/register';
import * as registerHelper from '../../helperFunctions/registerAndLoginHandlers';

const request = {
    body: { username: 'testUsername', password: 'testPassword' },
};

const response = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
};

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});
describe('registering works', () => {
    describe('user creation works', () => {
        test('username is taken/some other error', async () => {
            jest.spyOn(registerHelper, 'handleRegister').mockResolvedValue(
                false
            );
            await createUserHandler(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: false,
                error: 'username is taken',
            });
        });
        test('you are registered', async () => {
            // jest.spyOn(registerHelper, 'checkInput').mockReturnValue(true);
            jest.spyOn(registerHelper, 'handleRegister').mockResolvedValue(
                true
            );
            await createUserHandler(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
            });
        });
    });
});
