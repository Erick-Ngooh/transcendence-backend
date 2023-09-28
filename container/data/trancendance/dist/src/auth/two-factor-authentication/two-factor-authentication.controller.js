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
exports.TwoFactorAuthenticationController = exports.TwoFactorAuthenticationCodeDto = void 0;
const common_1 = require("@nestjs/common");
const two_factor_authentication_service_1 = require("./two-factor-authentication.service");
const qrcode = require("qrcode");
const crud_service_1 = require("../forty-twoapi/crud.service");
class TwoFactorAuthenticationCodeDto {
}
exports.TwoFactorAuthenticationCodeDto = TwoFactorAuthenticationCodeDto;
let TwoFactorAuthenticationController = class TwoFactorAuthenticationController extends crud_service_1.CrudService {
    constructor(twoFactorAuthenticationService, crud) {
        super(crud);
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
        this.crud = crud;
    }
    async register({ id }, response) {
        try {
            id = Number(id);
            console.log("ID ----- : ", id);
            const { secret, otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(id);
            this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
            const code = await qrcode.toDataURL(otpauthUrl);
            await this.crud.updateTwoFactorAuthenticationSecret(id, secret);
            return { qrcode: code };
        }
        catch (error) {
            console.log('Erreur dans le controller generate');
            throw new common_1.NotFoundException('Erreur lors de l\'enregistrement 2fa');
        }
    }
    async turnOnTwoFactorAuthentication({ id }, { twoFactorAuthenticationCode }) {
        try {
            id = Number(id);
            const AuthenticationSecret = await this.crud.getTwoFactorAuthenticationSecret(id);
            const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, AuthenticationSecret);
            if (!isCodeValid) {
                console.log('error in turnOnTwoFactorAuthentication invalid code: ', isCodeValid);
                throw new common_1.UnauthorizedException('Wrong authentication code');
            }
            console.log("IscodeValid: ", isCodeValid);
        }
        catch (error) {
            console.log(error, 'Error turnOnTwoFactorAuthentication invalid code 1');
            throw new common_1.NotFoundException('Erreur lors de la validation du code Authentification a double facteur');
        }
        try {
            await this.twoFactorAuthenticationService.turnOnTwoFactorAuthentication(id);
        }
        catch (error) {
            console.log('error in turnOnTwoFactorAuthentication turn on impossible');
            throw new common_1.NotFoundException('Erreur lors de l\'activation de la double Authentification');
        }
    }
};
exports.TwoFactorAuthenticationController = TwoFactorAuthenticationController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('turn-on'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, TwoFactorAuthenticationCodeDto]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthenticationController.prototype, "turnOnTwoFactorAuthentication", null);
exports.TwoFactorAuthenticationController = TwoFactorAuthenticationController = __decorate([
    (0, common_1.Controller)('2fa'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [two_factor_authentication_service_1.TwoFactorAuthenticationService,
        crud_service_1.CrudService])
], TwoFactorAuthenticationController);
//# sourceMappingURL=two-factor-authentication.controller.js.map