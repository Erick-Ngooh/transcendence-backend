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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const players_service_1 = require("../players/players.service");
let GameService = class GameService {
    constructor(prisma, playersService) {
        this.prisma = prisma;
        this.playersService = playersService;
    }
    async createMatch(playerAId, playerBId) {
        const playerA = await this.playersService.getPlayerById(playerAId);
        const playerB = await this.playersService.getPlayerById(playerBId);
        if (!playerA)
            throw new common_1.NotFoundException(`Player with ID ${playerAId} not found`);
        if (!playerB)
            throw new common_1.NotFoundException(`Player with ID ${playerBId} not found`);
        try {
            playerAId = Number(playerAId);
            playerBId = Number(playerBId);
            const match = await this.prisma.match.create({
                data: {
                    playerAId,
                    playerBId,
                },
            });
            return match;
        }
        catch (error) {
            console.error("Error in createMatch", error);
            throw new common_1.InternalServerErrorException("An error occurred while creating the match.");
        }
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        players_service_1.PlayersService])
], GameService);
//# sourceMappingURL=game.service.js.map