import { PlayersService } from './players.service';
import { Player } from '@prisma/client';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    getPlayerById(id: number): Promise<Player>;
    setPlayerUrlPhotoProfile(id: number, urlPhotoProfile: string): Promise<Player>;
    setPlayerPseudo(id: number, pseudo: string): Promise<Player>;
    getAllMatchesByPlayerId(id: number): Promise<any>;
    getAllPlayers(): Promise<Player[]>;
    deletePlayer(id: number): Promise<Player>;
}
