import { GameService } from './game.service';
import { Match } from '@prisma/client';
import { CreateGameDto } from '../dto/match.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    createGame(createGameDto: CreateGameDto): Promise<Match>;
}
