import { Player, Match } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PlayersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPlayerById(id: number): Promise<Player>;
    setPlayerUrlPhotoProfile(id: number, urlPhotoProfile: string): Promise<Player>;
    setPlayerPseudo(id: number, pseudo: string): Promise<Player>;
    getAllMatchesByPlayerId(id: number): Promise<Match[]>;
    getAllPlayers(): Promise<Player[]>;
    deletePlayer(playerId: number): Promise<Player>;
    addMatchToPlayer(playerId: number, matchId: number): Promise<Player>;
}
