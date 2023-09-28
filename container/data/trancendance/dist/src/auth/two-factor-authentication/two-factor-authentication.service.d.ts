import { Response } from 'express';
import { CrudService } from '../forty-twoapi/crud.service';
export declare class TwoFactorAuthenticationService extends CrudService {
    private readonly crud;
    constructor(crud: CrudService);
    generateTwoFactorAuthenticationSecret(userId: any): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    turnOnTwoFactorAuthentication(userId: number): Promise<void>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, twoFactorAuthenticationSecret: string): boolean;
}
