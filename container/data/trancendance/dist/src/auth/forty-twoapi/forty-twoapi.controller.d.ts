import { FortyTwoApiService } from './forty-twoapi.service';
export declare class FortyTwoApiController extends FortyTwoApiService {
    handleLogin(): {
        url: string;
    };
    handleRedirect(req: any, res: any): Promise<void>;
    handleTest(req: any, res: any): Promise<any>;
}
