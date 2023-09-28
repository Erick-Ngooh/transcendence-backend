import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyUsers(id: number, req: Request): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            displayname: string;
            lastname: string;
            firstname: string;
            profileurl: string;
            emails: string;
            phoneNumbers: string;
            photourl: string;
            twoFactorAuthenticationSecret: string;
            isTwoFactorAuthenticationEnabled: boolean;
        };
    }>;
    getUsers(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        displayname: string;
        lastname: string;
        firstname: string;
        profileurl: string;
        emails: string;
        phoneNumbers: string;
        photourl: string;
        twoFactorAuthenticationSecret: string;
        isTwoFactorAuthenticationEnabled: boolean;
    }[]>;
    GetInfoUser(): Promise<{
        id: number;
    }[]>;
    setTwoFactorAuthenticationSecret(secret: string, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        displayname: string;
        lastname: string;
        firstname: string;
        profileurl: string;
        emails: string;
        phoneNumbers: string;
        photourl: string;
        twoFactorAuthenticationSecret: string;
        isTwoFactorAuthenticationEnabled: boolean;
    }>;
}
