"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const products_module_1 = require("./products.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(products_module_1.ProductsModule);
    await app.listen(3002);
}
bootstrap();