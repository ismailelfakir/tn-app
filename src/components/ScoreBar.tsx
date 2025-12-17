/**
 * ScoreBar Component
 * Displays real-time scores across three dimensions with animated progress bars
 */

import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageCircle, Info } from 'lucide-react';
import { useScore } from '../hooks/useScore';
import { Card } from './ui/card';

export const ScoreBar = () => {
  const { score, cohesionPercentage, motivationPercentage, communicationPercentage } = useScore();

  const dimensions = [
    {
      label: 'Cohésion',
      description: 'Unité et collaboration de l\'équipe',
      value: score.cohesion,
      percentage: cohesionPercentage,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Motivation',
      description: 'Engagement et satisfaction',
      value: score.motivation,
      percentage: motivationPercentage,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: 'Communication',
      description: 'Clarté et efficacité des échanges',
      value: score.communication,
      percentage: communicationPercentage,
      icon: MessageCircle,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  return (
    <Card className="w-full p-6 mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Scores</h3>
        <div className="flex items-center space-x-1 text-gray-500">
          <Info className="w-4 h-4" />
          <span className="text-xs">En temps réel</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dimensions.map((dim, index) => (
          <motion.div
            key={dim.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`rounded-lg p-4 ${dim.bgColor}`}
          >
            {/* Header with icon and value */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${dim.color} bg-opacity-10`}>
                  <dim.icon className={`w-5 h-5 ${dim.textColor}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{dim.label}</p>
                  <p className="text-xs text-gray-500">{dim.description}</p>
                </div>
              </div>
              <motion.span
                key={dim.value}
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: '#111827' }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold text-gray-900"
              >
                {dim.value}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(100, dim.percentage))}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${dim.color} relative`}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs font-medium text-gray-700">
                  {Math.round(dim.percentage)}%
                </span>
                <span className="text-xs text-gray-500">Max</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
