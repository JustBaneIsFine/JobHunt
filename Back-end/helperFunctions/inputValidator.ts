// body('username').isLength({ min: 3 }).trim().escape(),
// body('password').isLength({ min: 8 }).trim().escape(),

export function validateInput(req, res, next) {
    const usernameIsValid = checkUsername(req.body['username'], res);
    const passwordIsValid = checkPassword(req.body['password'], res);

    if (usernameIsValid && passwordIsValid) {
        return next();
    } else {
        //respond with erro
        res.send();
    }
}

function checkUsername(username: string, res) {
    const x = username.trim();
    if (checkLengthUsername(x)) {
        return true;
    } else {
        res.json({ error: 'Username is too short' });
        res.status(401);
        return false;
    }
}
function checkPassword(password: string, res) {
    const x = password.trim();
    if (checkLengthPass(x)) {
        return true;
    } else {
        res.json({ error: 'Password is too short' });
        res.status(401);
        return false;
    }
}

function checkLengthPass(pass: string) {
    if (pass.length >= 6) {
        return true;
    } else {
        return false;
    }
}
function checkLengthUsername(name: string) {
    if (name.length >= 3) {
        return true;
    } else {
        return false;
    }
}
// CHECK:  do i need this
// function decodeHtml(str) {
//     return str
//         .replace(/&amp;/g, '&')
//         .replace(/&lt/g, '<')
//         .replace(/&gt/g, '>')
//         .replace(/&quot;/g, '"')
//         .replace(/&#039;/g, "'");
// }

// function escapeHtml(str) {
//     return str
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;')
//         .replace(/'/g, '&#039;');
// }
