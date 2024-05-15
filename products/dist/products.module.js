"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_resolver_1 = require("./products.resolver");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const mongoose_1 = require("@nestjs/mongoose");
const product_entity_1 = require("./entities/product.entity");
const users_resolver_1 = require("./users.resolver");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: {
                    federation: 2,
                },
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://Asira:test@nestjs.75txxey.mongodb.net/NestJs'),
            mongoose_1.MongooseModule.forFeature([{ name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema }]),
        ],
        providers: [products_resolver_1.ProductsResolver, products_service_1.ProductsService, users_resolver_1.UsersResolver],
    })
], ProductsModule);