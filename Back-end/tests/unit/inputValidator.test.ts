import { validateInput } from '../../helperFunctions/inputValidator';

const request = { body: { username: '', password: '' } };

const response = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
};
const next = jest.fn();
afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

describe('input Validation works', () => {
    test('username is too short', () => {
        mockReq('sh', 'passIsGood', request);
        validateInput(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'username is too short',
        });
    });
    test('password is too short ', () => {
        mockReq('UsernameIsGood', 'passbad', request);
        validateInput(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'password is too short',
        });
    });
    test('username is too long ', () => {
        mockReq(
            'UsernameIsWayTooLongUsernameIsWayTooLongUsernameIsWayTooLong',
            'passIsGood',
            request
        );
        validateInput(request, response, next);
        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'username is too long',
        });
    });
    test('password is too long ', () => {
        mockReq(
            'UsernameIsGood',
            'PassIsWayTooLongPassIsWayTooLongPassIsWayTooLongPassIsWayTooLong',
            request
        );
        validateInput(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'password is too long',
        });
    });
    test('empty pass', () => {
        mockReq('UserIsGood', '', request);
        validateInput(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'password is too short',
        });
    });
    test('empty username', () => {
        mockReq('', 'PassIsGood', request);
        validateInput(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
            error: 'username is too short',
        });
    });

    test('pass and user are good ', () => {
        mockReq('UsernameIsGood', 'PasswordIsGood', request);
        validateInput(request, response, next);
        expect(next).toHaveBeenCalled();
    });
});

function mockReq(user, pass, res) {
    res.body.username = user;
    res.body.password = pass;
}
