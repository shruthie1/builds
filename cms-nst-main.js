/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.controller.ts"
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
        this.logger.log('App Controller Constructor initiated!!');
    }
    getHello() {
        return this.appService.getHello();
    }
    async setupClient(clientId, setupClientQueryDto) {
        this.appService.setupClient(clientId, setupClientQueryDto);
        return `Started Client Setup for ${clientId}`;
    }
    exit() {
        this.logger.warn('Exit API called — shutting down in 2 seconds...');
        setTimeout(() => {
            this.logger.warn('Exiting the application now...');
            process.exit(1);
        }, 2000);
        return 'Exiting in 2 seconds';
    }
    async refreshmap() {
        return this.appService.refreshmap();
    }
    async forward(query) {
        const { url, ...params } = query;
        if (!url || typeof url !== 'string') {
            throw new common_1.BadRequestException('The "url" query parameter is required and must be a valid string.');
        }
        try {
            new URL(url);
        }
        catch {
            throw new common_1.BadRequestException('The provided "url" is not a valid URL.');
        }
        this.logger.log(`Forwarding GET request to ${url} with params: ${JSON.stringify(params)}`);
        return await this.appService.forwardGetRequest(url, params);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('setupClient/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Set up a Telegram client with query parameters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Client setup initiated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid setup parameters.' }),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_tg_service_1.SetupClientQueryDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setupClient", null);
__decorate([
    (0, common_1.Get)('exit'),
    (0, swagger_1.ApiOperation)({ summary: 'Exit the running process (for dev/debug only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Process will exit after 2 seconds.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "exit", null);
__decorate([
    (0, common_1.Get)('refreshmap'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh internal client service map' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Client map refreshed successfully.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshmap", null);
__decorate([
    (0, common_1.Get)('forward'),
    (0, swagger_1.ApiOperation)({ summary: 'Forward a GET request to an external URL with query parameters' }),
    (0, swagger_1.ApiQuery)({ name: 'url', required: true, description: 'The full external URL to forward to' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Response from the forwarded request.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Missing or invalid "url" query parameter.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "forward", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);


/***/ },

/***/ "./src/app.module.ts"
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const cts = __importStar(__webpack_require__(/*! common-tg-service */ "common-tg-service"));
const AMS = __importStar(__webpack_require__(/*! ams-ssk */ "ams-ssk"));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cts.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => cts.InitModule),
            AMS.FileModule.forRoot(),
            (0, common_1.forwardRef)(() => cts.BuildModule),
            (0, common_1.forwardRef)(() => cts.BotsModule),
            (0, common_1.forwardRef)(() => cts.ClientModule),
            (0, common_1.forwardRef)(() => cts.BufferClientModule),
            (0, common_1.forwardRef)(() => cts.ChannelsModule),
            (0, common_1.forwardRef)(() => cts.UsersModule),
            (0, common_1.forwardRef)(() => cts.UserDataModule),
            (0, common_1.forwardRef)(() => cts.PromoteClientModule),
            (0, common_1.forwardRef)(() => cts.TelegramModule),
            (0, common_1.forwardRef)(() => cts.UpiIdModule),
            (0, common_1.forwardRef)(() => cts.EventManagerModule),
            (0, common_1.forwardRef)(() => cts.PromoteMsgModule),
            (0, common_1.forwardRef)(() => cts.TransactionModule),
            (0, common_1.forwardRef)(() => cts.TimestampModule),
            (0, common_1.forwardRef)(() => cts.TgSignupModule),
            (0, common_1.forwardRef)(() => cts.ActiveChannelsModule),
            (0, common_1.forwardRef)(() => cts.Stat1Module),
            (0, common_1.forwardRef)(() => cts.Stat2Module),
            (0, common_1.forwardRef)(() => cts.WebshareProxyModule),
            (0, common_1.forwardRef)(() => cts.PromoteStatModule),
            (0, common_1.forwardRef)(() => cts.SessionModule),
            (0, common_1.forwardRef)(() => cts.IpManagementModule),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: cts.AuthGuard,
            },
        ],
    })
], AppModule);


/***/ },

/***/ "./src/app.service.ts"
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule = __importStar(__webpack_require__(/*! node-schedule-tz */ "node-schedule-tz"));
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
let AppService = AppService_1 = class AppService {
    constructor(clientService, bufferClientService) {
        this.clientService = clientService;
        this.bufferClientService = bufferClientService;
        this.logger = new common_1.Logger(AppService_1.name);
        this.logger.log('App Module Constructor initiated!!');
    }
    onModuleInit() {
        this.logger.log('App Module initiated!!');
        this.scheduleJobs();
        if (!process.env.LOCAL_SERVER) {
            setTimeout(async () => {
                this.logger.log('Initial joinchannelForBufferClients triggered after 60s');
                await this.safeCall(() => this.bufferClientService.joinchannelForBufferClients());
            }, 60000);
        }
    }
    scheduleJobs() {
        try {
            schedule.scheduleJob('bufferCheck', '25 2 * * *', 'Asia/Kolkata', async () => {
                this.logger.log('Running scheduled job: bufferCheck');
                await this.safeCall(() => this.bufferClientService.checkBufferClients());
            });
            schedule.scheduleJob('bufferJoin', '0 */3 * * *', 'Asia/Kolkata', async () => {
                this.logger.log('Running scheduled job: bufferJoin');
                await this.safeCall(() => this.bufferClientService.joinchannelForBufferClients());
            });
            schedule.scheduleJob('weekly-monthly-maintenance', '25 0 * * *', async () => {
                this.handleMaintenanceTasks();
            });
        }
        catch (error) {
            this.logger.error('Error scheduling jobs', error);
        }
    }
    async handleMaintenanceTasks() {
        const now = new Date();
        if (now.getUTCDate() % 5 === 0) {
            await (0, common_tg_service_1.fetchWithTimeout)(`${(0, common_tg_service_1.ppplbot)()}&text=Updating Buffer Clients Info`);
            await this.bufferClientService.updateInfo();
        }
    }
    async safeCall(task, context = 'Scheduled Task') {
        try {
            return await task();
        }
        catch (error) {
            const err = error;
            this.logger.error(`Error during ${context}`, err.stack || err.message);
            return undefined;
        }
    }
    refreshmap() {
        this.logger.log('Refreshing client map');
        this.clientService.refreshMap();
    }
    async setupClient(clientId, setupClientQueryDto) {
        this.logger.log(`Setting up client: ${clientId}`);
        return this.clientService.setupClient(clientId, setupClientQueryDto);
    }
    getHello() {
        return 'Hello World!';
    }
    async forwardGetRequest(externalUrl, queryParams) {
        try {
            this.logger.log(`Forwarding GET request to ${externalUrl} with params ${JSON.stringify(queryParams)}`);
            const response = await axios_1.default.get(externalUrl, { params: queryParams });
            return response.data;
        }
        catch (error) {
            const axiosErr = error;
            this.logger.error(`Error forwarding GET request: ${axiosErr.message}`, axiosErr.stack);
            throw new Error(`Error forwarding GET request: ${axiosErr.message}`);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_tg_service_1.ClientService,
        common_tg_service_1.BufferClientService])
], AppService);


