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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PlayersService = class PlayersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlayerById(id) {
        try {
            let player = await this.prisma.player.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (player)
                return player;
            throw new common_1.NotFoundException();
        }
        catch (error) {
            console.log("Error in getPlayerById");
            throw new common_1.NotFoundException("Error in getPlayerById: Une erreur s'est produite lors de la recherche du joueur à partir de son ID.");
        }
    }
    async setPlayerUrlPhotoProfile(id, urlPhotoProfile) {
        try {
            const updatedPlayer = await this.prisma.player.update({
                where: { id },
                data: { urlPhotoProfile },
            });
            if (updatedPlayer)
                return updatedPlayer;
            throw new common_1.NotFoundException();
        }
        catch (error) {
            console.log("Error in setPlayerUrlPhotoProfile");
            throw new Error("Error in setPlayerUrlPhotoProfile: Une erreur s'est produite lors de la mise à jour de l'URL de la photo de profil du joueur.");
        }
    }
    async setPlayerPseudo(id, pseudo) {
        try {
            const updatedPlayer = await this.prisma.player.update({
                where: { id },
                data: { pseudo },
            });
            if (updatedPlayer)
                return updatedPlayer;
            throw new common_1.NotFoundException();
        }
        catch (error) {
            console.log("Error in updatePlayerPseudo");
            throw new Error("Error in updatePlayerPseudo: Une erreur s'est produite lors de la mise à jour du pseudo du joueur.");
        }
    }
    async getAllMatchesByPlayerId(id) {
        try {
            const player = await this.prisma.player.findUnique({
                where: { id },
                include: {
                    matchesA: true,
                    matchesB: true,
                },
            });
            if (player) {
                const matchesA = player.matchesA || [];
                const matchesB = player.matchesB || [];
                const matches = [...matchesA, ...matchesB];
                return matches;
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            console.log("Error in getAllMatchesByPlayerId");
            throw new common_1.NotFoundException("Error in getAllMatchesByPlayerId: Une erreur s'est produite lors de la recherche de tous les matches joués par le joueur.");
        }
    }
    async getAllPlayers() {
        try {
            const players = await this.prisma.player.findMany();
            return players;
        }
        catch (error) {
            console.log("Error in getAllPlayers");
            throw new Error("Error in getAllPlayers: Une erreur s'est produite lors de la récupération des joueurs.");
        }
    }
    async deletePlayer(playerId) {
        try {
            const deletedPlayer = await this.prisma.player.delete({
                where: {
                    id: playerId,
                },
            });
            return deletedPlayer;
        }
        catch (error) {
            console.log("deletePlayer");
            throw new Error("deletePlayer: Une erreur s'est produite lors de la suppression du joueur.");
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map