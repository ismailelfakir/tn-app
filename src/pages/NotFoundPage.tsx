/**
 * NotFoundPage - 404 error page
 * Displayed when user navigates to non-existent route
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Home, AlertCircle, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const suggestions = [
    { label: 'Accueil', path: '/', icon: Home },
    { label: 'Sélection de rôle', path: '/roles', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 border-red-200 shadow-2xl">
          <CardHeader className="text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-xl">
                  <AlertCircle className="w-20 h-20 text-white" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4 bg-red-200 rounded-full -z-10 blur-2xl"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                404
              </CardTitle>
              <CardTitle className="text-2xl sm:text-3xl mb-3 px-4">
                Page non trouvée
              </CardTitle>
              <CardDescription className="text-base sm:text-lg px-4">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-900 text-center">
                <strong>URL incorrecte :</strong> {window.location.pathname}
              </p>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                Pages disponibles :
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 justify-start space-x-3 hover:border-purple-300 hover:bg-purple-50"
                      onClick={() => navigate(suggestion.path)}
                    >
                      <suggestion.icon className="w-5 h-5 text-purple-600" />
                      <span>{suggestion.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Page précédente
              </Button>

              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => navigate('/')}
              >
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </Button>
            </motion.div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center pt-4"
            >
              <p className="text-sm text-gray-500">
                💡 Besoin d'aide ? Commencez par <button onClick={() => navigate('/')} className="text-purple-600 hover:underline font-medium">l'accueil</button>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
