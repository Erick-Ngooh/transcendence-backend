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
    async getPlayerById(req) {
        try {
            const id = Number(req.userId);
            const player = await this.playersService.getPlayerById(id);
            return player;
        }
        catch (error) {
            throw new common_1.HttpException('Une erreur s\'est produite lors de la récupération du joueur par ID.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setPlayerUrlPhotoProfile(req, urlPhotoProfile) {
        try {
            const id = Number(req.userId);
            const updatedPlayer = await this.playersService.setPlayerUrlPhotoProfile(id, urlPhotoProfile);
            return updatedPlayer;
        }
        catch (error) {
            throw new common_1.HttpException("Une erreur s'est produite lors de la mise à jour de l'URL de la photo du joueur.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setPlayerPseudo(req, pseudo) {
        try {
            const id = Number(req.userId);
            const updatedPlayer = await this.playersService.setPlayerPseudo(id, pseudo);
            return updatedPlayer;
        }
        catch (error) {
            throw new common_1.HttpException("Une erreur s'est produite lors de la mise à jour du pseudo du joueur.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllMatchesByPlayerId(req) {
        try {
            const id = Number(req.userId);
            const matches = await this.playersService.getAllMatchesByPlayerId(id);
            return matches;
        }
        catch (error) {
            throw new common_1.HttpException("Une erreur s'est produite lors de la récupération de tous les matches joués par le joueur.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllPlayers() {
        try {
            const players = await this.playersService.getAllPlayers();
            return players;
        }
        catch (error) {
            throw new common_1.HttpException("Une erreur s'est produite lors de la récupération de tous les joueurs.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePlayer(req) {
        try {
            const playerId = req.userId;
            const deletedPlayer = await this.playersService.deletePlayer(playerId);
            return deletedPlayer;
        }
        catch (error) {
            throw new common_1.HttpException("Une erreur s'est produite lors de la suppression du joueur.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Get)('id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayerById", null);
__decorate([
    (0, common_1.Patch)('photo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('urlPhotoProfile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "setPlayerUrlPhotoProfile", null);
__decorate([
    (0, common_1.Patch)('pseudo'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('pseudo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "setPlayerPseudo", null);
__decorate([
    (0, common_1.Get)('matches'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllMatchesByPlayerId", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getAllPlayers", null);
__decorate([
    (0, common_1.Delete)('id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map