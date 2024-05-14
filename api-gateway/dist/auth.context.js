"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContext = void 0;
const common_1 = require("@nestjs/common");
const authContext = ({ req }) => {
    if (req.headers?.authorization) {
        return { user: { id: '12' } };
    }
    throw new common_1.UnauthorizedException();
};
exports.authContext = authContext;
//# sourceMappingURL=auth.context.js.map