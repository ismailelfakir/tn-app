/**
 * QuestionCard Component
 * Displays question scenario with multiple choice answers and feedback
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Question, Choice } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FeedbackPanel } from './FeedbackPanel';
import { AlertCircle, Lightbulb } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (choiceIndex: number) => void;
  disabled?: boolean;
}

export const QuestionCard = ({ question, onAnswer, disabled = false }: QuestionCardProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelectedChoice(null);
    setShowFeedback(false);
  }, [question.id]);

  const handleChoiceClick = (index: number) => {
    if (selectedChoice !== null || disabled) return;
    
    setSelectedChoice(index);
    setShowFeedback(true);
    onAnswer(index);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="w-full shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-xl">Scénario</CardTitle>
          </div>
          <div className="flex items-start space-x-3 mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
            <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-base text-gray-800 leading-relaxed">
              {question.scenario}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <p className="text-sm font-medium text-gray-700 mb-4">
            Quelle est la meilleure décision à prendre ?
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {question.choices.map((choice: Choice, index: number) => {
              const isSelected = selectedChoice === index;
              const isCorrect = choice.correct;
              const showResult = isSelected && showFeedback;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: selectedChoice === null && !disabled ? 1.02 : 1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: selectedChoice === null && !disabled ? 0.98 : 1 
                  }}
                >
                  <Button
                    onClick={() => handleChoiceClick(index)}
                    disabled={selectedChoice !== null || disabled}
                    variant={
                      showResult
                        ? isCorrect
                          ? 'default'
                          : 'destructive'
                        : 'outline'
                    }
                    className={`
                      w-full text-left h-auto py-4 px-6 justify-start relative overflow-hidden
                      ${showResult && isCorrect && 'bg-green-500 hover:bg-green-600 text-white border-green-600'}
                      ${showResult && !isCorrect && 'bg-red-500 hover:bg-red-600 text-white border-red-600'}
                      ${!showResult && 'hover:border-purple-400 hover:bg-purple-50'}
                      transition-all duration-300
                    `}
                  >
                    {/* Choice number badge */}
                    <span className={`
                      inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-bold
                      ${showResult 
                        ? 'bg-white bg-opacity-30' 
                        : 'bg-purple-100 text-purple-700'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    
                    <span className="flex-1">{choice.label}</span>

                    {/* Selection indicator */}
                    {showResult && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="ml-2"
                      >
                        {isCorrect ? '✓' : '✗'}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Feedback Panel */}
          <AnimatePresence mode="wait">
            {showFeedback && selectedChoice !== null && (
              <FeedbackPanel
                feedback={question.choices[selectedChoice].feedback}
                isCorrect={question.choices[selectedChoice].correct}
                impact={question.choices[selectedChoice].impact}
              />
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
