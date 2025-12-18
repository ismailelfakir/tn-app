/**
 * HomePage - Landing page for TN Challenge
 * Features: Hero section, feature cards, call-to-action button
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Gamepad2, 
  Target, 
  Users, 
  TrendingUp, 
  Sparkles,
  Award,
  Brain
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Choisissez votre rôle',
      description: 'Incarnez l\'un des 8 profils professionnels clés de la transformation numérique',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Target,
      title: 'Scénarios réalistes',
      description: 'Confrontez-vous à des situations concrètes adaptées à votre rôle',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      title: 'Développez vos compétences',
      description: 'Apprenez les bonnes pratiques de gestion du changement',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ];

  const stats = [
    { icon: Award, label: '8 Rôles', value: 'professionnels' },
    { icon: Brain, label: 'Questions', value: 'interactives' },
    { icon: Sparkles, label: 'Feedback', value: 'pédagogique' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Gamepad2 className="w-24 h-24 text-purple-600" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-purple-200 rounded-full -z-10 blur-xl"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            CITN Game
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-2 font-semibold">
              Maîtrisez la Communication Interne pendant la Transition Numérique
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-8 mt-8 px-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
              >
                <stat.icon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">{stat.label}</span>
                <span className="text-xs text-gray-600">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Card className="h-full text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                      className={`w-20 h-20 rounded-full ${feature.bg} flex items-center justify-center`}
                    >
                      <feature.icon className={`w-10 h-10 ${feature.color}`} />
                    </motion.div>
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/roles')}
            className="text-lg sm:text-xl px-8 sm:px-16 py-6 sm:py-8 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center space-x-3"
            >
              <span>Commencer le Challenge</span>
              <Sparkles className="w-6 h-6" />
            </motion.span>
          </Button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-sm text-gray-500"
          >
            Gratuit • Sans inscription • 15 minutes
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
