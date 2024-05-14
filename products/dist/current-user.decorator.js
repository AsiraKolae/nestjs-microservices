"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    try {
        const headers = ctx.getArgs()[2].req.headers;
        if (headers.user) {
            return JSON.parse(headers.user);
        }
    }
    catch (err) {
        return null;
    }
});
//# sourceMappingURL=current-user.decorator.js.map