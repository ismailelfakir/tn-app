import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getQuestionsByRoleId } from '../data/gameData';
import type { Question, FeedbackData } from '../types/game';

/**
 * Return type for useGameLogic hook
 */
interface UseGameLogicReturn {
  // Current question data
  currentQuestion: Question | undefined;
  currentQuestionIndex: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  
  // Progress tracking
  progress: number;
  questionsRemaining: number;
  
  // Score tracking
  score: {
    cohesion: number;
    motivation: number;
    communication: number;
  };
  
  // Feedback
  lastFeedback: FeedbackData | null;
  
  // Actions
  handleAnswer: (choiceIndex: number) => void;
  skipToResults: () => void;
}

/**
 * Custom hook for game logic
 * Manages question flow, scoring, and navigation
 */
export const useGameLogic = (): UseGameLogicReturn => {
  const navigate = useNavigate();
  const { gameState, answerQuestion, nextQuestion, completeGame } = useGame();

  /**
   * Get all questions for the selected role
   * Memoized to prevent recalculation on every render
   */
  const currentQuestions = useMemo<Question[]>(() => {
    if (!gameState.selectedRole) {
      return [];
    }
    return getQuestionsByRoleId(gameState.selectedRole.id);
  }, [gameState.selectedRole]);

  /**
   * Get the current question
   * Memoized based on current index and questions
   */
  const currentQuestion = useMemo<Question | undefined>(() => {
    return currentQuestions[gameState.currentQuestionIndex];
  }, [currentQuestions, gameState.currentQuestionIndex]);

  /**
   * Calculate total questions
   */
  const totalQuestions = useMemo(() => currentQuestions.length, [currentQuestions.length]);

  /**
   * Check if this is the last question
   */
  const isLastQuestion = useMemo(
    () => gameState.currentQuestionIndex === totalQuestions - 1,
    [gameState.currentQuestionIndex, totalQuestions]
  );

  /**
   * Calculate progress percentage
   */
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round(((gameState.currentQuestionIndex + 1) / totalQuestions) * 100);
  }, [gameState.currentQuestionIndex, totalQuestions]);

  /**
   * Calculate remaining questions
   */
  const questionsRemaining = useMemo(
    () => totalQuestions - gameState.currentQuestionIndex - 1,
    [totalQuestions, gameState.currentQuestionIndex]
  );

  /**
   * Handle answer selection
   * Records the answer, shows feedback, and progresses the game
   */
  const handleAnswer = useCallback((choiceIndex: number) => {
    if (!currentQuestion) {
      console.error('No current question available');
      return;
    }

    // Validate choice index
    if (choiceIndex < 0 || choiceIndex >= currentQuestion.choices.length) {
      console.error('Invalid choice index:', choiceIndex);
      return;
    }

    const choice = currentQuestion.choices[choiceIndex];

    // Record the answer with full feedback data
    answerQuestion(
      currentQuestion.id,
      choiceIndex,
      choice.correct,
      choice.impact,
      choice.feedback,
      choice.label
    );

    // Wait for feedback animation, then move forward
    setTimeout(() => {
      if (isLastQuestion) {
        // Game complete - navigate to results
        completeGame();
        navigate('/results');
      } else {
        // Move to next question
        nextQuestion();
      }
    }, 3000); // 3 second delay for feedback
  }, [currentQuestion, answerQuestion, isLastQuestion, completeGame, nextQuestion, navigate]);

  /**
   * Skip directly to results (for testing or forfeit)
   */
  const skipToResults = useCallback(() => {
    completeGame();
    navigate('/results');
  }, [completeGame, navigate]);

  return {
    // Current question data
    currentQuestion,
    currentQuestionIndex: gameState.currentQuestionIndex,
    totalQuestions,
    isLastQuestion,
    
    // Progress tracking
    progress,
    questionsRemaining,
    
    // Score tracking
    score: gameState.score,
    
    // Feedback
    lastFeedback: gameState.lastFeedback,
    
    // Actions
    handleAnswer,
    skipToResults,
  };
};
