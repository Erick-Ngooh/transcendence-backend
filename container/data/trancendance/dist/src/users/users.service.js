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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyUsers(id, req) {
        try {
            const userId = parseInt(id.toString(), 10);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return { user: user };
        }
        catch (error) {
            console.error("Erreur de conversion de l'ID en nombre entier :", error);
            throw new Error("L'ID fourni n'est pas un nombre entier valide.");
        }
    }
    async getUsers() {
        return await this.prisma.user.findMany();
    }
    async GetInfoUser() {
        return await this.prisma.user.findMany({ select: { id: true } });
    }
    async setTwoFactorAuthenticationSecret(secret, userId) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorAuthenticationSecret: secret },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé.`);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map