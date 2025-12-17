# 🏗️ Architecture du projet — TN Challenge (React + Vite + TypeScript)

Mini-application interactive gamifiée autour de la transition numérique, inspirée d’un serious game.  
Structure optimisée pour Cursor : claire, modulaire, scalable et professionnelle.

---

## 📁 1. Structure générale des dossiers

tn-challenge/
├── src/
│   ├── assets/
│   │   └── avatars/
│   ├── components/
│   │   ├── ui/
│   │   ├── ScoreBar.tsx
│   │   ├── RoleCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── FeedbackPanel.tsx
│   │   └── ProgressBar.tsx
│   ├── data/
│   │   ├── roles.ts
│   │   ├── questions.ts
│   │   └── results.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── RoleSelectPage.tsx
│   │   ├── GamePage.tsx
│   │   ├── ResultPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/
│   │   ├── useGameLogic.ts
│   │   └── useScore.ts
│   ├── context/
│   │   └── GameContext.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── router/
│   │   └── index.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md

---

## 🎮 2. Fonctionnalités principales (MVP)

1. Choix d’un rôle
2. Scénarios interactifs
3. Scores dynamiques
4. Feedback intelligent
5. Page de résultats

## 🔧 3. Modèles de données

### Role
export interface Role {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

### Question
export interface Question {
  id: number;
  roleId?: string;
  scenario: string;
  choices: {
    label: string;
    impact: {
      cohesion: number;
      motivation: number;
      communication: number;
    };
    feedback: string;
    correct: boolean;
  }[];
}

### Result
export interface ResultMessage {
  level: string;
  message: string;
}

---

## 🌐 4. Routing

/ → HomePage  
/roles → RoleSelectPage  
/game → GamePage  
/results → ResultPage  
/* → NotFound
