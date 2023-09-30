import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Player, Match, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService)
  {}

  /**
   * Récupère un joueur par son ID.
   * @param id - L'ID du joueur à rechercher.
   * @returns Le joueur trouvé.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async getPlayerById(id: number): Promise<Player> {
    try {
      const player = await this.prisma.player.findUnique({
        where: { id },
      });
      if (!player) {
        throw new NotFoundException(`Joueur avec l'ID ${id} introuvable`);
      }
      return player;
    } catch (error) {
      console.error('Erreur lors de la récupération du joueur par ID', error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la récupération du joueur par ID.");
    }
  }

  /**
   * Met à jour l'URL de la photo de profil d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param urlPhotoProfile - La nouvelle URL de la photo de profil.
   * @returns Le joueur mis à jour.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async setPlayerUrlPhotoProfile(id: number, urlPhotoProfile: string): Promise<Player> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: { urlPhotoProfile },
      });
      if (!updatedPlayer) {
        throw new NotFoundException(`Joueur avec l'ID ${id} introuvable`);
      }
      return updatedPlayer;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'URL de la photo du joueur", error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la mise à jour de l'URL de la photo du joueur.");
    }
  }

  /**
   * Met à jour le pseudo d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param pseudo - Le nouveau pseudo du joueur.
   * @returns Le joueur mis à jour.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async setPlayerPseudo(id: number, pseudo: string): Promise<Player> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: { pseudo },
      });
      if (!updatedPlayer) {
        throw new NotFoundException(`Joueur avec l'ID ${id} introuvable`);
      }
      return updatedPlayer;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo du joueur", error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la mise à jour du pseudo du joueur.");
    }
  }

  /**
   * Récupère tous les matches associés à un joueur par son ID.
   * @param id - L'ID du joueur.
   * @returns Un tableau de tous les matches joués par le joueur.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async getAllMatchesByPlayerId(id: number): Promise<Match[]> {
    try {
      const player = await this.prisma.player.findUnique({
        where: { id },
        include: {
          matchesA: true,
          matchesB: true,
        },
      });
      if (!player) {
        throw new NotFoundException(`Joueur avec l'ID ${id} introuvable`);
      }
      const matchesA = player.matchesA || [];
      const matchesB = player.matchesB || [];
      const matches = [...matchesA, ...matchesB];
      return matches;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les matches joués par le joueur', error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la récupération de tous les matches joués par le joueur.");
    }
  }

  /**
   * Récupère tous les joueurs.
   * @returns Un tableau de tous les joueurs.
   * @throws InternalServerErrorException si une erreur se produit lors de la récupération des joueurs.
   */
  async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await this.prisma.player.findMany();
      return players;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les joueurs', error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la récupération de tous les joueurs.");
    }
  }

  /**
   * Supprime un joueur par son ID.
   * @param playerId - L'ID du joueur à supprimer.
   * @returns Le joueur supprimé.
   * @throws NotFoundException si le joueur n'est pas trouvé.
   */
  async deletePlayer(playerId: number): Promise<Player> {
    try {
      const deletedPlayer = await this.prisma.player.delete({
        where: { id: playerId },
      });
      if (!deletedPlayer) {
        throw new NotFoundException(`Joueur avec l'ID ${playerId} introuvable`);
      }
      return deletedPlayer;
    } catch (error) {
      console.error("Erreur lors de la suppression du joueur", error);
      throw new InternalServerErrorException("Une erreur s'est produite lors de la suppression du joueur.");
    }
  }

  /**
   * Ajoute l'ID d'un match au tableau de matches d'un joueur.
   * @param playerId - L'ID du joueur.
   * @param matchId - L'ID du match à ajouter.
   * @returns Le joueur mis à jour avec le match ajouté.
   * @throws {NotFoundException} Si le joueur n'est pas trouvé.
   * @throws {InternalServerErrorException} Si une erreur survient lors de la mise à jour du joueur.
   */
  async addMatchToPlayer(playerId: number, matchId: number): Promise<Player> {
    try {
      const existingPlayer = await this.getPlayerById(playerId);
      const updatedPlayer = await this.prisma.player.update({
        where: { id: playerId },
        data: {
          matchesA: {
            connect: [{ id: matchId }],
          },
        },
      });
      return updatedPlayer;
    } catch (error) {
      console.error("Erreur lors de l'ajout du match au joueur", error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException("Une erreur s'est produite lors de la mise à jour du joueur.");
      }
    }
  }
}