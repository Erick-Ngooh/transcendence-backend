import { Injectable, NotFoundException, InternalServerErrorException} from '@nestjs/common';
import { Match, Player } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PlayersService } from '../players/players.service';

@Injectable()
export class GameService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly playersService: PlayersService,
  ) {}

  /**
   * Creates a new match between two players.
   * @param playerAId - The ID of player A.
   * @param playerBId - The ID of player B.
   * @returns A promise that resolves to the created match.
   * @throws {NotFoundException} If either player A or player B is not found.
   * @throws {InternalServerErrorException} If an error occurs while creating the match.
   */
  async createMatch(playerAId: number, playerBId: number): Promise<Match> {
    const playerA: Player = await this.playersService.getPlayerById(playerAId);
    const playerB: Player = await this.playersService.getPlayerById(playerBId);
    if (!playerA) throw new NotFoundException(`Player with ID ${playerAId} not found`);
    if (!playerB) throw new NotFoundException(`Player with ID ${playerBId} not found`);

    try {
        playerAId = Number(playerAId);
        playerBId = Number(playerBId);
        const match = await this.prisma.match.create({
          data: {
            playerAId,
            playerBId,
          },
        });
        return match;
    } catch (error) {
      console.error("Error in createMatch", error);
      throw new InternalServerErrorException("An error occurred while creating the match.");
    }
  }


  
}