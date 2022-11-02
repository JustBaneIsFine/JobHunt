export function validateInput(req, res, next) {
    const name = req.body.username;
    const pass = req.body.password;
    const userTrimmed = name ? name.trim() : '';
    const passTrimmed = pass ? pass.trim() : '';

    if (
        usernameIsValid(userTrimmed, res) &&
        passwordIsValid(passTrimmed, res)
    ) {
        req.body.username = userTrimmed;
        req.body.password = passTrimmed;
        return next();
    } else {
        //respond with error
        res.send();
    }
}

function usernameIsValid(username: string, res) {
    const userLengthValid = checkLengthUsername(username);
    if (userLengthValid === true) {
        return true;
    } else {
        res.status(401);
        res.json(userLengthValid);
        return false;
    }
}
function passwordIsValid(password: string, res) {
    const x = password ? password.trim() : '';
    const passLengthValid = checkLengthPass(x);
    if (passLengthValid === true) {
        return true;
    } else {
        res.status(401);
        res.json(passLengthValid);
        return false;
    }
}

function checkLengthPass(pass: string) {
    if (pass.length < 8) {
        return { error: 'password is too short' };
    } else if (pass.length > 25) {
        return { error: 'password is too long' };
    } else {
        return true;
    }
}
function checkLengthUsername(name: string) {
    if (name.length < 3) {
        return { error: 'username is too short' };
    } else if (name.length > 20) {
        return { error: 'username is too long' };
    } else {
        return true;
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
