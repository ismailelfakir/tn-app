/**
 * Central export point for all game data
 * Import data using: import { roles, questions, getRoleById } from '@/data'
 */

export {
  // Data arrays
  roles,
  questions,
  
  // Helper functions
  getRoleById,
  getQuestionsByRoleId,
  getQuestionById,
  getQuestionCountForRole,
  isValidRoleId,
} from './gameData';

export {
  // Result calculation
  getResultMessage,
  getScoreLevelForDimension,
} from './results';
