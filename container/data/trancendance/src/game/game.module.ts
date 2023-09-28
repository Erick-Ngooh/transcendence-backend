import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PlayersService } from '../players/players.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PlayersService],
  imports: []
})
export class GameModule {}
