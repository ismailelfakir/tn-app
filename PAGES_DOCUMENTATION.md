# 📄 Pages Documentation

## Overview

All 5 pages are fully functional with complete integration of components, hooks, and game logic. Each page features professional animations, responsive design, and seamless navigation.

---

## 🏠 HomePage

**Path**: `/src/pages/HomePage.tsx`  
**Route**: `/`  
**File Size**: 4.9 KB (165 lines)

### Purpose
Landing page that introduces TN Challenge and provides navigation to start the game.

### Features
- ✅ Hero section with animated game controller icon
- ✅ Animated title and description
- ✅ 3 feature cards (Roles, Scenarios, Skills)
- ✅ Stats badges (8 Roles, Questions, Feedback)
- ✅ Large call-to-action button
- ✅ Pulse animation on icon background
- ✅ Gradient backgrounds
- ✅ Staggered entrance animations

### Components Used
- Button (shadcn/ui)
- Card (shadcn/ui)
- Framer Motion animations

### Navigation
- CTA Button → `/roles` (RoleSelectPage)

### Visual Elements
```typescript
- Gamepad2 icon with pulse effect
- Purple gradient theme
- 3 feature cards with icons:
  * Users - "Choisissez votre rôle"
  * Target - "Scénarios réalistes"  
  * TrendingUp - "Développez vos compétences"
- Stats: Award, Brain, Sparkles icons
- Animated arrow on CTA button
```

### Animations
- Icon: Scale + rotate entrance
- Title: Fade + slide up
- Features: Staggered fade + slide
- Stats: Scale entrance (0.1s delay each)
- CTA: Scale + pulse, arrow movement
- Cards: Hover scale 1.05, icon rotate

---

## 👥 RoleSelectPage

**Path**: `/src/pages/RoleSelectPage.tsx`  
**Route**: `/roles`  
**File Size**: 3.5 KB (120 lines)

### Purpose
Displays all 8 professional roles from gameData.json for user selection.

### Features
- ✅ Back button to home
- ✅ Page title and description
- ✅ Info card explaining roles
- ✅ 8 RoleCard components in responsive grid
- ✅ Role count display
- ✅ Footer tip
- ✅ Fully navigable

### Components Used
- RoleCard (custom) × 8
- Button (shadcn/ui)
- Card (shadcn/ui)

### Data Integration
```typescript
import { roles } from '../data/gameData';

// Displays all roles from gameData.json
{roles.map((role, index) => (
  <RoleCard 
    role={role} 
    onSelect={handleRoleSelect}
    index={index}
  />
))}
```

### Navigation
- Back button → `/` (HomePage)
- Role selection → `/game` (GamePage)

### Layout
```
Mobile: 1 column
Tablet: 2 columns
Desktop: 4 columns
```

### Visual Elements
- Users icon header
- Blue info card with role count
- 4×2 grid of role cards
- Each role has unique icon and gradient
- Hover effects on cards

---

## 🎮 GamePage

**Path**: `/src/pages/GamePage.tsx`  
**Route**: `/game`  
**File Size**: 5.0 KB (175 lines)

### Purpose
Main game interface where users answer questions and see real-time feedback.

### Features
- ✅ Quit button with confirmation
- ✅ Role badge showing current role
- ✅ Progress percentage display
- ✅ ProgressBar component
- ✅ ScoreBar component
- ✅ QuestionCard component
- ✅ Warning banner for final questions
- ✅ Loading state
- ✅ Auto-navigation to results
- ✅ Route protection (redirects if no role)

### Components Used
- ProgressBar (custom)
- ScoreBar (custom)
- QuestionCard (custom)
- FeedbackPanel (custom, via QuestionCard)
- Button (shadcn/ui)
- Card (shadcn/ui)

### Hooks Used
```typescript
const { gameState, resetGame } = useGame();
const { 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  handleAnswer,
  progress,
  questionsRemaining 
} = useGameLogic();
```

