/**
 * Core game type definitions extracted from gameData.json
 */

// Impact on the three dimensions
export interface Impact {
  cohesion: number;
  motivation: number;
  communication: number;
}

// A choice option for a question
export interface Choice {
  label: string;
  impact: Impact;
  feedback: string;
  correct: boolean;
}

// A question/scenario in the game
export interface Question {
  id: number;
  roleId: string;
  scenario: string;
  choices: Choice[];
}

// A professional role
export interface Role {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

// Score state tracking the three dimensions
export interface Score {
  cohesion: number;
  motivation: number;
  communication: number;
}

// Answer record for a question
export interface Answer {
  questionId: number;
  choiceIndex: number;
  isCorrect: boolean;
}

// Feedback data stored after answering
export interface FeedbackData {
  message: string;
  isCorrect: boolean;
  impact: Impact;
  choiceLabel: string;
}

// Complete game state
export interface GameState {
  selectedRole: Role | null;
  currentQuestionIndex: number;
  score: Score;
  answers: Answer[];
  isCompleted: boolean;
  lastFeedback: FeedbackData | null;
}

// Result message with recommendations
export interface ResultMessage {
  level: 'Excellent' | 'Bien' | 'Moyen' | 'À améliorer';
  message: string;
  recommendations: string[];
}

// Raw game data structure from JSON
export interface GameData {
  roles: Role[];
  questions: Question[];
}

// Score dimension info for UI display
export interface ScoreDimension {
  label: string;
  value: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
