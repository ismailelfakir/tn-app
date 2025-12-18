/**
 * RoleSelectPage - Role selection interface
 * Displays all roles from gameData.json with RoleCard components
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RoleCard } from '../components/RoleCard';
import { useGame } from '../context/GameContext';
import { roles } from '../data/gameData';
import type { Role } from '../types/game';
import { ArrowLeft, Users, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export const RoleSelectPage = () => {
  const navigate = useNavigate();
  const { selectRole } = useGame();

  const handleRoleSelect = (role: Role) => {
    selectRole(role);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4"
            >
              <Users className="w-8 h-8 text-purple-600" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Choisissez votre rôle
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Sélectionnez le profil professionnel que vous souhaitez incarner dans ce challenge
            </p>
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-blue-50 border-blue-200 mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {roles.length} rôles professionnels disponibles
                    </h3>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Chaque rôle possède ses propres scénarios adaptés à ses responsabilités dans la transformation numérique. 
                      Vous serez confronté à des situations concrètes et devrez prendre les meilleures décisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Roles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              onSelect={handleRoleSelect}
              index={index}
            />
          ))}
        </motion.div>

        {/* Footer tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            💡 Astuce : Choisissez le rôle qui correspond le mieux à votre situation professionnelle
          </p>
        </motion.div>
      </div>
    </div>
  );
};
