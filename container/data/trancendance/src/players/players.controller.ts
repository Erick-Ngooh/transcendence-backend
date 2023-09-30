import { Controller, Get, Body, Patch, Req, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '@prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  /**
   * Récupère un joueur par son ID.
   * @param req - La requête HTTP contenant l'ID du joueur dans req.userId.
   * @returns Le joueur trouvé.
   */
  @Get('id')
  async getPlayerById(@Req() req): Promise<Player> {
    try {
      const id: number = Number(req.userId);
      const player = await this.playersService.getPlayerById(id);
      return player;
    } catch (error) {
      throw new HttpException('Une erreur s\'est produite lors de la récupération du joueur par ID.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Met à jour l'URL de la photo de profil d'un joueur.
   * @param req - La requête HTTP contenant l'ID du joueur dans req.userId.
   * @param urlPhotoProfile - La nouvelle URL de la photo de profil à mettre à jour.
   * {
   *    urlPhotoProfile: "http://url/blablabla"
   * }
   * @returns Le joueur mis à jour.
   */
  @Patch('photo')
  async setPlayerUrlPhotoProfile(@Req() req, @Body('urlPhotoProfile') urlPhotoProfile: string): Promise<Player> {
    try {
      const id: number = Number(req.userId);
      const updatedPlayer = await this.playersService.setPlayerUrlPhotoProfile(id, urlPhotoProfile);
      return updatedPlayer;
    } catch (error) {
      throw new HttpException("Une erreur s'est produite lors de la mise à jour de l'URL de la photo du joueur.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Met à jour le pseudo d'un joueur.
   * @param req - La requête HTTP contenant l'ID du joueur dans req.userId.
   * @param pseudo - Le nouveau pseudo du joueur.
   * {
   *    pseudo: "moi"
   * }
   * @returns Le joueur mis à jour.
   */
  @Patch('pseudo')
  async setPlayerPseudo(@Req() req, @Body('pseudo') pseudo: string): Promise<Player> {
    try {
      const id: number = Number(req.userId);
      const updatedPlayer = await this.playersService.setPlayerPseudo(id, pseudo);
      return updatedPlayer;
    } catch (error) {
      throw new HttpException("Une erreur s'est produite lors de la mise à jour du pseudo du joueur.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Récupère tous les matches associés à un joueur par son ID.
   * @param req - La requête HTTP contenant l'ID du joueur dans req.userId.
   * @returns Un tableau de tous les matches joués par le joueur.
   */
  @Get('matches')
  async getAllMatchesByPlayerId(@Req() req): Promise<any> {
    try {
      const id: number = Number(req.userId);
      const matches = await this.playersService.getAllMatchesByPlayerId(id);
      return matches;
    } catch (error) {
      throw new HttpException("Une erreur s'est produite lors de la récupération de tous les matches joués par le joueur.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Récupère tous les joueurs.
   * @returns Un tableau de tous les joueurs.
   */
  @Get()
  async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await this.playersService.getAllPlayers();
      return players;
    } catch (error) {
      throw new HttpException("Une erreur s'est produite lors de la récupération de tous les joueurs.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Supprime un joueur par son ID.
   * @param playerId - L'ID du joueur à supprimer.
   * @returns Le joueur supprimé.
   */
  @Delete('id')
  async deletePlayer(@Req() req): Promise<Player> {
    try {
      const playerId: number = req.userId;
      const deletedPlayer = await this.playersService.deletePlayer(playerId);
      return deletedPlayer;
    } catch (error) {
      throw new HttpException("Une erreur s'est produite lors de la suppression du joueur.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
