/**
 * FeedbackPanel Component
 * Displays pedagogical feedback with score impact visualization
 */

import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users,
  MessageCircle,
  Activity,
  Sparkles
} from 'lucide-react';
import type { Score } from '../types/game';

interface FeedbackPanelProps {
  feedback: string;
  isCorrect: boolean;
  impact: Score;
}

export const FeedbackPanel = ({ feedback, isCorrect, impact }: FeedbackPanelProps) => {
  const getImpactColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getImpactBgColor = (value: number) => {
    if (value > 0) return 'bg-green-50 border-green-200';
    if (value < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getImpactIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />;
    if (value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const impacts = [
    {
      label: 'Cohésion',
      value: impact.cohesion,
      icon: Users,
      description: 'Impact sur l\'unité de l\'équipe',
    },
    {
      label: 'Motivation',
      value: impact.motivation,
      icon: Activity,
      description: 'Impact sur l\'engagement',
    },
    {
      label: 'Communication',
      value: impact.communication,
      icon: MessageCircle,
      description: 'Impact sur les échanges',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -20 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        rounded-lg p-6 border-2 
        ${isCorrect 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
        }
      `}
    >
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex-shrink-0"
        >
          {isCorrect ? (
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <XCircle className="w-7 h-7 text-white" />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className={`
              text-lg font-bold mb-2 flex items-center space-x-2
              ${isCorrect ? 'text-green-900' : 'text-red-900'}
            `}>
              <span>{isCorrect ? 'Excellente décision !' : 'Décision à revoir'}</span>
              {isCorrect && <Sparkles className="w-5 h-5 text-yellow-500" />}
            </h4>
          </motion.div>

          {/* Feedback text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-800 mb-6 leading-relaxed"
          >
            {feedback}
          </motion.p>

          {/* Impact section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                Impact sur vos scores :
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {impacts.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`
                    rounded-lg p-3 border-2 
                    ${getImpactBgColor(item.value)}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <item.icon className={`w-4 h-4 ${getImpactColor(item.value)}`} />
                      <span className="text-sm font-semibold text-gray-800">
                        {item.label}
                      </span>
                    </div>
                    {getImpactIcon(item.value)}
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${getImpactColor(item.value)}`}>
                      {item.value > 0 ? '+' : ''}{item.value}
                    </span>
                    <span className="text-xs text-gray-500">points</span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tip */}
          {!isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-sm text-blue-900">
                <strong>💡 Conseil :</strong> En management du changement, privilégiez toujours l'accompagnement et la communication plutôt que l'imposition.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
