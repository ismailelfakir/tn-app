# 📘 TypeScript Types Documentation

## Overview

This project uses a strongly typed architecture with centralized type definitions and data loaders.

## Type System Structure

```
src/
├── types/
│   ├── game.ts          # All game-related types
│   └── index.ts         # Central export point for types
├── data/
│   ├── gameData.json    # Raw JSON data
│   ├── gameData.ts      # Typed data loader
│   ├── results.ts       # Result calculation logic
│   └── index.ts         # Central export point for data
```

## Core Types

### 1. **Impact**
Represents the effect of a choice on the three key dimensions.

```typescript
interface Impact {
  cohesion: number;      // Impact on team cohesion (-12 to +12)
  motivation: number;    // Impact on motivation (-12 to +12)
  communication: number; // Impact on communication (-12 to +12)
}
```

### 2. **Choice**
A possible answer to a question.

```typescript
interface Choice {
  label: string;         // Display text for the choice
  impact: Impact;        // Score impact if chosen
  feedback: string;      // Pedagogical explanation
  correct: boolean;      // Whether this is the best answer
}
```

### 3. **Question**
A scenario with multiple choice answers.

```typescript
interface Question {
  id: number;           // Unique question identifier
  roleId: string;       // Associated role (e.g., "director")
  scenario: string;     // The situation description
  choices: Choice[];    // Array of 3 possible answers
}
```

### 4. **Role**
A professional profile the player can embody.

```typescript
interface Role {
  id: string;           // Unique role identifier
  name: string;         // Display name
  avatar: string;       // Avatar image filename
  description: string;  // Role description
}
```

### 5. **Score**
Current score across three dimensions.

```typescript
interface Score {
  cohesion: number;
  motivation: number;
  communication: number;
}
```

### 6. **Answer**
Record of a player's answer to a question.

```typescript
interface Answer {
  questionId: number;   // Which question was answered
  choiceIndex: number;  // Which choice was selected (0-2)
  isCorrect: boolean;   // Whether the choice was correct
}
```

### 7. **GameState**
Complete game state managed by GameContext.

```typescript
interface GameState {
  selectedRole: Role | null;        // Currently selected role
  currentQuestionIndex: number;     // Current question (0-based)
  score: Score;                     // Cumulative score
  answers: Answer[];                // History of answers
  isCompleted: boolean;             // Whether game is finished
}
```

### 8. **ResultMessage**
Final result with recommendations.

```typescript
interface ResultMessage {
  level: 'Excellent' | 'Bien' | 'Moyen' | 'À améliorer';
  message: string;
  recommendations: string[];
}
```

## Data Loaders

### Importing Data

```typescript
// Import types
import type { Role, Question, Score } from '@/types';

// Import data and functions
import { 
  roles, 
  questions, 
  getRoleById,
  getQuestionsByRoleId 
} from '@/data';
```

### Available Functions

#### `getRoleById(id: string): Role | undefined`
Get a specific role by its ID.

```typescript
const director = getRoleById('director');
```

#### `getQuestionsByRoleId(roleId: string): Question[]`
Get all questions for a specific role.

```typescript
const directorQuestions = getQuestionsByRoleId('director');
```

#### `getQuestionById(id: number): Question | undefined`
Get a specific question by its ID.

```typescript
const question = getQuestionById(1);
```

#### `getQuestionCountForRole(roleId: string): number`
Count questions for a role.

```typescript
const count = getQuestionCountForRole('director');
```

#### `isValidRoleId(roleId: string): boolean`
Check if a role ID exists.

```typescript
if (isValidRoleId('manager')) {
  // Role is valid
}
```

#### `getResultMessage(score: Score, totalQuestions: number): ResultMessage`
Calculate final result based on score.

```typescript
const result = getResultMessage(finalScore, 9);
console.log(result.level); // "Excellent", "Bien", etc.
```

## Type Safety Benefits

### 1. **Compile-Time Validation**
```typescript
// ✅ This works - type-safe
const role: Role = getRoleById('director')!;

// ❌ This fails at compile time
const role: Role = { id: 'test' }; // Missing required fields
```

### 2. **IntelliSense Support**
Full autocomplete for all properties:
```typescript
const question = questions[0];
question.scenario // ✅ Autocomplete available
question.choices  // ✅ Knows it's Choice[]
```

### 3. **Refactoring Safety**
Rename a field in types → TypeScript finds all usages automatically.

### 4. **Documentation**
Types serve as inline documentation for developers.

## Usage in Components

### Example: Using Types in a Component

```typescript
import type { Question, Choice } from '@/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (choiceIndex: number) => void;
}

export const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
  return (
    <div>
      <h2>{question.scenario}</h2>
      {question.choices.map((choice: Choice, index: number) => (
        <button key={index} onClick={() => onAnswer(index)}>
          {choice.label}
        </button>
      ))}
    </div>
  );
};
```

### Example: Using Data Loaders

```typescript
import { roles, getQuestionsByRoleId } from '@/data';
import type { Role, Question } from '@/types';

// Get all roles
const allRoles: readonly Role[] = roles;

// Get questions for a specific role
const questions: Question[] = getQuestionsByRoleId('director');
```

## Type Hierarchy

```
GameData
  ├── roles: Role[]
  │   └── Role { id, name, avatar, description }
  └── questions: Question[]
      └── Question { id, roleId, scenario, choices }
          └── Choice { label, impact, feedback, correct }
              └── Impact { cohesion, motivation, communication }

GameState
  ├── selectedRole: Role | null
  ├── currentQuestionIndex: number
  ├── score: Score
  ├── answers: Answer[]
  └── isCompleted: boolean
```

## Best Practices

### ✅ Do's

1. **Always use `type` imports for types**
   ```typescript
   import type { Role } from '@/types';
   ```

2. **Use readonly for data arrays**
   ```typescript
   const roles: readonly Role[] = ...
   ```

3. **Provide return types for functions**
   ```typescript
   function getRoleById(id: string): Role | undefined { ... }
   ```

4. **Use centralized imports**
   ```typescript
   import { roles, questions } from '@/data';
   import type { Role, Question } from '@/types';
   ```

### ❌ Don'ts

1. **Don't use `any`**
   ```typescript
   // ❌ Bad
   const data: any = getRoleById('director');
   
   // ✅ Good
   const data: Role | undefined = getRoleById('director');
   ```

2. **Don't bypass type checks**
   ```typescript
   // ❌ Bad
   const role = getRoleById('director') as Role;
   
   // ✅ Good
   const role = getRoleById('director');
   if (role) { /* use role */ }
   ```

3. **Don't duplicate types**
   ```typescript
   // ❌ Bad - defining types inline
   function foo(role: { id: string; name: string }) { ... }
   
   // ✅ Good - use centralized types
   import type { Role } from '@/types';
   function foo(role: Role) { ... }
   ```

## Type Coverage

- **100% coverage** - All components and functions are fully typed
- **No `any` types** - Strict TypeScript configuration
- **Readonly data** - Prevents accidental mutations
- **Type inference** - Types are inferred where possible

## Extending Types

To add new types:

1. Add to `src/types/game.ts`
2. Export from `src/types/index.ts`
3. Update documentation

Example:
```typescript
// In game.ts
export interface NewFeature {
  id: string;
  name: string;
}

// In index.ts
export type { NewFeature } from './game';
```

---

**Last Updated**: December 17, 2025
**TypeScript Version**: 5.3.3