### Navigation Guards
```typescript
// Redirect if no role selected
useEffect(() => {
  if (!gameState.selectedRole) {
    navigate('/roles');
  }
}, [gameState.selectedRole]);

// Auto-navigate when complete
useEffect(() => {
  if (gameState.isCompleted) {
    navigate('/results');
  }
}, [gameState.isCompleted]);
```

### Visual Elements
- Quit button (top left)
- Role badge with gradient avatar
- Progress percentage (top right)
- Progress bar with dots
- Score bar with 3 dimensions
- Question card with choices
- Feedback panel (appears after answer)
- Warning banner (last 2 questions)

### State Flow
```
Load page → Check role → Display question
  ↓
User answers → Show feedback (3s)
  ↓
Auto-advance → Next question or Complete
  ↓
If complete → Navigate to /results
```

---

## 🏆 ResultPage

**Path**: `/src/pages/ResultPage.tsx`  
**Route**: `/results`  
**File Size**: 8.5 KB (285 lines)

### Purpose
Displays final results, scores breakdown, and recommendations with restart options.

### Features
- ✅ Trophy animation
- ✅ Performance level display (Excellent/Bien/Moyen/À améliorer)
- ✅ Success rate statistics
- ✅ Correct answers count
- ✅ 3 dimension scores with progress bars
- ✅ Personalized recommendations
- ✅ Restart buttons (Home / Play Again)
- ✅ Route protection
- ✅ Professional styling

### Components Used
- Card (shadcn/ui)
- Button (shadcn/ui)
- Framer Motion animations

### Hooks Used
```typescript
const { gameState, resetGame } = useGame();
const { 
  score, 
  correctAnswers, 
  totalQuestions, 
  cohesionPercentage, 
  motivationPercentage, 
  communicationPercentage 
} = useScore();

const resultMessage = getResultMessage(score, totalQuestions);
```

### Visual Sections

#### 1. Header Card
- Trophy icon with pulse animation
- "Challenge terminé!" title
- Role played display

#### 2. Performance Level
- Color-coded level badge
  * Excellent → Green
  * Bien → Blue
  * Moyen → Orange
  * À améliorer → Red
- Personalized message

#### 3. Statistics Grid
- Correct answers: X/Y
- Success rate: Z%
- Green and blue gradient cards

#### 4. Dimension Scores
- 3 cards (Cohésion, Motivation, Communication)
- Icon, value, percentage
- Animated progress bars
- Color-coded backgrounds

#### 5. Recommendations
- Purple gradient card
- Bullet points with checkmarks
- Personalized advice based on performance

#### 6. Action Buttons
- "Retour à l'accueil" (outline)
- "Rejouer" (gradient, primary)

### Navigation
- Home button → `/` (HomePage)
- Replay button → `/roles` (RoleSelectPage)
- Both buttons call `resetGame()` first

### Animations
- Trophy: Scale + rotate entrance with pulse
- Level card: Fade + slide
- Stats: Staggered appearance
- Dimension cards: Staggered with progress bar animation
- Recommendations: Staggered slide from left
- Buttons: Fade + slide up

---

## ❌ NotFoundPage

**Path**: `/src/pages/NotFoundPage.tsx`  
**Route**: `/*` (catch-all)  
**File Size**: 3.8 KB (135 lines)

### Purpose
404 error page for invalid routes with helpful navigation options.

### Features
- ✅ Large 404 display
- ✅ Error icon with pulse animation
- ✅ Current URL display
- ✅ Page suggestions (Home, Roles)
- ✅ Navigation buttons
- ✅ Help text
- ✅ Professional error handling

### Components Used
- Button (shadcn/ui)
- Card (shadcn/ui)
- Framer Motion animations

### Navigation Options
```typescript
const suggestions = [
  { label: 'Accueil', path: '/', icon: Home },
  { label: 'Sélection de rôle', path: '/roles', icon: Search },
];
```

### Actions
- Previous page → `navigate(-1)`
- Home button → `/`
- Suggestion buttons → respective paths

### Visual Elements
- AlertCircle icon with pulse
- 404 large text
- Red gradient theme
- Current URL in error box
- 2 suggestion buttons
- 2 action buttons

---

## 🎨 Design System

