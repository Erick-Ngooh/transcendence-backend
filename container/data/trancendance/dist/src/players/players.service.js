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
            const player = await this.prisma.player.findUnique({
                where: { id },
            });
            if (!player) {
                throw new common_1.NotFoundException(`Joueur avec l'ID ${id} introuvable`);
            }
            return player;
        }
        catch (error) {
            console.error('Erreur lors de la récupération du joueur par ID', error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la récupération du joueur par ID.");
        }
    }
    async setPlayerUrlPhotoProfile(id, urlPhotoProfile) {
        try {
            const updatedPlayer = await this.prisma.player.update({
                where: { id },
                data: { urlPhotoProfile },
            });
            if (!updatedPlayer) {
                throw new common_1.NotFoundException(`Joueur avec l'ID ${id} introuvable`);
            }
            return updatedPlayer;
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour de l'URL de la photo du joueur", error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la mise à jour de l'URL de la photo du joueur.");
        }
    }
    async setPlayerPseudo(id, pseudo) {
        try {
            const updatedPlayer = await this.prisma.player.update({
                where: { id },
                data: { pseudo },
            });
            if (!updatedPlayer) {
                throw new common_1.NotFoundException(`Joueur avec l'ID ${id} introuvable`);
            }
            return updatedPlayer;
        }
        catch (error) {
            console.error("Erreur lors de la mise à jour du pseudo du joueur", error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la mise à jour du pseudo du joueur.");
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
            if (!player) {
                throw new common_1.NotFoundException(`Joueur avec l'ID ${id} introuvable`);
            }
            const matchesA = player.matchesA || [];
            const matchesB = player.matchesB || [];
            const matches = [...matchesA, ...matchesB];
            return matches;
        }
        catch (error) {
            console.error('Erreur lors de la récupération de tous les matches joués par le joueur', error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la récupération de tous les matches joués par le joueur.");
        }
    }
    async getAllPlayers() {
        try {
            const players = await this.prisma.player.findMany();
            return players;
        }
        catch (error) {
            console.error('Erreur lors de la récupération de tous les joueurs', error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la récupération de tous les joueurs.");
        }
    }
    async deletePlayer(playerId) {
        try {
            const deletedPlayer = await this.prisma.player.delete({
                where: { id: playerId },
            });
            if (!deletedPlayer) {
                throw new common_1.NotFoundException(`Joueur avec l'ID ${playerId} introuvable`);
            }
            return deletedPlayer;
        }
        catch (error) {
            console.error("Erreur lors de la suppression du joueur", error);
            throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la suppression du joueur.");
        }
    }
    async addMatchToPlayer(playerId, matchId) {
        try {
            const existingPlayer = await this.getPlayerById(playerId);
            const updatedPlayer = await this.prisma.player.update({
                where: { id: playerId },
                data: {
                    matchesA: {
                        connect: [{ id: matchId }],
                    },
                },
            });
            return updatedPlayer;
        }
        catch (error) {
            console.error("Erreur lors de l'ajout du match au joueur", error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la mise à jour du joueur.");
            }
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map