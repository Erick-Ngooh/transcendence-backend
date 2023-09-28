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
exports.CrudService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let CrudService = class CrudService extends prisma_service_1.PrismaService {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async createUser(userObj) {
        try {
            let userItem = await this.prisma.user.findUnique({
                where: {
                    username: userObj.username,
                },
            });
            if (userItem) {
                return userItem;
            }
            this.prisma.$transaction(async (prisma) => {
                userItem = await prisma.user.create({
                    data: {
                        id: userObj.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        username: userObj.username,
                        displayname: userObj.displayname,
                        lastname: userObj.lastname,
                        firstname: userObj.firstname,
                        profileurl: userObj.profileurl,
                        emails: userObj.emails,
                        phoneNumbers: userObj.phoneNumbers,
                        photourl: userObj.photourl,
                        player: {
                            create: {
                                id: userObj.id,
                                pseudo: userObj.username,
                                urlPhotoProfile: userObj.photourl,
                            },
                        },
                    },
                    include: {
                        player: true,
                    },
                });
            });
            if (!userItem) {
                throw new Error("Erreur lors de la création de l'utilisateur");
            }
            return userItem;
        }
        catch (error) {
            console.log("ICI HE HOOOO");
            console.log("Error CRUD: ", error);
            throw error;
        }
    }
    async findUserById(id) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }
    async updateUserAuthenticationSecret(id, secret) {
        await this.prisma.user.update({
            where: { id: id },
            data: { twoFactorAuthenticationSecret: secret },
        });
    }
    async updateUserAuthenticationEnabled(id, value) {
        await this.prisma.user.update({
            where: { id: id },
            data: { isTwoFactorAuthenticationEnabled: value }
        });
    }
    async getTwoFactorAuthenticationSecret(id) {
        const user = await this.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException("Error getTwoFactorAuthenticationSecret");
        return user.twoFactorAuthenticationSecret;
    }
    async updateTwoFactorAuthenticationSecret(id, newSecret) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { twoFactorAuthenticationSecret: newSecret },
        });
        if (!updatedUser)
            throw new common_1.NotFoundException("Error getTwoFactorAuthenticationSecret");
        return updatedUser.twoFactorAuthenticationSecret;
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrudService);
//# sourceMappingURL=crud.service.js.map