/**
 * RoleCard Component
 * Displays a professional role with selection button
 */

import { motion } from 'framer-motion';
import type { Role } from '../types/game';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  UserCircle2, 
  Briefcase, 
  Users, 
  Laptop, 
  MessageSquare,
  Shield,
  FileText,
  Wrench 
} from 'lucide-react';

interface RoleCardProps {
  role: Role;
  onSelect: (role: Role) => void;
  index: number;
}

// Map role IDs to appropriate icons
const getRoleIcon = (roleId: string) => {
  const iconMap: Record<string, typeof UserCircle2> = {
    director: Shield,
    rh: Users,
    manager: Briefcase,
    chef_projet: FileText,
    responsable_info: Laptop,
    charge_ci: MessageSquare,
    employe: UserCircle2,
    technicien: Wrench,
  };
  return iconMap[roleId] || UserCircle2;
};

// Map role IDs to gradient colors
const getRoleGradient = (roleId: string) => {
  const gradientMap: Record<string, string> = {
    director: 'from-purple-400 to-purple-600',
    rh: 'from-pink-400 to-pink-600',
    manager: 'from-blue-400 to-blue-600',
    chef_projet: 'from-indigo-400 to-indigo-600',
    responsable_info: 'from-cyan-400 to-cyan-600',
    charge_ci: 'from-green-400 to-green-600',
    employe: 'from-orange-400 to-orange-600',
    technicien: 'from-red-400 to-red-600',
  };
  return gradientMap[roleId] || 'from-blue-400 to-purple-500';
};

export const RoleCard = ({ role, onSelect, index }: RoleCardProps) => {
  const Icon = getRoleIcon(role.id);
  const gradient = getRoleGradient(role.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-purple-300">
        <CardHeader className="pb-4">
          {/* Icon */}
          <motion.div 
            className="flex items-center justify-center mb-4"
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <CardTitle className="text-lg text-center leading-tight group-hover:text-purple-600 transition-colors">
            {role.name}
          </CardTitle>

          {/* Description */}
          <CardDescription className="text-center mt-3 text-sm leading-relaxed">
            {role.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center pb-6 pt-0">
          <Button 
            onClick={() => onSelect(role)} 
            className="w-full group-hover:shadow-lg transition-all"
            size="lg"
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Choisir ce rôle →
            </motion.span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
