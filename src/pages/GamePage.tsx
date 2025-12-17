/**
 * GamePage - Main game interface
 * Features: ScoreBar, ProgressBar, QuestionCard with full game logic
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useGameLogic } from '../hooks/useGameLogic';
import { ScoreBar } from '../components/ScoreBar';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowLeft, User, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export const GamePage = () => {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();
  const { 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions, 
    handleAnswer,
    progress,
    questionsRemaining 
  } = useGameLogic();

  // Redirect if no role selected
  useEffect(() => {
    if (!gameState.selectedRole) {
      navigate('/roles');
    }
  }, [gameState.selectedRole, navigate]);

  // Redirect to results when completed
  useEffect(() => {
    if (gameState.isCompleted) {
      navigate('/results');
    }
  }, [gameState.isCompleted, navigate]);

  // Loading state
  if (!gameState.selectedRole || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement de la question...</p>
        </motion.div>
      </div>
    );
  }

  const handleQuit = () => {
    if (confirm('Êtes-vous sûr de vouloir quitter ? Votre progression sera perdue.')) {
      resetGame();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            {/* Quit Button */}
            <Button
              variant="ghost"
              onClick={handleQuit}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quitter
            </Button>

            {/* Role Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 bg-white px-6 py-3 rounded-lg shadow-lg border-2 border-purple-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Vous jouez</p>
                <p className="font-bold text-gray-900">{gameState.selectedRole.name}</p>
              </div>
            </motion.div>

            {/* Progress Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow"
            >
              <div className="text-right">
                <p className="text-xs text-gray-500">Progression</p>
                <p className="text-sm font-bold text-purple-600">{progress}%</p>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <ProgressBar current={currentQuestionIndex} total={totalQuestions} />

          {/* Score Bar */}
          <ScoreBar />

          {/* Info Banner */}
          {questionsRemaining <= 2 && questionsRemaining > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-orange-50 border-orange-200 mb-4">
                <CardContent className="p-4 flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-orange-900 font-medium">
                    Plus que {questionsRemaining} question{questionsRemaining > 1 ? 's' : ''} avant les résultats !
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard 
            key={currentQuestion.id}
            question={currentQuestion} 
            onAnswer={handleAnswer}
            disabled={gameState.lastFeedback !== null}
          />
        </AnimatePresence>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            💡 Prenez le temps de lire attentivement chaque scénario avant de répondre
          </p>
        </motion.div>
      </div>
    </div>
  );
};
