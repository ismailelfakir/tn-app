/**
 * Central export point for all game types
 * Import types using: import type { Role, Question } from '@/types'
 */

export type {
  // Core game entities
  Role,
  Question,
  Choice,
  
  // State and tracking
  GameState,
  Score,
  Answer,
  Impact,
  FeedbackData,
  
  // Results and UI
  ResultMessage,
  ScoreDimension,
  
  // Data structure
  GameData,
} from './game';
