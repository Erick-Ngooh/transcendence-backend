import { IsInt } from 'class-validator';

/**
 * DTO pour la création d'un match.
 * 
 * @example
 * {
 *   "playerAId": idDuUser,
 *   "playerBId": IdDuUser
 * }
 */
export class CreateGameDto { 
    @IsInt()
    playerAId: number;
    
    @IsInt()
    playerBId: number;
  }
  