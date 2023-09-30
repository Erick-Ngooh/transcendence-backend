import { PlayersService } from './players.service';
import { Player } from '@prisma/client';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    getPlayerById(req: any): Promise<Player>;
    setPlayerUrlPhotoProfile(req: any, urlPhotoProfile: string): Promise<Player>;
    setPlayerPseudo(req: any, pseudo: string): Promise<Player>;
    getAllMatchesByPlayerId(req: any): Promise<any>;
    getAllPlayers(): Promise<Player[]>;
    deletePlayer(req: any): Promise<Player>;
}
