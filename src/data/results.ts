import type { ResultMessage, Score } from '../types/game';

export const getResultMessage = (score: Score, totalQuestions: number): ResultMessage => {
  const totalScore = score.cohesion + score.motivation + score.communication;
  const maxScore = totalQuestions * 30; // Max 10 per dimension per question
  const percentage = (totalScore / maxScore) * 100;

  if (percentage >= 80) {
    return {
      level: 'Excellent',
      message: 'Félicitations ! Vous maîtrisez parfaitement les enjeux de la transition numérique.',
      recommendations: [
        'Continuez à valoriser la communication et l\'accompagnement',
        'Partagez vos bonnes pratiques avec votre équipe',
        'Restez à l\'écoute des retours terrain'
      ]
    };
  } else if (percentage >= 60) {
    return {
      level: 'Bien',
      message: 'Bon travail ! Vous comprenez les principaux enjeux, mais quelques axes d\'amélioration sont possibles.',
      recommendations: [
        'Renforcez l\'accompagnement des équipes',
        'Développez une communication plus ciblée',
        'Impliquez davantage les managers de proximité'
      ]
    };
  } else if (percentage >= 40) {
    return {
      level: 'Moyen',
      message: 'Vous avez des bases, mais il est important de revoir certains fondamentaux de la conduite du changement.',
      recommendations: [
        'Priorisez l\'écoute et l\'accompagnement',
        'Évitez les approches trop directives',
        'Formez-vous aux théories de la motivation et de la communication'
      ]
    };
  } else {
    return {
      level: 'À améliorer',
      message: 'La gestion de la transition numérique nécessite une approche plus humaine et progressive.',
      recommendations: [
        'Recentrez-vous sur les besoins des équipes',
        'Favorisez la co-construction plutôt que l\'imposition',
        'Investissez dans la formation et l\'accompagnement'
      ]
    };
  }
};

export const getScoreLevelForDimension = (value: number, maxValue: number): string => {
  const percentage = (value / maxValue) * 100;
  
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Bien';
  if (percentage >= 40) return 'Moyen';
  return 'À améliorer';
};
