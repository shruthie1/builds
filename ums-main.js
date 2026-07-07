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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const express_1 = __webpack_require__(/*! express */ "express");
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async blockUserAll(tgId) {
        return await this.appService.blockUserAll(tgId);
    }
    async unblockUserAll(tgId) {
        return await this.appService.unblockUserAll(tgId);
    }
    async isRecentUser(chatId) {
        return this.appService.isRecentUser(chatId);
    }
    async updateRecentUser(chatId, videoDetails) {
        return await this.appService.updateRecentUser(chatId, videoDetails);
    }
    async resetRecentUser(chatId) {
        return this.appService.resetRecentUser(chatId);
    }
    async getPaymentStats(chatId, profile) {
        return this.appService.getPaymentStats(chatId, profile);
    }
    async sendToChannel(message, chatId, token) {
        try {
            if (message.length < 1500) {
                return await this.appService.sendToChannel(chatId, token, message);
            }
            else {
                console.log('Skipped Message:', decodeURIComponent(message));
                return 'sent';
            }
        }
        catch (e) {
            (0, common_tg_service_1.parseError)(e);
        }
    }
    async sendToAll(query) {
        try {
            const decodedEndpoint = decodeURIComponent(query);
            this.appService.sendToAll(decodedEndpoint);
            return `Send ${query}`;
        }
        catch (e) {
            (0, common_tg_service_1.parseError)(e);
            throw e;
        }
    }
    async joinChannelsforBufferClients() {
        return this.appService.joinchannelForClients();
    }
    async refreshmap() {
        return await this.appService.refreshmap();
    }
    async maskedCls(query) {
        return await this.appService.findAllMasked(query);
    }
    async portalData(query) {
        return await this.appService.portalData(query);
    }
    async requestCall(username, chatId, type) {
        return await this.appService.getRequestCall(username, chatId, type);
    }
    async refreshPrimary() {
        this.appService.refreshPrimary();
        return '1';
    }
    async refreshSecondary() {
        this.appService.refreshSecondary();
        return '2';
    }
    async exitPrimary() {
        this.appService.exitPrimary();
        return '1';
    }
    async exitSecondary() {
        this.appService.exitSecondary();
        return '2';
    }
    exit() {
        console.log('Exit request received');
        setTimeout(() => {
            console.log('Exiting application...');
            process.exit(0);
        }, 2000);
        return 'Exiting application... in 2 seconds';
    }
    async getVidData(profile, clientId, chatId) {
        return await this.appService.getUserData(profile, clientId, chatId);
    }
    async updateVidData(profile, clientId, body) {
        return await this.appService.updateUserData(profile, clientId, body);
    }
    async updtaeUserConfig(filter, data) {
        throw new Error('Method not implemented');
    }
    async getallupiIds() {
        return await this.appService.getallupiIds();
    }
    async updateUserConfig(chatId, profile, data) {
        return await this.appService.updateUserConfig(chatId, profile, data);
    }
    async getUserInfo(filter) {
        return await this.appService.getUserInfo(filter);
    }
    async getData(res) {
        this.appService.checkAndRefresh();
        res.setHeader('Content-Type', 'text/html');
        let resp = '<html><head></head><body>';
        resp += await this.appService.getData();
        resp += '</body></html>';
        resp += `<script>
                console.log("hi");
                setInterval(() => {
                  window.location.reload();
                }, 20000);
            </script>`;
        res.send(resp);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(['', '/health']),
    (0, swagger_1.ApiOperation)({ summary: 'Get health check or welcome message' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns a welcome or health check message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('blockUserAll/:tgId'),
    (0, swagger_1.ApiOperation)({ summary: 'Block user across all services' }),
    (0, swagger_1.ApiParam)({ name: 'tgId', description: 'Telegram ID of the user', type: String }),
    (0, swagger_1.ApiResponse)({ description: 'Returns result of blocking user' }),
    __param(0, (0, common_1.Param)('tgId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "blockUserAll", null);
__decorate([
    (0, common_1.Get)('unblockUserAll/:tgId'),
    (0, swagger_1.ApiOperation)({ summary: 'Unblock user across all services' }),
    (0, swagger_1.ApiParam)({ name: 'tgId', description: 'Telegram ID of the user', type: String }),
    (0, swagger_1.ApiResponse)({ description: 'Returns result of unblocking user' }),
    __param(0, (0, common_1.Param)('tgId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "unblockUserAll", null);
__decorate([
    (0, common_1.Get)('isRecentUser'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is recent and return access data' }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID of the user', type: String, required: true }),
    (0, swagger_1.ApiResponse)({ description: 'Returns count of recent accesses and video details' }),
    __param(0, (0, common_1.Query)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "isRecentUser", null);
__decorate([
    (0, common_1.Post)('isRecentUser'),
    (0, swagger_1.ApiOperation)({ summary: 'Update recent user data' }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID of the user', type: String, required: true }),
    (0, swagger_1.ApiBody)({ description: 'Video details to update', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'Successfully updated recent user data' }),
    __param(0, (0, common_1.Query)('chatId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateRecentUser", null);
__decorate([
    (0, common_1.Get)('resetRecentUser'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Reset recent user data' }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID of the user', type: String, required: true }),
    (0, swagger_1.ApiResponse)({ description: 'Returns count of recent accesses after reset' }),
    __param(0, (0, common_1.Query)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "resetRecentUser", null);
__decorate([
    (0, common_1.Get)('paymentStats'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID of the user', type: String }),
    (0, swagger_1.ApiQuery)({ name: 'profile', description: 'Profile identifier', type: String }),
    (0, swagger_1.ApiResponse)({ description: 'Returns payment statistics' }),
    __param(0, (0, common_1.Query)('chatId')),
    __param(1, (0, common_1.Query)('profile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPaymentStats", null);
__decorate([
    (0, common_1.Get)('sendToChannel'),
    (0, swagger_1.ApiOperation)({ summary: 'Send message to channel' }),
    (0, swagger_1.ApiQuery)({ name: 'msg', description: 'Message to send', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID of the channel', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Token for authentication', type: String, required: false }),
    (0, swagger_1.ApiResponse)({ description: 'Returns result of sending message to channel' }),
    __param(0, (0, common_1.Query)('msg')),
    __param(1, (0, common_1.Query)('chatId')),
    __param(2, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendToChannel", null);
__decorate([
    (0, common_1.Get)('sendToAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Send endpoint to all clients' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: 'Endpoint to send', type: String, required: true }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of endpoint sent' }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendToAll", null);
__decorate([
    (0, common_1.Get)('joinChannelsForClients'),
    (0, swagger_1.ApiOperation)({ summary: 'Join channels for clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns result of joining channels for clients' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "joinChannelsforBufferClients", null);
__decorate([
    (0, common_1.Get)('refreshmap'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh map for clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns result of refreshing map' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshmap", null);
__decorate([
    (0, common_1.Get)('maskedCls'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve masked CLS data' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: 'Query parameters', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'Returns masked CLS data' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "maskedCls", null);
__decorate([
    (0, common_1.Get)('portalData'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve portal data' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: 'Query parameters', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'Returns portal data including client and UPIs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "portalData", null);
__decorate([
    (0, common_1.Get)('/requestcall'),
    (0, swagger_1.ApiOperation)({ summary: 'Request a call' }),
    (0, swagger_1.ApiQuery)({ name: 'username', description: 'Username', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Ladder type', type: String, required: false }),
    (0, swagger_1.ApiResponse)({ description: 'Call request processed successfully' }),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('chatId')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "requestCall", null);
__decorate([
    (0, common_1.Get)('refreshPrimary'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh primary clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of primary clients refresh' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshPrimary", null);
__decorate([
    (0, common_1.Get)('refreshSecondary'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh secondary clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of secondary clients refresh' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshSecondary", null);
__decorate([
    (0, common_1.Get)('exitPrimary'),
    (0, swagger_1.ApiOperation)({ summary: 'Exit primary clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of exiting primary clients' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exitPrimary", null);
__decorate([
    (0, common_1.Get)('exitSecondary'),
    (0, swagger_1.ApiOperation)({ summary: 'Exit secondary clients' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of exiting secondary clients' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "exitSecondary", null);
__decorate([
    (0, common_1.Get)('exit'),
    (0, swagger_1.ApiOperation)({ summary: 'Exit the application' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns confirmation of application exit' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "exit", null);
__decorate([
    (0, common_1.Get)('/getviddata'),
    (0, swagger_1.ApiOperation)({ summary: 'Get video data' }),
    (0, swagger_1.ApiQuery)({ name: 'profile', description: 'Profile', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', description: 'Client ID', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'chatId', description: 'Chat ID', type: String, required: true }),
    (0, swagger_1.ApiResponse)({ description: 'Video data retrieved successfully' }),
    __param(0, (0, common_1.Query)('profile')),
    __param(1, (0, common_1.Query)('clientId')),
    __param(2, (0, common_1.Query)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getVidData", null);
__decorate([
    (0, common_1.Post)('/getviddata'),
    (0, swagger_1.ApiOperation)({ summary: 'Update video data' }),
    (0, swagger_1.ApiQuery)({ name: 'profile', description: 'Profile', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', description: 'Client ID', type: String, required: false }),
    (0, swagger_1.ApiBody)({ description: 'Body data', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'Video data updated successfully' }),
    __param(0, (0, common_1.Query)('profile')),
    __param(1, (0, common_1.Query)('clientId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateVidData", null);
__decorate([
    (0, common_1.Post)('/getUserConfig'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user configuration' }),
    (0, swagger_1.ApiQuery)({ name: 'filter', description: 'Filter parameters', type: Object }),
    (0, swagger_1.ApiBody)({ description: 'Configuration data', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'User configuration updated successfully' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updtaeUserConfig", null);
__decorate([
    (0, common_1.Get)('/getallupiIds'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all UPI IDs' }),
    (0, swagger_1.ApiResponse)({ description: 'All UPI IDs retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getallupiIds", null);
__decorate([
    (0, common_1.Post)('/updateUserData/:chatId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user configuration' }),
    (0, swagger_1.ApiParam)({ name: 'chatId', description: 'Chat ID', type: String }),
    (0, swagger_1.ApiQuery)({ name: 'profile', description: 'Profile', type: String, required: false }),
    (0, swagger_1.ApiBody)({ description: 'User data', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'User configuration updated successfully' }),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Query)('profile')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUserConfig", null);
__decorate([
    (0, common_1.Get)('/getUserInfo'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user information' }),
    (0, swagger_1.ApiQuery)({ name: 'filter', description: 'Filter parameters', type: Object }),
    (0, swagger_1.ApiResponse)({ description: 'User information retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('getdata'),
    (0, common_1.UseInterceptors)(common_tg_service_1.CloudflareCacheInterceptor),
    (0, common_tg_service_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get data and refresh periodically' }),
    (0, swagger_1.ApiResponse)({ description: 'Returns HTML data with periodic refresh' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getData", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('App Controller'),
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
const CMS = __importStar(__webpack_require__(/*! common-tg-service */ "common-tg-service"));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(CMS.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => CMS.InitModule),
            (0, common_1.forwardRef)(() => CMS.BotsModule),
            (0, common_1.forwardRef)(() => CMS.BuildModule),
            (0, common_1.forwardRef)(() => CMS.UsersModule),
            (0, common_1.forwardRef)(() => CMS.TelegramModule),
            (0, common_1.forwardRef)(() => CMS.UserDataModule),
            (0, common_1.forwardRef)(() => CMS.ClientModule),
            (0, common_1.forwardRef)(() => CMS.ActiveChannelsModule),
            (0, common_1.forwardRef)(() => CMS.UpiIdModule),
            (0, common_1.forwardRef)(() => CMS.Stat1Module),
            (0, common_1.forwardRef)(() => CMS.Stat2Module),
            (0, common_1.forwardRef)(() => CMS.PromoteStatModule),
            (0, common_1.forwardRef)(() => CMS.ChannelsModule),
            (0, common_1.forwardRef)(() => CMS.TgSignupModule),
            (0, common_1.forwardRef)(() => CMS.TimestampModule),
            (0, common_1.forwardRef)(() => CMS.TransactionModule),
            (0, common_1.forwardRef)(() => CMS.EventManagerModule),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: CMS.AuthGuard,
            },
        ]
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
var AppService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const schedule = __importStar(__webpack_require__(/*! node-schedule-tz */ "node-schedule-tz"));
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
let AppService = AppService_1 = class AppService {
    constructor(usersService, telegramService, userDataService, clientService, activeChannelsService, upiIdService, statService, stat2Service, promoteStatService, channelsService, timestampService, botsService, eventManagerService) {
        this.usersService = usersService;
        this.telegramService = telegramService;
        this.userDataService = userDataService;
        this.clientService = clientService;
        this.activeChannelsService = activeChannelsService;
        this.upiIdService = upiIdService;
        this.statService = statService;
        this.stat2Service = stat2Service;
        this.promoteStatService = promoteStatService;
        this.channelsService = channelsService;
        this.timestampService = timestampService;
        this.botsService = botsService;
        this.eventManagerService = eventManagerService;
        this.userAccessData = new Map();
        this.joinChannelMap = new Map();
        this.refresTime = 0;
        console.log('App Module Constructor initiated !!');
    }
    onModuleInit() {
        console.log('App Module initiated !!');
        this.cleanupInterval = setInterval(() => this.cleanupOldAccessData(), 15 * 60 * 1000);
        try {
            schedule.scheduleJob('test3', '25 2,9,16 * * * ', 'Asia/Kolkata', async () => {
                await (0, common_tg_service_1.fetchWithTimeout)(`${(0, common_tg_service_1.ppplbot)()}&text=ExecutingjoinchannelForClients-${process.env.clientId}`);
                const now = new Date();
                if (now.getUTCDate() % 3 === 1) {
                    this.leaveChannelsAll();
                }
                else {
                    await this.joinchannelForClients();
                }
            });
            schedule.scheduleJob('test3', '0 3 * * * ', 'Asia/Kolkata', async () => {
                try {
                    const res = await this.userDataService.removeRedundantData();
                    await this.timestampService.clear();
                    console.log("Deleted userdata older than month | count: ", res.deletedCount);
                }
                catch (e) {
                    console.error("Error Deleteing old userData", e);
                }
            });
            console.log('Added All Cron Jobs');
        }
        catch (error) {
            console.log('Some Error: ', error);
        }
    }
    async checkPromotions() {
        setInterval(async () => {
            const clients = await this.clientService.findAll();
            for (const client of clients) {
                const userPromoteStats = await this.promoteStatService.findByClient(client.clientId);
                if (userPromoteStats?.isActive &&
                    (Date.now() - userPromoteStats?.lastUpdatedTimeStamp) / (1000 * 60) >
                        6) {
                    try {
                        await (0, common_tg_service_1.fetchWithTimeout)(`${client.repl}/promote`, {
                            timeout: 120000,
                        });
                        console.log(client.clientId, ': Promote Triggered!!');
                    }
                    catch (error) {
                        (0, common_tg_service_1.parseError)(error, 'Promotion Check Err');
                    }
                }
                else {
                    console.log(client.clientId, ': ALL Good!! ---', Math.floor((Date.now() - userPromoteStats?.lastUpdatedTimeStamp) /
                        (1000 * 60)));
                }
            }
        }, 240000);
    }
    async getPromotionStatsPlain() {
        let resp = '';
        const result = await this.promoteStatService.findAll();
        for (const data of result) {
            resp += `\n${data.client.toUpperCase()} : ${data.totalCount} ${data.totalCount > 0 ? ` | ${Number((Date.now() - data.lastUpdatedTimeStamp) / (1000 * 60)).toFixed(2)}` : ''}`;
        }
        return resp;
    }
    async leaveChannelsAll() {
        await this.sendToAll('leavechannels');
    }
    async sendToAll(endpoint) {
        const clients = await this.clientService.findAll();
        for (const client of clients) {
            const url = `${client.repl}/${endpoint}`;
            console.log('Trying : ', url);
            (0, common_tg_service_1.fetchWithTimeout)(url);
            await (0, Helpers_1.sleep)(2000);
        }
    }
    async exitPrimary() {
        const clients = await this.clientService.findAll();
        for (const client of clients) {
            if (client.clientId.toLowerCase().includes('1')) {
                await (0, common_tg_service_1.fetchWithTimeout)(`${client.repl}/exit`);
                await (0, Helpers_1.sleep)(40000);
            }
        }
    }
    async exitSecondary() {
        const clients = await this.clientService.findAll();
        for (const client of clients) {
            if (client.clientId.toLowerCase().includes('2')) {
                await (0, common_tg_service_1.fetchWithTimeout)(`${client.repl}/exit`);
                await (0, Helpers_1.sleep)(40000);
            }
        }
    }
    async refreshPrimary() {
        const clients = await this.clientService.findAll();
        for (const client of clients) {
            if (client.clientId.toLowerCase().includes('1')) {
                await (0, common_tg_service_1.fetchWithTimeout)(`${client.repl}/exec/refresh`);
                await (0, Helpers_1.sleep)(40000);
            }
        }
    }
    async refreshSecondary() {
        const clients = await this.clientService.findAll();
        for (const client of clients) {
            if (client.clientId.toLowerCase().includes('2')) {
                await (0, common_tg_service_1.fetchWithTimeout)(`${client.repl}/exec/refresh`);
                await (0, Helpers_1.sleep)(40000);
            }
        }
    }
    async getUser(limit, skip) {
        const currentDate = new Date();
        const weekAgoDate = new Date(currentDate);
        weekAgoDate.setDate(currentDate.getDate() - 7);
        const monthAgoDate = new Date(currentDate);
        monthAgoDate.setDate(currentDate.getDate() - 30);
        const threeMonthAgoDate = new Date(currentDate);
        threeMonthAgoDate.setDate(currentDate.getDate() - 90);
        const query = {
            expired: false,
            $or: [
                { createdAt: { $gt: monthAgoDate }, updatedAt: { $lt: weekAgoDate } },
                {
                    createdAt: { $lte: monthAgoDate, $gt: threeMonthAgoDate },
                    updatedAt: { $lt: monthAgoDate },
                },
                {
                    createdAt: { $lte: threeMonthAgoDate },
                    updatedAt: { $lte: threeMonthAgoDate },
                },
            ],
        };
        const users = await this.usersService.executeQuery(query, {}, limit || 300, skip || 0);
        return users;
    }
    getHello() {
        return 'Hello World!';
    }
    cleanupOldAccessData() {
        const currentTime = Date.now();
        for (const [chatId, accessData] of this.userAccessData.entries()) {
            const recentAccessData = accessData.timestamps.filter((timestamp) => currentTime - timestamp <= 15 * 60 * 1000);
            if (recentAccessData.length === 0) {
                this.userAccessData.delete(chatId);
            }
            else if (recentAccessData.length < accessData.timestamps.length) {
                this.userAccessData.set(chatId, {
                    timestamps: recentAccessData,
                    videoDetails: accessData.videoDetails,
                });
            }
        }
    }
    async isRecentUser(chatId) {
        const accessData = this.userAccessData.get(chatId) || {
            timestamps: [],
            videoDetails: {},
        };
        const currentTime = Date.now();
        const recentAccessData = accessData.timestamps.filter((timestamp) => currentTime - timestamp <= 15 * 60 * 1000);
        recentAccessData.push(currentTime);
        this.userAccessData.set(chatId, {
            videoDetails: accessData.videoDetails,
            timestamps: recentAccessData,
        });
        const result = {
            count: recentAccessData.length,
            videoDetails: accessData.videoDetails,
        };
        console.log('Get', chatId, result);
        return result;
    }
    async updateRecentUser(chatId, videoDetails) {
        const accessData = this.userAccessData.get(chatId) || {
            timestamps: [],
            videoDetails: {},
        };
        const updatedVideoDetails = { ...accessData.videoDetails, ...videoDetails };
        this.userAccessData.set(chatId, {
            videoDetails: updatedVideoDetails,
            timestamps: accessData.timestamps,
        });
        const result = {
            count: accessData.timestamps.length,
            videoDetails: updatedVideoDetails,
        };
        console.log('Update:', chatId, {
            videoDetails: updatedVideoDetails,
            timestamps: accessData.timestamps,
        });
        return result;
    }
    async resetRecentUser(chatId) {
        this.userAccessData.delete(chatId);
        console.log('Deleted User Access Data for: ', chatId);
        return { count: 0 };
    }
    async getPaymentStats(chatId, profile) {
        const resp = {
            paid: 0,
            demoGiven: 0,
            secondShow: 0,
            fullShow: 0,
            latestCallTime: 0,
            canCall: true,
            videos: [],
        };
        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
        const twentyDays = Date.now() - 20 * 24 * 60 * 60 * 1000;
        try {
            const query1 = {
                chatId,
                profile: { $exists: true, $ne: profile },
                payAmount: { $gte: 10 },
            };
            const query2 = { chatId, profile: { $exists: true, $ne: profile } };
            const document = await this.userDataService.executeQuery(query1);
            const document2 = await this.userDataService.executeQuery(query2);
            if (document.length > 0) {
                resp.paid = document.length;
            }
            if (document2.length > 0) {
                for (const doc of document2) {
                    if (doc.canReply == 0 && doc.lastMsgTimeStamp > threeDaysAgo) {
                        resp.canCall = false;
                    }
                    if (doc.callTime > threeDaysAgo) {
                        if (doc.demoGiven) {
                            resp.demoGiven++;
                        }
                        if (doc.secondShow) {
                            resp.secondShow++;
                        }
                        if (doc.fullShow) {
                            resp.fullShow++;
                        }
                        if (doc.callTime > resp.latestCallTime) {
                            resp.latestCallTime = doc.callTime;
                        }
                        resp.videos.push(...doc.videos);
                    }
                    else {
                        if (doc.lastMsgTimeStamp < twentyDays) {
                            await (0, common_tg_service_1.fetchWithTimeout)(`${(0, common_tg_service_1.ppplbot)()}&text=${encodeURIComponent(`ReSetting UserData for Profile: ${doc.profile} | ChatId: ${doc.chatId}\n\n LastMsg: ${getReadableTimeDifference(doc.lastMsgTimeStamp, Date.now())} `)}`);
                            await this.userDataService.update(doc.profile, doc.chatId, {
                                payAmount: 0,
                                demoGiven: false,
                                secondShow: false,
                                highestPayAmount: 0,
                                lastMsgTimeStamp: Date.now()
                            });
                        }
                    }
                }
            }
        }
        catch (error) {
            (0, common_tg_service_1.parseError)(error);
        }
        console.log(resp);
        return resp;
    }
    async sendToChannel(chatId, token, message) {
        function decodeIfEncoded(str) {
            try {
                return str !== decodeURIComponent(str) ? decodeURIComponent(str) : str;
            }
            catch (e) {
                return str;
            }
        }
        function escapeMarkdownV2(text) {
            text = text.replace(/([\\_*`\[\]()~>#+\-=|{}.!])/g, '\\$1');
            return text;
        }
        const decodedMessage = decodeIfEncoded(message);
        console.log('Message:', decodedMessage);
        const category = !token ? AppService_1.CHANNEL_CATEGORY_MAP[chatId] : undefined;
        if (category) {
            try {
                const sent = await this.botsService.sendMessageByCategory(category, decodedMessage);
                if (sent)
                    return { ok: true };
                console.warn(`sendToChannel: category ${category} send returned falsy; falling back to ppplbot`);
            }
            catch (error) {
                (0, common_tg_service_1.parseError)(error, `sendToChannel category ${category}`, false);
            }
        }
        const escapedMessage = escapeMarkdownV2(decodedMessage);
        const encodedMessage = encodeURIComponent(escapedMessage).replace(/%5Cn/g, '%0A');
        const url = `${(0, common_tg_service_1.ppplbot)(chatId, token)}&parse_mode=MarkdownV2&text=${encodedMessage}`;
        return (await (0, common_tg_service_1.fetchWithTimeout)(url, {}, 0))?.data;
    }
    async findAllMasked(query) {
        return await this.clientService.findAllMasked();
    }
    async portalData(query) {
        const client = (await this.clientService.findAllMasked())[0];
        const upis = await this.upiIdService.findOne();
        return { client, upis };
    }
    async joinchannelForClients() {
        console.log('Joining Channel Started');
        await (0, Helpers_1.sleep)(2000);
        const clients = await this.clientService.findAll();
        clients.map(async (document) => {
            try {
                const resp = await (0, common_tg_service_1.fetchWithTimeout)(`${document.repl}/channelinfo`, { timeout: 200000 }, 1);
                await (0, common_tg_service_1.fetchWithTimeout)(`${(0, common_tg_service_1.ppplbot)()}&text=Channel SendTrue :: ${document.clientId}: ${resp.data.canSendTrueCount}`);
                if (resp?.data?.canSendTrueCount &&
                    resp?.data?.canSendTrueCount < 350) {
                    const result = await this.activeChannelsService.getActiveChannels(150, 0, resp.data?.ids);
                    await (0, common_tg_service_1.fetchWithTimeout)(`${(0, common_tg_service_1.ppplbot)()}&text=Started Joining Channels for ${document.clientId}: ${result.length}`);
                    this.joinChannelMap.set(document.repl, result);
                }
            }
            catch (error) {
                (0, common_tg_service_1.parseError)(error);
            }
        });
        this.joinChannelQueue();
        console.log('Joining Channel Triggered Succesfully for ', clients.length);
        return 'Initiated Joining channels';
    }
    async joinChannelQueue() {
        this.joinChannelIntervalId = setInterval(async () => {
            const keys = Array.from(this.joinChannelMap.keys());
            if (keys.length > 0) {
                console.log('In JOIN CHANNEL interval: ', new Date().toISOString());
                const promises = keys.map(async (url) => {
                    const channels = this.joinChannelMap.get(url);
                    if (channels && channels.length > 0) {
                        const channel = channels.shift();
                        console.log(url, ' Pending Channels :', channels.length);
                        this.joinChannelMap.set(url, channels);
                        try {
                            await (0, common_tg_service_1.fetchWithTimeout)(`${url}/joinchannel?username=${channel.username}`);
                            console.log(url, ' Trying to join :', channel.username);
                        }
                        catch (error) {
                            (0, common_tg_service_1.parseError)(error, 'Outer Err: ');
                        }
                    }
                    else {
                        this.joinChannelMap.delete(url);
                    }
                });
                await Promise.all(promises);
            }
            else {
                this.clearJoinChannelInterval();
            }
        }, 3 * 60 * 1000);
    }
    clearJoinChannelInterval() {
        if (this.joinChannelIntervalId) {
            console.log('Cleared joinChannel Set Interval');
            clearInterval(this.joinChannelIntervalId);
            this.joinChannelIntervalId = null;
        }
    }
    async refreshmap() {
        await this.clientService.refreshMap();
    }
    async blockUserAll(chatId) {
        let profileData = '';
        const userDatas = await this.userDataService.search({ chatId });
        for (const userData of userDatas) {
            const profileRegex = new RegExp(userData.profile, 'i');
            const profiles = await this.clientService.executeQuery({
                clientId: { $regex: profileRegex },
            });
            for (const profile of profiles) {
                const url = `${profile.repl}/blockuser/${chatId}`;
                console.log('Executing: ', url);
                const result = await (0, common_tg_service_1.fetchWithTimeout)(url);
                console.log(result.data);
            }
            profileData = profileData + ' | ' + userData.profile;
        }
        return profileData;
    }
    async unblockUserAll(chatId) {
        let profileData = '';
        const userDatas = await this.userDataService.search({ chatId });
        for (const userData of userDatas) {
            const profileRegex = new RegExp(userData.profile, 'i');
            const profiles = await this.clientService.executeQuery({
                clientId: { $regex: profileRegex },
            });
            for (const profile of profiles) {
                const url = `${profile.repl}/unblockuser/${chatId}`;
                console.log('Executing: ', url);
                const result = await (0, common_tg_service_1.fetchWithTimeout)(url);
                console.log(result.data);
            }
            profileData = profileData + ' | ' + userData.profile;
        }
        return profileData;
    }
    async getRequestCall(username, chatId, type = '1') {
        const user = (await this.clientService.search({ username: username.toLowerCase() }))[0];
        console.log(`Call Request Recived: ${username} | ${chatId}`);
        if (user) {
            return await this.eventManagerService.schedulePaidEvents(chatId, user.clientId, type);
        }
        return { message: 'No Such User Found' };
    }
    async getUserData(profile, clientId, chatId) {
        if (!profile) {
            profile = clientId?.replace(/\d/g, '');
        }
        return await this.userDataService.findOne(profile, chatId);
    }
    async updateUserData(profile, clientId, body) {
        if (!profile) {
            profile = clientId?.replace(/\d/g, '');
        }
        const chatId = body.chatId;
        return await this.userDataService.update(profile, chatId, body);
    }
    async updateUserConfig(chatId, profile, data) {
        this.userDataService.update(profile, chatId, data);
    }
    async getallupiIds() {
        return await this.upiIdService.findOne();
    }
    async getUserInfo(filter) {
        const client = (await this.clientService.executeQuery(filter))[0];
        const result = { ...(client._doc ? client._doc : client) };
        delete result['session'];
        delete result['mobile'];
        delete result['deployKey'];
        delete result['promoteMobile'];
        return result;
    }
    extractNumberFromString(inputString) {
        const regexPattern = /\d+/;
        const matchResult = inputString?.match(regexPattern);
        if (matchResult && matchResult.length > 0) {
            return parseInt(matchResult[0], 10);
        }
        return null;
    }
    async createInitializedObject() {
        const clients = await this.clientService.findAll();
        const initializedObject = {};
        for (const user of clients) {
            if (this.extractNumberFromString(user.clientId))
                initializedObject[user.clientId.toUpperCase()] = {
                    profile: user.clientId.toUpperCase(),
                    totalCount: 0,
                    totalPaid: 0,
                    totalOldPaid: 0,
                    oldPaidDemo: 0,
                    totalpendingDemos: 0,
                    oldPendingDemos: 0,
                    totalNew: 0,
                    totalNewPaid: 0,
                    newPaidDemo: 0,
                    newPendingDemos: 0,
                    names: '',
                    fullShowPPl: 0,
                    fullShowNames: '',
                };
        }
        return initializedObject;
    }
    async getData() {
        const profileData = await this.createInitializedObject();
        const stats = await this.statService.findAll();
        for (const stat of stats) {
            const { count, newUser, payAmount, demoGivenToday, demoGiven, client, name, secondShow, } = stat;
            if (client && profileData[client.toUpperCase()]) {
                const userData = profileData[client.toUpperCase()];
                userData.totalCount += count;
                userData.totalPaid += payAmount > 0 ? 1 : 0;
                userData.totalOldPaid += payAmount > 0 && !newUser ? 1 : 0;
                userData.oldPaidDemo += demoGivenToday && !newUser ? 1 : 0;
                userData.totalpendingDemos += payAmount > 25 && !demoGiven ? 1 : 0;
                userData.oldPendingDemos +=
                    payAmount > 25 && !demoGiven && !newUser ? 1 : 0;
                if (payAmount > 25 && !demoGiven) {
                    userData.names = userData.names + ` ${name} |`;
                }
                if (demoGiven &&
                    ((payAmount > 90 && !secondShow) || (payAmount > 150 && secondShow))) {
                    userData.fullShowPPl++;
                    userData.fullShowNames = userData.fullShowNames + ` ${name} |`;
                }
                if (newUser) {
                    userData.totalNew += 1;
                    userData.totalNewPaid += payAmount > 0 ? 1 : 0;
                    userData.newPaidDemo += demoGivenToday ? 1 : 0;
                    userData.newPendingDemos += payAmount > 25 && !demoGiven ? 1 : 0;
                }
            }
        }
        const profileDataArray = Object.entries(profileData);
        profileDataArray.sort((a, b) => b[1].totalpendingDemos - a[1].totalpendingDemos);
        let reply = '';
        for (const [profile, userData] of profileDataArray) {
            reply += `${profile.toUpperCase()} : <b>${userData.totalpendingDemos}</b> | ${userData.names}<br>`;
        }
        profileDataArray.sort((a, b) => b[1].fullShowPPl - a[1].fullShowPPl);
        let reply2 = '';
        for (const [profile, userData] of profileDataArray) {
            reply2 += `${profile.toUpperCase()} : <b>${userData.fullShowPPl}</b> |${userData.fullShowNames}<br>`;
        }
        const reply3 = await this.getPromotionStats();
        console.log(reply3);
        return `<div>
        <div style="display: flex; margin-bottom: 60px">
          <div style="flex: 1;">${reply} </div>
      < div style = "flex: 1; " > ${reply2} </div>
        </div>
        < div style = "display: flex;" >
          <div style="flex: 1; " > ${reply3} </div>
            </div>
            </div>`;
    }
    async getPromotionStats() {
        let resp = '';
        const result = await this.promoteStatService.findAll();
        for (const data of result) {
            resp += `${data.client.toUpperCase()} : <b>${data.totalCount}</b>${data.totalCount > 0 ? ` | ${Number((Date.now() - data.lastUpdatedTimeStamp) / (1000 * 60)).toFixed(2)}` : ''}<br>`;
        }
        return resp;
    }
    async checkAndRefresh() {
        if (Date.now() > this.refresTime) {
            this.refresTime = Date.now() + 5 * 60 * 1000;
            const clients = await this.clientService.findAll();
            for (const value of clients) {
                await (0, common_tg_service_1.fetchWithTimeout)(`${value.repl}/markasread`);
                await (0, Helpers_1.sleep)(3000);
            }
        }
    }
    onModuleDestroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        if (this.joinChannelIntervalId) {
            clearInterval(this.joinChannelIntervalId);
        }
    }
};
exports.AppService = AppService;
AppService.CHANNEL_CATEGORY_MAP = {
    '-1002529408777': common_tg_service_1.ChannelCategory.VC_NOTIFICATIONS,
    '-1002472867139': common_tg_service_1.ChannelCategory.VC_WARNINGS,
};
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_tg_service_1.UsersService,
        common_tg_service_1.TelegramService,
        common_tg_service_1.UserDataService,
        common_tg_service_1.ClientService,
        common_tg_service_1.ActiveChannelsService,
        common_tg_service_1.UpiIdService,
        common_tg_service_1.Stat1Service,
        common_tg_service_1.Stat2Service,
        common_tg_service_1.PromoteStatService,
        common_tg_service_1.ChannelsService,
        common_tg_service_1.TimestampService,
        common_tg_service_1.BotsService,
        common_tg_service_1.EventManagerService])
], AppService);
function getReadableTimeDifference(ms1, ms2) {
    const diff = Math.abs(ms1 - ms2);
    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    let result = [];
    if (days > 0)
        result.push(`${days}d`);
    if (hours > 0)
        result.push(`${hours}h`);
    if (minutes > 0)
        result.push(`${minutes}m`);
    if (secs > 0 || result.length === 0)
        result.push(`${secs}s`);
    return result.join(" ");
}


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
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
        next();
    });
    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
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
        transformOptions: {
            enableImplicitConversion: true
        },
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
        console.log("CTS exit Request");
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

/***/ "common-tg-service"
/*!************************************!*\
  !*** external "common-tg-service" ***!
  \************************************/
(module) {

module.exports = require("common-tg-service");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

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

/***/ "telegram/Helpers"
/*!***********************************!*\
  !*** external "telegram/Helpers" ***!
  \***********************************/
(module) {

module.exports = require("telegram/Helpers");

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