/**
 * ResultPage - Final results and recommendations
 * Shows scores, performance analysis, and restart options
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useScore } from '../hooks/useScore';
import { getResultMessage } from '../data/results';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Home, 
  RotateCcw,
  Award,
  Target,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();
  const { 
    score, 
    correctAnswers, 
    totalQuestions, 
    cohesionPercentage, 
    motivationPercentage, 
    communicationPercentage 
  } = useScore();

  // Redirect if game not completed
  useEffect(() => {
    if (!gameState.isCompleted || !gameState.selectedRole) {
      navigate('/');
    }
  }, [gameState.isCompleted, gameState.selectedRole, navigate]);

  if (!gameState.isCompleted || !gameState.selectedRole) {
    return null;
  }

  const resultMessage = getResultMessage(score, totalQuestions);
  const successRate = Math.round((correctAnswers / totalQuestions) * 100);

  const dimensions = [
    {
      label: 'Cohésion',
      description: 'Unité et collaboration',
      value: score.cohesion,
      percentage: cohesionPercentage,
      icon: Users,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Motivation',
      description: 'Engagement et satisfaction',
      value: score.motivation,
      percentage: motivationPercentage,
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: 'Communication',
      description: 'Clarté des échanges',
      value: score.communication,
      percentage: communicationPercentage,
      icon: MessageCircle,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  const getLevelColor = (level: string) => {
    if (level === 'Excellent') return 'text-green-600';
    if (level === 'Bien') return 'text-blue-600';
    if (level === 'Moyen') return 'text-orange-600';
    return 'text-red-600';
  };

  const getLevelBg = (level: string) => {
    if (level === 'Excellent') return 'bg-green-50 border-green-200';
    if (level === 'Bien') return 'bg-blue-50 border-blue-200';
    if (level === 'Moyen') return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 border-2 border-purple-200 shadow-2xl">
            <CardHeader className="text-center pb-4">
              {/* Trophy Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
                    <Trophy className="w-20 h-20 text-white" />
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-4 bg-yellow-200 rounded-full -z-10 blur-2xl"
                  />
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="text-4xl mb-3">Challenge terminé !</CardTitle>
                <CardDescription className="text-lg">
                  Rôle joué : <span className="font-semibold text-purple-600">{gameState.selectedRole.name}</span>
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Performance Level */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-6 rounded-lg border-2 ${getLevelBg(resultMessage.level)}`}
              >
                <div className="text-center">
                  <Award className={`w-12 h-12 mx-auto mb-3 ${getLevelColor(resultMessage.level)}`} />
                  <h3 className={`text-3xl font-bold mb-2 ${getLevelColor(resultMessage.level)}`}>
                    Niveau : {resultMessage.level}
                  </h3>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {resultMessage.message}
                  </p>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Bonnes réponses</p>
                    <p className="text-4xl font-bold text-green-700">
                      {correctAnswers}/{totalQuestions}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Target className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Taux de réussite</p>
                    <p className="text-4xl font-bold text-blue-700">
                      {successRate}%
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Dimension Scores */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <span>Vos scores par dimension</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dimensions.map((dim, index) => (
                    <motion.div
                      key={dim.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card className={`${dim.bgColor} border-2`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-center mb-4">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${dim.color} flex items-center justify-center shadow-lg`}>
                              <dim.icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          
                          <h4 className="text-center font-bold text-gray-900 mb-1 text-lg">
                            {dim.label}
                          </h4>
                          <p className="text-center text-xs text-gray-600 mb-3">
                            {dim.description}
                          </p>

                          <div className="text-center mb-3">
                            <span className={`text-3xl font-bold ${dim.textColor}`}>
                              {dim.value}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">pts</span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.max(0, Math.min(100, dim.percentage))}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className={`h-full bg-gradient-to-r ${dim.color}`}
                            />
                          </div>
                          <p className="text-center text-xs text-gray-600 mt-1">
                            {Math.round(dim.percentage)}%
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <span>Recommandations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {resultMessage.recommendations.map((rec, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-white rounded-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    resetGame();
                    navigate('/');
                  }}
                  className="flex items-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Retour à l'accueil</span>
                </Button>

                <Button
                  size="lg"
                  onClick={() => {
                    resetGame();
                    navigate('/roles');
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Rejouer</span>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            Merci d'avoir participé au TN Challenge ! 
            Partagez vos résultats avec vos collègues. 🎉
          </p>
        </motion.div>
      </div>
    </div>
  );
};
