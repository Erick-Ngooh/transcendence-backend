import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { CrudService } from '../forty-twoapi/crud.service';
export declare class TwoFactorAuthenticationCodeDto {
    readonly twoFactorAuthenticationCode: string;
}
export declare class TwoFactorAuthenticationController extends CrudService {
    private readonly twoFactorAuthenticationService;
    private readonly crud;
    constructor(twoFactorAuthenticationService: TwoFactorAuthenticationService, crud: CrudService);
    register({ id }: {
        id: number;
    }, response: any): Promise<{
        qrcode: any;
    }>;
    turnOnTwoFactorAuthentication({ id }: {
        id: number;
    }, { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto): Promise<void>;
}
