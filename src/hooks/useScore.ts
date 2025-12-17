import { useGame } from '../context/GameContext';
import { getQuestionsByRoleId } from '../data/gameData';

export const useScore = () => {
  const { gameState } = useGame();

  const totalQuestions = gameState.selectedRole
    ? getQuestionsByRoleId(gameState.selectedRole.id).length
    : 0;

  const maxScorePerDimension = totalQuestions * 12; // Max positive impact per question is ~12

  const getPercentage = (value: number) => {
    if (maxScorePerDimension === 0) return 0;
    // Score can be negative, so we need to normalize
    const normalized = Math.max(0, value);
    return Math.min(100, (normalized / maxScorePerDimension) * 100);
  };

  const cohesionPercentage = getPercentage(gameState.score.cohesion);
  const motivationPercentage = getPercentage(gameState.score.motivation);
  const communicationPercentage = getPercentage(gameState.score.communication);

  const totalScore = gameState.score.cohesion + gameState.score.motivation + gameState.score.communication;
  const correctAnswers = gameState.answers.filter(a => a.isCorrect).length;

  return {
    score: gameState.score,
    cohesionPercentage,
    motivationPercentage,
    communicationPercentage,
    totalScore,
    correctAnswers,
    totalQuestions,
    maxScorePerDimension,
  };
};
