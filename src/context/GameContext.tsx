import { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import type { Role, Score, GameState, Impact } from '../types/game';

/**
 * Game Context Type Definition
 */
interface GameContextType {
  gameState: GameState;
  selectRole: (role: Role) => void;
  answerQuestion: (
    questionId: number,
    choiceIndex: number,
    isCorrect: boolean,
    impact: Impact,
    feedback: string,
    choiceLabel: string
  ) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  completeGame: () => void;
  clearFeedback: () => void;
}

/**
 * Initial score state
 */
const initialScore: Score = {
  cohesion: 0,
  motivation: 0,
  communication: 0,
};

/**
 * Initial game state
 */
const initialGameState: GameState = {
  selectedRole: null,
  currentQuestionIndex: 0,
  score: initialScore,
  answers: [],
  isCompleted: false,
  lastFeedback: null,
};

/**
 * Game Context
 */
const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * Game Provider Component
 * Manages all game state and logic
 */
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  /**
   * Select a role and reset the game state
   */
  const selectRole = useCallback((role: Role) => {
    setGameState(prev => ({
      ...prev,
      selectedRole: role,
      currentQuestionIndex: 0,
      score: initialScore,
      answers: [],
      isCompleted: false,
      lastFeedback: null,
    }));
  }, []);

  /**
   * Record an answer and update the score
   */
  const answerQuestion = useCallback((
    questionId: number,
    choiceIndex: number,
    isCorrect: boolean,
    impact: Impact,
    feedback: string,
    choiceLabel: string
  ) => {
    setGameState(prev => ({
      ...prev,
      score: {
        cohesion: prev.score.cohesion + impact.cohesion,
        motivation: prev.score.motivation + impact.motivation,
        communication: prev.score.communication + impact.communication,
      },
      answers: [
        ...prev.answers,
        { questionId, choiceIndex, isCorrect },
      ],
      lastFeedback: {
        message: feedback,
        isCorrect,
        impact,
        choiceLabel,
      },
    }));
  }, []);

  /**
   * Move to the next question
   */
  const nextQuestion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      lastFeedback: null, // Clear feedback when moving to next question
    }));
  }, []);

  /**
   * Mark the game as completed
   */
  const completeGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isCompleted: true,
    }));
  }, []);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  /**
   * Clear the last feedback
   */
  const clearFeedback = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      lastFeedback: null,
    }));
  }, []);

  /**
   * Memoized context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo<GameContextType>(
    () => ({
      gameState,
      selectRole,
      answerQuestion,
      nextQuestion,
      resetGame,
      completeGame,
      clearFeedback,
    }),
    [gameState, selectRole, answerQuestion, nextQuestion, resetGame, completeGame, clearFeedback]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * Hook to access the game context
 * @throws Error if used outside of GameProvider
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
