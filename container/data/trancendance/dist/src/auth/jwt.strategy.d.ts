import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    private static extractJWT;
    validate(payload: {
        id: number;
        username: string;
    }): Promise<{
        id: number;
        username: string;
    }>;
}
export {};
