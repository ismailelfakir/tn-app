/**
 * Game data loader with strongly typed exports
 */

import rawGameData from './gameData.json';
import type { GameData, Role, Question } from '../types/game';

// Cast the imported JSON to our GameData type
const gameData = rawGameData as GameData;

/**
 * All available roles in the game
 */
export const roles: readonly Role[] = gameData.roles;

/**
 * All questions in the game
 */
export const questions: readonly Question[] = gameData.questions;

/**
 * Get a role by its ID
 * @param id - The role identifier
 * @returns The role if found, undefined otherwise
 */
export const getRoleById = (id: string): Role | undefined => {
  return roles.find(role => role.id === id);
};

/**
 * Get all questions for a specific role
 * @param roleId - The role identifier
 * @returns Array of questions for that role
 */
export const getQuestionsByRoleId = (roleId: string): Question[] => {
  return questions.filter(question => question.roleId === roleId);
};

/**
 * Get a specific question by its ID
 * @param id - The question identifier
 * @returns The question if found, undefined otherwise
 */
export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(question => question.id === id);
};

/**
 * Get the total number of questions for a role
 * @param roleId - The role identifier
 * @returns Number of questions for that role
 */
export const getQuestionCountForRole = (roleId: string): number => {
  return questions.filter(question => question.roleId === roleId).length;
};

/**
 * Validate if a role exists
 * @param roleId - The role identifier to check
 * @returns True if the role exists
 */
export const isValidRoleId = (roleId: string): boolean => {
  return roles.some(role => role.id === roleId);
};

// Export default for convenience
export default {
  roles,
  questions,
  getRoleById,
  getQuestionsByRoleId,
  getQuestionById,
  getQuestionCountForRole,
  isValidRoleId,
};