/***/ },

/***/ "./src/main.ts"
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: common_tg_service_1.Logger
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS and Express API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
        .build();
    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    });
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    });
    document.components ??= {};
    document.components.securitySchemes ??= {};
    document.security = [{ 'x-api-key': [] }];
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
    swagger_1.SwaggerModule.setup('apim', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            authAction: {
                'x-api-key': {
                    name: 'x-api-key',
                    schema: { type: 'apiKey', in: 'header', name: 'x-api-key' },
                    value: process.env.API_KEY || 'santoor',
                },
            },
        },
    });
    mongoose_1.default.set('debug', true);
    app.useGlobalFilters(new common_tg_service_1.ExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    process.on('uncaughtException', (reason, promise) => {
        console.log('Uncaught Exception at:');
        console.error(promise, reason);
    });
    let isShuttingDown = false;
    const shutdown = async (signal) => {
        if (isShuttingDown)
            return;
        isShuttingDown = true;
        console.log(`${signal} received`);
        console.log('CTS exit Request');
        await app.close();
        process.exit(0);
    };
    process.on('exit', async () => {
        console.log('Application closed');
    });
    process.on('SIGINT', async () => {
        console.log('SIGINT received');
        await shutdown('SIGINT');
    });
    process.on('SIGTERM', async () => {
        console.log('SIGTERM received');
        await shutdown('SIGTERM');
    });
    process.on('SIGQUIT', async () => {
        console.log('SIGQUIT received');
        await shutdown('SIGQUIT');
    });
    await app.init();
    await app.listen(process.env.PORT || 9000);
    console.log(`Application is running on: http://localhost:${process.env.PORT || 9000}`);
}
bootstrap();


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "ams-ssk"
/*!**************************!*\
  !*** external "ams-ssk" ***!
  \**************************/
(module) {

module.exports = require("ams-ssk");

/***/ },

/***/ "axios"
/*!************************!*\
  !*** external "axios" ***!
  \************************/
(module) {

module.exports = require("axios");

/***/ },

/***/ "common-tg-service"
/*!************************************!*\
  !*** external "common-tg-service" ***!
  \************************************/
(module) {

module.exports = require("common-tg-service");

/***/ },

/***/ "mongoose"
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
(module) {

module.exports = require("mongoose");

/***/ },

/***/ "node-schedule-tz"
/*!***********************************!*\
  !*** external "node-schedule-tz" ***!
  \***********************************/
(module) {

module.exports = require("node-schedule-tz");

/***/ },

/***/ "reflect-metadata"
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
(module) {

module.exports = require("reflect-metadata");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	const __webpack_export_target__ = exports;
/******/ 	for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map