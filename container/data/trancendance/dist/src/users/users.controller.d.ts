import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyUSer(params: {
        id: number;
    }, req: Request): Promise<{
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
}
