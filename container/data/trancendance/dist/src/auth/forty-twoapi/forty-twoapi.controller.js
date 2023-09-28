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
exports.FortyTwoApiController = void 0;
const common_1 = require("@nestjs/common");
const forty_twoapi_service_1 = require("./forty-twoapi.service");
const common_2 = require("@nestjs/common");
let FortyTwoApiController = class FortyTwoApiController extends forty_twoapi_service_1.FortyTwoApiService {
    handleLogin() {
        return { url: process.env.REDIRECT_URL };
    }
    async handleRedirect(req, res) {
        const code = req.query.code;
        try {
            const token = await this.getTokenFortyTwoUser(code).toPromise();
            res.cookie('token', token);
            res.redirect('http://localhost:3000');
        }
        catch (error) {
            console.error('Erreur lors de l\'obtention de l\'access_token:', error);
        }
    }
    async handleTest(req, res) {
        const accessToken = req.cookies.token;
        if (!accessToken) {
            return { error: 'Access Token non valide' };
        }
        try {
            const response = await this.getInformationUser(accessToken, req, res).toPromise();
            if (response.data && response.data.id && response.data.login) {
                const responseData = response.data;
                const id = responseData.id;
                const username = responseData.login;
                const jwt_token = await this.signToken({
                    id: id,
                    username: username
                });
                if (!jwt_token) {
                    throw new common_2.ForbiddenException();
                }
                res.cookie('jwt_token', jwt_token);
                res.send({ message: 'Logged ' });
                await this.postGeneratetwoAuthentification(id).toPromise();
            }
            else {
                console.error('La structure de la réponse JSON de l\'API 42 est incorrecte.');
            }
            return res;
        }
        catch (error) {
            console.error('Erreur lors de la requête GET vers l\'API 42:', error);
            return { error: 'Erreur lors de la récupération des informations de l\'utilisateur' };
        }
        console.log("FIN");
    }
};
exports.FortyTwoApiController = FortyTwoApiController;
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Redirect)('http://localhost:3000/42/redirect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FortyTwoApiController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Get)('redirect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FortyTwoApiController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FortyTwoApiController.prototype, "handleTest", null);
exports.FortyTwoApiController = FortyTwoApiController = __decorate([
    (0, common_1.Controller)('42')
], FortyTwoApiController);
//# sourceMappingURL=forty-twoapi.controller.js.map