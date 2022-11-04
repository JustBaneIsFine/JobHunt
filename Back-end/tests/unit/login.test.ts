import { loginHandler } from '../../routes/login';
import * as databaseCheck from '../../databaseConnection';
import * as passCheck from '../../helperFunctions/hashing';

const request = {
    body: { username: 'helloThere', password: 'helloTherePass' },
    session: { user: '' },
};

const response = {
    json: jest.fn(),
    send: jest.fn(),
    status: jest.fn(),
};
afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});
describe('logging in works', () => {
    test('login failed passwords do not match', async () => {
        //x
        jest.spyOn(databaseCheck, 'usernameExists').mockResolvedValue({
            username: 'Branislav',
            email: 'x',
            age: 'x',
            hash: 'egomawwgma',
        });
        jest.spyOn(passCheck, 'passMatches').mockResolvedValue(false);

        await loginHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            success: false,
            error: 'username/password combination is wrong',
        });
    });

    test("login failed username doesn't exist", async () => {
        //x
        jest.spyOn(databaseCheck, 'usernameExists').mockResolvedValue(null);
        await loginHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            success: false,
            error: 'username/password combination is wrong',
        });
    });

    test('login successful', async () => {
        //x
        jest.spyOn(databaseCheck, 'usernameExists').mockResolvedValue({
            userId: '2512',
            username: 'helloThere',
            hash: 't12g120in01',
        });
        jest.spyOn(passCheck, 'passMatches').mockReturnValue(true);
        await loginHandler(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            success: true,
        });
    });
});
