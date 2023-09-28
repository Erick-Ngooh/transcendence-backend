import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { Match } from '@prisma/client';
import { CreateGameDto } from '../dto/match.dto'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

 /**
   * Cette route créé un match
   * @route POST /games/create
   * @param {CreateGameDto} createGameDto - Les informations nécessaires à la création d'un match. Il contient les ID des joueurs participant au match.
   * @returns {Promise<Match>} La promesse résolue contient le match créé.
   * @example
   * POST /games/create
   * Body: {
   *  "playerAId": 1,
   *  "playerBId": 2
   * }
*/
 @Post('create')
 async createGame(@Body() createGameDto: CreateGameDto): Promise<Match> {
   return this.gameService.createMatch(createGameDto.playerAId, createGameDto.playerBId);
 }

}