### Color Themes by Page
```css
HomePage: Purple gradient (brand)
RoleSelectPage: Blue/Purple mix
GamePage: Multi-color (score bars)
ResultPage: Success/achievement colors
NotFoundPage: Red (error)
```

### Common Elements
- Gradient backgrounds: `from-blue-50 via-purple-50 to-pink-50`
- Shadow: `shadow-2xl` for main cards
- Border: `border-2` with colored borders
- Rounded: `rounded-lg` for cards
- Animations: Framer Motion throughout

---

## 🔄 Navigation Flow

```
HomePage (/)
    ↓
  Click "Commencer"
    ↓
RoleSelectPage (/roles)
    ↓
  Select a role
    ↓
GamePage (/game)
    ↓
  Answer questions
    ↓
  Auto-navigate when complete
    ↓
ResultPage (/results)
    ↓
  Click "Rejouer" or "Accueil"
    ↓
Back to RoleSelectPage or HomePage

NotFoundPage (*)
  ↓
Any invalid URL shows 404
```

---

## 🛡️ Route Protection

### GamePage Protection
```typescript
// Redirects to /roles if no role selected
useEffect(() => {
  if (!gameState.selectedRole) {
    navigate('/roles');
  }
}, [gameState.selectedRole]);
```

### ResultPage Protection
```typescript
// Redirects to / if game not completed
useEffect(() => {
  if (!gameState.isCompleted || !gameState.selectedRole) {
    navigate('/');
  }
}, [gameState.isCompleted, gameState.selectedRole]);
```

---

## 📊 Page Statistics

```
HomePage.tsx
  - Lines: 165
  - Components: 3 feature cards
  - Animations: 8
  - Size: 4.9 KB

RoleSelectPage.tsx
  - Lines: 120
  - Components: 8 role cards + info card
  - Animations: 4
  - Size: 3.5 KB

GamePage.tsx
  - Lines: 175
  - Components: ProgressBar, ScoreBar, QuestionCard
  - Animations: 6
  - Hooks: useGame, useGameLogic
  - Size: 5.0 KB

ResultPage.tsx
  - Lines: 285
  - Components: Multiple cards and stat displays
  - Animations: 15+
  - Hooks: useGame, useScore
  - Size: 8.5 KB

NotFoundPage.tsx
  - Lines: 135
  - Components: Error display + suggestions
  - Animations: 6
  - Size: 3.8 KB

Total:
  - 880 lines of page code
  - 39+ animations
  - 25.7 KB total
  - 100% TypeScript
  - Fully navigable
```

---

## ✅ Requirements Met

### All Pages Use:
✅ Created components (ScoreBar, ProgressBar, etc.)  
✅ GameContext via useGame() hook  
✅ useGameLogic() hook  
✅ Framer Motion animations  
✅ TailwindCSS styling  
✅ shadcn/ui components  
✅ TypeScript typing  
✅ Responsive design

### RoleSelectPage:
✅ Lists roles from gameData.json  
✅ Uses RoleCard component  
✅ Fully functional selection

### GamePage:
✅ Shows ScoreBar ✓  
✅ Shows ProgressBar ✓  
✅ Shows QuestionCard ✓  
✅ Shows FeedbackPanel (via QuestionCard) ✓  
✅ Fully functional game logic

### ResultPage:
✅ Shows final scores ✓  
✅ Shows restart button ✓  
✅ Shows recommendations ✓  
✅ Full statistics display

### Navigation:
✅ Fully navigable between all pages  
✅ Route protection implemented  
✅ Auto-navigation on game completion  
✅ 404 page for invalid routes

---

## 🚀 Performance

### Optimizations
- Lazy route loading (ready for code-splitting)
- Optimized animations (GPU-accelerated)
- Memoized hooks prevent re-renders
- Efficient re-rendering with React best practices

### Loading States
- GamePage shows loader if no question
- ResultPage redirects if not completed
- All pages handle edge cases

---

**Last Updated**: December 17, 2025  
**Build Status**: ✅ Passing  
**Bundle Size**: 398.68 kB (125.26 kB gzipped)  
**CSS Size**: 29.56 kB (5.63 kB gzipped)
