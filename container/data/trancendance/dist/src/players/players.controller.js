"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("./players.service");
let PlayersController = class PlayersController {
    constructor(playersService) {
        this.playersService = playersService;
    }
    async getPlayerById(id) {
        id = Number(id);
        return this.playersService.getPlayerById(id);
    }
    async setPlayerUrlPhotoProfile(id, urlPhotoProfile) {
        id = Number(id);
        return this.playersService.setPlayerUrlPhotoProfile(id, urlPhotoProfile);
    }
    async setPlayerPseudo(id, pseudo) {
        id = Number(id);
        return this.playersService.setPlayerPseudo(id, pseudo);
    }
    async getAllMatchesByPlayerId(id) {
        id = Number(id);
        return this.playersService.getAllMatchesByPlayerId(id);
    }
    async getAllPlayers() {
        return this.playersService.getAllPlayers();
    }
    async deletePlayer(id) {
        id = Number(id);
        return this.playersService.deletePlayer(id);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayerById", null);
__decorate([
    (0, common_1.Patch)(':id/photo'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('urlPhotoProfile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "setPlayerUrlPhotoProfile", null);
__decorate([
    (0, common_1.Patch)(':id/pseudo'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('pseudo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "setPlayerPseudo", null);
__decorate([
    (0, common_1.Get)(':id/matches'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllMatchesByPlayerId", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllPlayers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map