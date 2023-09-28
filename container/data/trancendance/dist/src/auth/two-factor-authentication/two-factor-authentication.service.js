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
exports.TwoFactorAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const crud_service_1 = require("../forty-twoapi/crud.service");
let TwoFactorAuthenticationService = class TwoFactorAuthenticationService extends crud_service_1.CrudService {
    constructor(crud) {
        super(crud);
        this.crud = crud;
    }
    async generateTwoFactorAuthenticationSecret(userId) {
        try {
            userId = userId.toString();
            const secret = otplib_1.authenticator.generateSecret();
            const otpauthUrl = otplib_1.authenticator.keyuri(userId, process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);
            console.log(' ---- generateTwoFactorAuthenticationSecret --- ');
            console.log("Generated OTP URL:", otpauthUrl);
            console.log("Generated Secret: ", secret);
            return {
                secret,
                otpauthUrl,
            };
        }
        catch (error) {
            console.error('Error generateTwoFactorAuthenticationSecret:', error);
            throw new common_1.NotFoundException('Erreur lors de la génération du secret 2FA');
        }
    }
    async turnOnTwoFactorAuthentication(userId) {
        try {
            await this.crud.updateUserAuthenticationEnabled(userId, true);
        }
        catch (error) {
            console.error("Error turnOnTwoFactorAuthentication");
            throw new common_1.NotFoundException("Erreur lors de l'activation de la double authentification");
        }
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        try {
            return (0, qrcode_1.toFileStream)(stream, otpauthUrl);
        }
        catch (error) {
            console.error('Error pipeQrCodeStream');
            throw new common_1.NotFoundException('Erreur lors de la création du code QR');
        }
    }
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, twoFactorAuthenticationSecret) {
        try {
            console.log("Debug", twoFactorAuthenticationCode, twoFactorAuthenticationSecret);
            return otplib_1.authenticator.verify({ token: twoFactorAuthenticationCode, secret: twoFactorAuthenticationSecret });
        }
        catch (error) {
            console.log("error in isTwoFactorAuthenticationCodeValid");
            throw new common_1.NotFoundException('Erreur lors de la verification du token generer par le qrcode');
        }
    }
};
exports.TwoFactorAuthenticationService = TwoFactorAuthenticationService;
exports.TwoFactorAuthenticationService = TwoFactorAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], TwoFactorAuthenticationService);
//# sourceMappingURL=two-factor-authentication.service.js.map