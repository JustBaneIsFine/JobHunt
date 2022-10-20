import { createUserHandler } from '../../routes/register';
import * as registerHelper from '../../helperFunctions/registerAndLoginHandlers';
import { validateInput } from '../../helperFunctions/inputValidator';

const request = { body: { username: 'tes', password: 'tes' } };
const request2 = {
    body: { username: 'testUsername', password: 'testPassword' },
};

const response = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
};
const next = jest.fn();

describe('registering works', () => {
    describe('inputValidation works', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        test('input validation works validation failed', () => {
            validateInput(request, response, next);

            expect(next).not.toHaveBeenCalled();
            expect(response.send).toHaveBeenCalled();
        });
        test('input validation works validation succeeded ', () => {
            validateInput(request2, response, next);

            expect(next).toHaveBeenCalled();
        });
    });

    describe('user creation works', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        test('username is taken/some other error', async () => {
            jest.spyOn(registerHelper, 'handleRegister').mockResolvedValue(
                false
            );
            await createUserHandler(request2, response);
            expect(response.status).toHaveBeenCalledWith(201);
        });
        test('you are registered', async () => {
            // jest.spyOn(registerHelper, 'checkInput').mockReturnValue(true);
            jest.spyOn(registerHelper, 'handleRegister').mockResolvedValue(
                true
            );
            await createUserHandler(request2, response);
            expect(response.status).toHaveBeenCalledWith(200);
        });
    });
});
