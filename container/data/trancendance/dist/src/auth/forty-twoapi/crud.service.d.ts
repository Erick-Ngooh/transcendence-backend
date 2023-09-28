import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class CrudService extends PrismaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(userObj: any): Promise<User>;
    findUserById(id: number): Promise<User | null>;
    updateUserAuthenticationSecret(id: number, secret: string): Promise<void>;
    updateUserAuthenticationEnabled(id: number, value: boolean): Promise<void>;
    getTwoFactorAuthenticationSecret(id: number): Promise<string>;
    updateTwoFactorAuthenticationSecret(id: number, newSecret: string): Promise<string>;
}
