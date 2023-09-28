import { Player } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PlayersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPlayerById(id: number): Promise<Player>;
    setPlayerUrlPhotoProfile(id: number, urlPhotoProfile: string): Promise<Player>;
    setPlayerPseudo(id: number, pseudo: string): Promise<Player>;
    getAllMatchesByPlayerId(id: number): Promise<any>;
    getAllPlayers(): Promise<Player[]>;
    deletePlayer(playerId: number): Promise<Player>;
}
