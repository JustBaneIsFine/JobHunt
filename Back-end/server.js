'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.testFunc = void 0;
const express_1 = __importDefault(require('express'));
const path_1 = __importDefault(require('path'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('hello world AGAIN!');
});
app.get('/intro', (req, res) => {
    res.send('that works my dude!');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
function testFunc(a, b) {
    return a + b;
}
exports.testFunc = testFunc;
