"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
describe('app', () => {
    it('responds with a not found message', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/what-is-this-even')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
describe('GET /', () => {
    it('responds with a json message', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
            message: 'SPAvailable GATEWAY',
        }, done);
    });
});
//# sourceMappingURL=app.test.js.map