# 🏰 PAYDAY KINGDOM — Hackathon Blueprint
### One-Shot Build Guide for BernieBot

**Purpose:** This document is a proven, tested blueprint extracted from a working prototype. Every decision has been validated. Bernie follows this top-to-bottom, Dan reviews at checkpoints, Claude debriefs daily. No guessing, no exploration — just execution.

**Build Time Estimate:** 6-8 hours of AI coding time (can run in background across one day)

**Rule:** Start from scratch. No copied code. This is the architecture guide, not the source.

---

## TEAM SYNC PROTOCOL

```
DAN:    Product owner. Reviews at checkpoints. Final call on feel/direction.
BERNIE: Builder. Follows this blueprint sequentially. Flags blockers.
CLAUDE: Architect. Debriefs with Dan. Adjusts blueprint if needed.

Cadence:
  - Bernie builds in 3-ticket chunks
  - Dan reviews after each chunk (5 min visual check)
  - Claude debriefs with Dan once/day (or as needed)
  - If something feels wrong → STOP → debrief with Claude → adjust → resume
```

---

## PHASE 0: SCAFFOLD (30 min)

### Step 0.1 — Initialize Project

```bash
npm create vite@latest payday-kingdom -- --template react
cd payday-kingdom
npm install three @react-three/fiber @react-three/drei zustand
npm install -D tailwindcss @tailwindcss/vite
```

### Step 0.2 — Tailwind Config

In `vite.config.js`:
```javascript
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()]
})
```

In `src/index.css`:
```css
@import "tailwindcss";
```

### Step 0.3 — Folder Structure

```
src/
├── components/
│   ├── scene/
│   │   ├── Island.jsx          # Main 3D scene
│   │   ├── VoxelGround.jsx     # Island platform
│   │   ├── Water.jsx           # Water plane
│   │   ├── Hero.jsx            # Hero character
│   │   ├── Monster.jsx         # Bill monster
│   │   ├── IslandDecorations.jsx  # Trees, buildings, growth items
│   │   ├── Particles.jsx       # Explosion/celebration particles
│   │   └── BattleManager.jsx   # Orchestrates fight sequence
│   ├── ui/
│   │   ├── BudgetPanel.jsx     # Left panel: income, bills, payday button
│   │   ├── HUD.jsx             # Overlay: level, XP bar, stats
│   │   ├── Onboarding.jsx      # First-time flow
│   │   ├── KingdomNamer.jsx    # Name + banner color picker
│   │   ├── ShareCapture.jsx    # Screenshot + share functionality
│   │   └── AchievementToast.jsx
│   └── App.jsx
├── stores/
│   ├── budgetStore.js          # Income, bills, history
│   ├── gameStore.js            # XP, level, island stage, hero state
│   └── uiStore.js              # Modals, onboarding state, mute
├── systems/
│   ├── soundManager.js         # Web Audio procedural sounds
│   ├── xpCalculator.js         # XP thresholds and level logic
│   └── islandStages.js         # What decorations appear at each stage
├── utils/
│   ├── colors.js               # All color constants
│   └── helpers.js              # Shared utilities
└── main.jsx
```

### Step 0.4 — Color Palette (Critical — use these EXACTLY)

```javascript
// src/utils/colors.js
export const COLORS = {
  // Island
  grass: ['#4ade80', '#22c55e', '#16a34a'],
  water: '#3b82f6',
  waterDeep: '#1d4ed8',
  sand: '#fbbf24',

  // Natural
  wood: '#92400e',
  woodLight: '#b45309',
  stone: '#9ca3af',
  leaf: ['#15803d', '#166534', '#14532d'],

  // Hero armor tiers
  hero: {
    skin: '#fcd34d',
    peasant: '#92400e',    // Brown
    recruit: '#a16207',    // Leather
    soldier: '#b45309',    // Bronze
    knight: '#d1d5db',     // Silver
    champion: '#fbbf24',   // Gold
    legend: '#67e8f9',     // Diamond/cyan
  },

  // Monster categories (must match bill categories)
  monster: {
    housing: '#ef4444',       // Red — big golem
    utilities: '#eab308',     // Yellow — electric
    phone: '#8b5cf6',         // Purple — floating
    transport: '#f97316',     // Orange — mechanical
    food: '#22c55e',          // Green — blob
    health: '#3b82f6',        // Blue — ghost
    entertainment: '#ec4899', // Pink — imp
    other: '#6b7280',         // Gray — goblin
  },

  // UI
  ui: {
    bg: '#0f172a',           // Slate 900
    panel: '#1e293b',        // Slate 800
    accent: '#fbbf24',       // Gold/amber
    text: '#f1f5f9',         // Slate 100
    textDim: '#94a3b8',      // Slate 400
    xpBar: '#22c55e',        // Green
    xpBarBg: '#334155',      // Slate 700
    danger: '#ef4444',
    success: '#22c55e',
  }
};
```

### Checkpoint 0 ✅
**Dan verifies:** `npm run dev` works. Blank page loads. No errors.

---

## PHASE 1: THE ISLAND (45 min)

### Step 1.1 — Voxel Ground Platform

Build an 8×8 grid of cubes as the island base.

```
Technical spec:
- Each cube: BoxGeometry(1, 0.5, 1)
- Grid: 8x8, centered at origin
- Y position: random between 0 and 0.3 per cube (organic terrain feel)
- Color: randomly pick from COLORS.grass array per cube
- Edge cubes slightly lower (creates natural edge falloff)
- Entire grid wrapped in a <group> component
```

### Step 1.2 — Water Plane

```
Technical spec:
- PlaneGeometry(20, 20) positioned at Y = -0.3
- Color: COLORS.water with opacity 0.7
- Slight animation: gentle Y oscillation (sin wave, amplitude 0.05, slow)
```

### Step 1.3 — Scene Setup (Camera + Lighting)

```
Technical spec:
- Use @react-three/fiber Canvas
- Camera: PerspectiveCamera, fov=50, position=[8, 8, 8], lookAt=[0, 0, 0]
- OrbitControls from @react-three/drei:
    - enableZoom: true (min 5, max 15)
    - enablePan: false
    - maxPolarAngle: Math.PI / 3 (prevent going under island)
    - autoRotate: true (speed 0.5) — slow idle rotation
    - autoRotate stops when user interacts, resumes after 3s idle
- Lights:
    - AmbientLight intensity 0.4
    - DirectionalLight position [5, 10, 5] intensity 0.8, castShadow
- Background: color '#1a3a2a' (dark forest green)
```

### Step 1.4 — Layout Shell

```
Technical spec:
Desktop (>768px):
  - Left panel: 40vw, fixed, COLORS.ui.bg background
  - Right scene: 60vw, Canvas fills it
Mobile (<768px):
  - Scene: 100vw × 55vh, top
  - Panel: 100vw, below, scrollable
  - "Trigger Payday" button sticky at bottom
```

### Checkpoint 1 ✅
**Dan verifies:** Green voxel island floating on blue water. Camera slowly rotates. Can orbit with mouse. Layout has left panel (empty) and right scene. Looks good on phone viewport.

---

## PHASE 2: BUDGET SYSTEM (45 min)

### Step 2.1 — Budget Store (Zustand)

```javascript
// src/stores/budgetStore.js
// State shape:
{
  income: 0,
  bills: [
    {
      id: crypto.randomUUID(),
      name: 'Rent',
      amount: 1200,
      category: 'housing',  // housing|utilities|phone|transport|food|health|entertainment|other
      isPaid: false,
    }
  ],
  history: [],  // { month: 'YYYY-MM', totalBills, totalPaid, surplus }
  currentMonth: new Date().toISOString().slice(0, 7),
}

// Actions:
setIncome(amount)          // validate: number > 0
addBill({ name, amount, category })
removeBill(id)
markBillPaid(id)
triggerPayday()            // marks all unpaid → initiates battle
resetMonth()               // after battle: archive to history, reset isPaid flags
getSurplus()               // income - sum(bills)
getMonthsCompleted()       // history.length

// Persistence: zustand/middleware persist to localStorage key 'pk-budget'
```

### Step 2.2 — Budget Panel UI

```
Layout (top to bottom):
┌─────────────────────────────────┐
│ 💰 Your Kingdom Treasury        │  ← Gold text, pixel font
│                                 │
│ HERO RANK           Level X     │  ← From gameStore
│ Armor: [tier name]              │
│ XP ████████░░░░ XXX / XXXX next │  ← Green bar
│ Months: X    Bills Slain: XX    │
│                                 │
│ MONTHLY INCOME                  │
│ ┌─ $ [__________] ─┐           │  ← Number input, large
│                                 │
│ ⚔️ Bills (Monsters to Slay)     │
│                                 │
│ 🔴 Rent          $1,200    ✕    │  ← Color dot = category
│ 🟡 Electric      $  150    ✕    │
│ 🟣 Phone         $   85    ✕    │
│                                 │
│ [+ Add Bill]                    │  ← Opens inline form:
│                                 │     name, amount, category dropdown
│ ─────────────────────────────── │
│ Surplus: $X,XXX                 │  ← Green if positive, red if negative
│                                 │
│ [⚔️ TRIGGER PAYDAY]            │  ← Big gold button, full width
│                                 │
└─────────────────────────────────┘

Styling:
- Background: COLORS.ui.panel
- Font: 'Press Start 2P' (Google Fonts) for headings
- Font: system sans-serif for numbers/data
- Bill category dot matches COLORS.monster[category]
- Surplus: green if >= 0, red if negative
- Payday button: bg COLORS.ui.accent, text black, bold
  - Disabled state: gray, during battle animation
  - Hover: slight glow/scale
```

### Step 2.3 — Wire Bills → Monsters on Island

```
Mapping rules:
- Each bill in budgetStore.bills → one Monster component in the scene
- Monster position: arranged in a semicircle around island center
  - angle = (index / totalBills) * Math.PI + Math.PI/4
  - radius = 2.5
  - x = cos(angle) * radius, z = sin(angle) * radius
- Monster size based on bill amount:
  - < $100:  scale 0.6  (small)
  - $100-499: scale 0.8 (medium)
  - $500+:   scale 1.2  (large)
- Monster color: COLORS.monster[bill.category]
- Monster shape: stack of 2-3 cubes (body + head), with small accent cubes
  - Body: 1×1×1 cube in category color
  - Head: 0.6×0.6×0.6 cube, slightly lighter shade, on top
  - Eyes: two tiny 0.15 cubes, white, on front face
  - Category accent:
    - housing: flat top (no extra)
    - utilities: small yellow spark cubes floating around (3-4 tiny cubes orbiting)
    - phone: antenna on top (thin tall cube)
    - transport: legs (4 small cubes at bottom corners)
    - food: wide mouth (dark rectangle on front)
    - health: floating (Y position bobs up and down)
    - entertainment: jester hat (two small angled cubes on top)
    - other: generic (just body + head)
- Idle animation: gentle bobbing (sin wave on Y, each monster offset phase)
- Adding a bill → monster fades in (scale 0 → 1 over 0.3s)
- Removing a bill → monster fades out (scale 1 → 0 over 0.3s)
```

### Step 2.4 — Income Gold Pile

```
Spec:
- Centered on island at position [0, groundHeight, 0]
- Stack of gold cubes (COLORS.ui.accent)
- Size scales with income:
  - < $1000: 2 cubes
  - $1000-3000: 4 cubes
  - $3000-5000: 6 cubes
  - $5000+: 8 cubes (small pile)
- Subtle sparkle: one cube randomly flashes brighter every 2 seconds
```

### Checkpoint 2 ✅
**Dan verifies:** Can enter income. Can add/remove bills. Monsters appear on island with correct colors and sizes. Gold pile shows. Surplus calculates correctly. Data survives page refresh.

---

## PHASE 3: THE BATTLE (1 hour — this is the money shot)

### Step 3.1 — Game Store (Zustand)

```javascript
// src/stores/gameStore.js
{
  level: 1,
  xp: 0,
  totalBillsSlain: 0,
  monthsCompleted: 0,
  heroVisible: false,
  islandStage: 0,           // 0-6
  battleInProgress: false,
  kingdomName: '',
  bannerColor: '#ef4444',   // default red
  achievements: [],
  muted: false,
}

// Actions:
addXP(amount)               // handles level-up detection
setHeroVisible(bool)
setBattleInProgress(bool)
incrementBillsSlain()
incrementMonths()
setKingdomName(name)
setBannerColor(color)
unlockAchievement(id)
toggleMute()
getArmorTier()              // computed from level
getIslandStage()            // computed from monthsCompleted

// Persist to localStorage key 'pk-game'
```

### Step 3.2 — XP & Leveling System

```javascript
// src/systems/xpCalculator.js
const LEVEL_THRESHOLDS = [
  0,      // Level 1 (start)
  1000,   // Level 2
  3000,   // Level 3
  6000,   // Level 4
  10000,  // Level 5
  15000,  // Level 6
  21000,  // Level 7
  28000,  // Level 8
  36000,  // Level 9
  45000,  // Level 10
  55000,  // Level 11
  70000,  // Level 12
];

const ARMOR_TIERS = [
  { level: 1,  name: 'Peasant',   color: COLORS.hero.peasant },
  { level: 2,  name: 'Recruit',   color: COLORS.hero.recruit },
  { level: 3,  name: 'Soldier',   color: COLORS.hero.soldier },
  { level: 5,  name: 'Knight',    color: COLORS.hero.knight },
  { level: 8,  name: 'Champion',  color: COLORS.hero.champion },
  { level: 12, name: 'Legend',    color: COLORS.hero.legend },
];

// XP per bill slain = bill amount (paying $1200 rent = 1200 XP)
// Level = highest threshold index where xp >= threshold
// Armor tier = highest tier where level >= tier.level
```

### Step 3.3 — Hero Character

```
Visual spec:
- Built from cubes (BoxGeometry), all grouped:
  - Legs: 2 cubes (0.3×0.5×0.3), slight gap, below body
  - Body: 1 cube (0.7×0.8×0.5), armor color from current tier
  - Head: 1 cube (0.5×0.5×0.5), COLORS.hero.skin
  - Eyes: 2 tiny cubes (0.1×0.1×0.05), dark, on front of head
  - Weapon (level 2+): thin tall cube to the right (0.1×0.8×0.1)
  - Shield (level 5+): flat wide cube to the left (0.05×0.4×0.3)

- Armor color changes with tier (body cube + leg cubes change color)
- Position: center of island when idle
- Idle animation: subtle breathing (scale Y oscillates 1.0 → 1.03)
- Only visible when heroVisible = true in gameStore
- Spawn animation: drop from Y=5 to ground level, small bounce
```

### Step 3.4 — Battle Animation Sequence (THE CORE)

```
This is the most important feature. It must feel SATISFYING.

Trigger: User clicks "TRIGGER PAYDAY" button
Precondition: income > 0, at least 1 bill exists, battleInProgress === false

Sequence:

1. LOCK UI (0s)
   - setBattleInProgress(true)
   - Disable payday button
   - Play sound: payday_start (3 ascending trumpet notes)

2. HERO SPAWN (0-0.8s)
   - setHeroVisible(true)
   - Hero drops from Y=5 to Y=ground (ease-out bounce)
   - On land: burst of 8-10 white particle cubes scatter outward
   - Play sound: hero_spawn (impact thud + sparkle)
   - Camera auto-rotate pauses

3. BATTLE LOOP (0.8s + 0.6s per monster)
   For each bill (sequential, not simultaneous):
     a. Hero slides toward monster (lerp position over 0.3s)
     b. Hero rotates 360° on Y axis (spin attack, 0.15s)
     c. Monster flashes white (0.05s)
     d. Monster explodes: 12-15 cubes in monster's color scatter with:
        - Random velocity outward + upward
        - Gravity pulls them down
        - Fade out over 0.5s
        - Remove after fade
     e. Floating text appears at monster position:
        - "+$[amount]" in green
        - Floats upward over 0.8s
        - Fades out
     f. XP ticks: addXP(bill.amount)
     g. Play sound: monster_slay (slash + pop)
     h. Play sound: xp_tick (rapid coin dings, duration proportional to amount)
     i. markBillPaid(bill.id) in budgetStore
     j. Brief pause (0.15s) before moving to next monster

4. VICTORY (after last monster, 1s)
   - Hero returns to center (lerp 0.3s)
   - Hero jumps (Y += 1.5 then back down, 0.4s)
   - Text overlay: "⚔️ PAYDAY COMPLETE" — large, centered, fades after 2s
   - Play sound: victory (triumphant 4-note melody)
   - incrementMonths() in gameStore
   - resetMonth() in budgetStore (archive history, reset isPaid)

5. LEVEL UP CHECK (after victory, if XP crossed threshold)
   - Screen flash: white overlay, opacity 0 → 0.3 → 0, over 0.4s
   - Hero armor color transitions (old → new tier color)
   - 20-30 gold particle cubes burst from hero
   - Text: "⬆️ LEVEL UP! [Tier Name]" — large, gold text, fades after 2.5s
   - Play sound: level_up (ascending arpeggio)

6. ISLAND GROWTH (after level check, if stage increased)
   - New decoration objects scale from 0 → 1 (pop in, 0.3s each, staggered)
   - Play sound: island_grow (magical shimmer)

7. UNLOCK (0.5s after all animations)
   - setBattleInProgress(false)
   - Re-enable payday button
   - Camera auto-rotate resumes
```

### Step 3.5 — Particle System

```
Reusable particle system for explosions and celebrations:

createParticles({
  position: [x, y, z],
  count: 12,
  color: '#ef4444',
  speed: 3,            // initial velocity magnitude
  gravity: -9.8,
  lifetime: 0.8,       // seconds before removal
  size: 0.15,          // cube size
})

Implementation:
- Each particle: BoxGeometry(size, size, size)
- Initial velocity: random direction, magnitude = speed
- Each frame: position += velocity * dt, velocity.y += gravity * dt
- Opacity fades from 1 → 0 over lifetime
- Remove mesh from scene after lifetime
- Use a single component that manages an array of active particles
- Cap at 100 simultaneous particles (reuse oldest if exceeded)
```

### Checkpoint 3 ✅
**Dan verifies:** Click Trigger Payday → hero drops in → walks to each monster → monsters explode with particles → "+$" floats up → XP bar fills → victory message → level up works → island stage advances. THIS MUST FEEL GOOD. If it doesn't, stop and iterate here before moving on.

---

## PHASE 4: ISLAND GROWTH (30 min)

### Step 4.1 — Island Stages

```javascript
// src/systems/islandStages.js
// Stage is computed from monthsCompleted in gameStore

const STAGES = {
  0: { // Barren (start)
    name: 'Barren',
    decorations: [
      { type: 'deadTree', position: [-2, 0, -1] }
    ]
  },
  1: { // Month 1
    name: 'Sprout',
    decorations: [
      { type: 'smallTree', position: [-2, 0, -2] },
      { type: 'smallTree', position: [2, 0, -1] },
      { type: 'flowers', position: [1, 0, 2] },   // 3-4 tiny colored cubes
      { type: 'flowers', position: [-1, 0, 1] },
    ]
  },
  2: { // Month 2
    name: 'Settlement',
    decorations: [
      { type: 'hut', position: [2, 0, 2] },         // small 2x2x2 structure
      { type: 'path', from: [0, 0, 0], to: [2, 0, 2] }, // line of brown cubes
      { type: 'tree', position: [-3, 0, 0] },
      { type: 'bush', position: [0, 0, -3] },
    ]
  },
  3: { // Month 3
    name: 'Village',
    decorations: [
      { type: 'house', position: [2, 0, 2] },       // replaces hut: bigger, window
      { type: 'well', position: [-1, 0, 2] },       // stone ring + roof
      { type: 'garden', position: [1, 0, 3] },      // green + colored cubes grid
      { type: 'tree', position: [3, 0, -2] },
    ]
  },
  4: { // Month 5
    name: 'Town',
    decorations: [
      { type: 'building', position: [-2, 0, 2] },   // second structure
      { type: 'fence', around: 'perimeter' },         // posts along edge
      { type: 'pond', position: [-2, 0, -2] },       // blue flat cubes
      { type: 'tree', position: [3, 0, 1] },
      { type: 'lantern', position: [0, 0, 3] },     // tall thin cube + yellow top
    ]
  },
  5: { // Month 8
    name: 'Castle',
    decorations: [
      { type: 'castleTower', position: [2, 0, 2] }, // tall structure with battlements
      { type: 'walls', segments: 4 },                // stone walls connecting points
      { type: 'bridge', position: [3, 0, 0] },      // extends over water edge
      { type: 'flag', position: [2, 0, 2], offset: [0, 5, 0] }, // uses bannerColor
    ]
  },
  6: { // Month 12
    name: 'Kingdom',
    decorations: [
      { type: 'mainCastle', position: [2, 0, 2] },  // grand structure
      { type: 'fountain', position: [0, 0, 0] },    // replaces gold pile position nearby
      { type: 'clouds', count: 3 },                  // white cube clusters floating above
      { type: 'flags', count: 4 },                   // multiple flags, bannerColor
      { type: 'garden', position: [-2, 0, -2] },    // expanded gardens
      { type: 'dock', position: [4, 0, 0] },        // extends into water
    ]
  },
};

// IMPORTANT: Stages are CUMULATIVE.
// Stage 3 includes all decorations from stages 0-3.
// New items animate in with scale 0 → 1 over 0.3s (staggered 0.1s per item).
```

### Checkpoint 4 ✅
**Dan verifies:** Trigger payday multiple times. Watch island grow from barren to at least Stage 3. Each new stage should add visible new structures. The progression should feel earned and exciting.

---

## PHASE 5: SOUND DESIGN (30 min)

### Step 5.1 — Sound Manager

```javascript
// src/systems/soundManager.js
// ALL sounds are procedural using Web Audio API. No audio files.

class SoundManager {
  constructor() {
    this.ctx = null; // Created on first user interaction (browser policy)
    this.muted = false;
  }

  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Ensure context exists before any sound
  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  play(soundName) {
    if (this.muted) return;
    this.ensureContext();
    this[soundName]?.();
  }

  // === SOUND DEFINITIONS ===

  billAdd() {
    // Rising blip: 2 quick tones ascending
    // osc1: 400Hz 0.05s, osc2: 600Hz 0.05s
    // Triangle wave, gain 0.3
  }

  billRemove() {
    // Falling bloop: 500Hz → 300Hz over 0.1s
    // Triangle wave, gain 0.2
  }

  paydayStart() {
    // Trumpet fanfare: 3 notes ascending
    // Square wave, frequencies: [330, 440, 550], each 0.15s
    // Gain 0.3
  }

  heroSpawn() {
    // Impact thud (low freq noise burst) + sparkle (high freq chirp)
    // Noise: 80Hz sine, 0.1s, gain 0.4
    // Sparkle: 2000Hz → 4000Hz sweep, 0.2s, gain 0.15
  }

  monsterSlay() {
    // Slash (noise burst) + pop (descending tone)
    // Noise: white noise, 0.05s, bandpass 1000Hz
    // Pop: 800Hz → 200Hz sine, 0.1s, gain 0.3
  }

  xpTick() {
    // Rapid coin dings
    // 3 quick sine tones: 1200Hz, 1400Hz, 1600Hz
    // Each 0.03s, gain 0.15
  }

  levelUp() {
    // Ascending arpeggio (major chord)
    // Notes: C5, E5, G5, C6 (523, 659, 784, 1047 Hz)
    // Each 0.12s, sine wave, gain 0.25
  }

  victory() {
    // Triumphant 4-note melody
    // Notes: G4, C5, E5, G5 (392, 523, 659, 784 Hz)
    // Each 0.2s, square wave, gain 0.2
  }

  islandGrow() {
    // Magical shimmer: rising filtered noise
    // White noise through bandpass: 500Hz → 3000Hz over 0.8s
    // Gain 0.15, fade out
  }
}

export const soundManager = new SoundManager();
```

### Checkpoint 5 ✅
**Dan verifies:** Sounds play at correct moments. Mute button works. Nothing sounds annoying or jarring. 8-bit retro feel matches the voxel art style.

---

## PHASE 6: SHAREABILITY (45 min — this drives growth)

### Step 6.1 — Screenshot Capture

```
How it works:
1. User clicks "📸 Capture Kingdom" button (in HUD)
2. Hide all UI overlays
3. Render Three.js scene at 2x resolution:
   renderer.setSize(width * 2, height * 2)
   renderer.render(scene, camera)
   const dataUrl = renderer.domElement.toDataURL('image/png')
   renderer.setSize(width, height) // restore
4. Composite banner onto image using Canvas 2D:
   - Draw scene image
   - Draw semi-transparent black bar at bottom (height: 60px)
   - Draw text: "🏰 [Kingdom Name] · Lv.[X] [Tier] · Month [X] · paydaykingdom.app"
   - Font: bold 16px sans-serif, white
5. Show UI overlays again
6. Present share modal with options

Share options:
- 📥 Download PNG (creates blob, triggers download)
- 📋 Copy to Clipboard (navigator.clipboard.write with blob)
- 📤 Share (navigator.share API — mobile native share sheet)
  - Fallback: just show download + copy on desktop
```

### Step 6.2 — Kingdom Naming

```
First launch (no kingdomName in gameStore):
- Modal appears over everything
- "🏰 Name Your Kingdom"
- Text input, placeholder: "Fort Savings, Castle Coinsworth..."
- 6 banner color options (clickable circles):
  Red #ef4444, Blue #3b82f6, Green #22c55e,
  Purple #8b5cf6, Gold #fbbf24, Black #1e293b
- [Begin!] button
- Name + color saved to gameStore

In-scene:
- Flag object on highest building uses bannerColor
- Flag is a thin pole (brown cube stack) + rectangle (2 flat cubes in bannerColor)
```

### Step 6.3 — Onboarding (5 screens)

```
Only shows on first visit (check localStorage flag 'pk-onboarded')
Full-screen dark overlay, centered content, fade transitions between screens.

Screen 1: WELCOME
  "Welcome, brave soul."
  "In Payday Kingdom, your financial discipline builds a thriving world."
  [Begin Your Journey →]

Screen 2: KINGDOM NAME
  (KingdomNamer component from Step 6.2)

Screen 3: INCOME
  "How much treasure arrives each month?"
  [$ Monthly Income input]
  [Continue →]

Screen 4: BILLS
  "What monsters threaten your realm?"
  [Bill entry form — name, amount, category]
  [+ Add Another Monster]
  (minimum 1 bill required to proceed)
  [Forge My Kingdom →]

Screen 5: REVEAL
  Camera zooms from far to normal position (2s animation)
  Island appears with monsters on it
  "Your Kingdom Awaits."
  [Start Slaying ⚔️]
  → Sets 'pk-onboarded' in localStorage, closes overlay
```

### Checkpoint 6 ✅
**Dan verifies:** Fresh localStorage clear → onboarding flows perfectly → kingdom named → income/bills entered → island reveals → screenshot captures a beautiful image with banner → share works on mobile.

---

## PHASE 7: LAUNCH PREP (30 min)

### Step 7.1 — Landing Page (at root, pre-auth)

```
Only shows if user hasn't started (no budget data in localStorage).
After onboarding, never shows again.

Single page, scrollable:

HERO SECTION (above fold):
  - Background: dark gradient
  - Floating voxel cubes animation (decorative, CSS or simple Three.js)
  - Title: "Payday Kingdom" in pixel font, large
  - Subtitle: "Turn your boring budget into an epic voxel adventure"
  - [Start Your Kingdom →] CTA button (gold, large)

HOW IT WORKS (3 cards):
  1. "Enter your income and bills" + sword icon
  2. "Watch your hero slay bill monsters" + explosion icon
  3. "Grow your kingdom, flex to friends" + castle icon

PRIVACY NOTE:
  "No bank access. No accounts. Your data lives in your browser."

FOOTER:
  "Built with 🗡️ by Skyframe Innovations"
  GitHub icon link
```

### Step 7.2 — README.md

```markdown
# 🏰 Payday Kingdom

> Turn your boring budget into an epic voxel adventure

[screenshot of Stage 5+ kingdom here]

## What is this?

A gamified personal budget app where your bills are monsters, your payday spawns
a hero, and your financial discipline grows a beautiful voxel kingdom.
No bank connections. No accounts. Just vibes and voxels.

## Play Now

[Link to deployed app]

## How It Works

1. Enter your monthly income and bills
2. Hit "Trigger Payday" — your hero spawns and fights each bill
3. Earn XP, level up your hero, grow your island
4. Screenshot your kingdom and flex to friends

## Tech Stack

React · Three.js · Zustand · Tailwind CSS · Vite · Web Audio API

Zero backend. All data in localStorage.

## Run Locally

git clone [repo]
cd payday-kingdom
npm install
npm run dev

## Roadmap

- [ ] AI Agent NPCs (agents as island villagers)
- [ ] Friend kingdom visits
- [ ] Plaid bank integration
- [ ] Seasonal events & themes
- [ ] Mobile app (React Native)

## Built By

Skyframe Innovations LLC
[Dan's socials]

## License

MIT
```

### Step 7.3 — Deploy

```bash
# Build
npm run build

# Option A: Vercel (recommended)
npx vercel --prod

# Option B: GitHub Pages
# Add to vite.config.js: base: '/payday-kingdom/'
# Push dist/ to gh-pages branch

# Option C: Netlify
npx netlify deploy --prod --dir=dist

Target URL: paydaykingdom.vercel.app (or custom domain if available)
```

### Step 7.4 — Quick E2E Checklist

```
Run through manually:

[ ] Fresh start: clear localStorage, reload
[ ] Landing page shows
[ ] Click "Start" → onboarding begins
[ ] Name kingdom, pick color
[ ] Enter income ($3000)
[ ] Add 3 bills (Rent $1200, Electric $150, Phone $85)
[ ] Kingdom reveals with 3 monsters
[ ] Click Trigger Payday
[ ] Hero spawns, fights each monster
[ ] Particles, +$ text, sounds all fire
[ ] Victory message shows
[ ] XP bar fills, stats update
[ ] Island grows (stage 1 decorations appear)
[ ] Click Trigger Payday again (month 2)
[ ] Stage 2 decorations appear
[ ] Screenshot button works
[ ] Image includes banner with kingdom name
[ ] Download works
[ ] Share works on mobile
[ ] Refresh page: all data persists
[ ] Mobile viewport: layout works, touch works
[ ] Mute button: sounds stop
```

### Checkpoint 7 ✅ — SHIP IT
**Dan verifies:** Full flow works. Screenshot looks beautiful. Deploy is live. URL works.

---

## POST-LAUNCH CONTENT PLAN

```
Day 1 (Launch Day):
  - Post: "I built Animal Crossing for your budget in 7 days with AI"
  - Include: screenshot of Stage 5 kingdom, link to app
  - Platforms: X, Instagram, TikTok, LinkedIn

Day 2:
  - Post: time-lapse of island growing from barren → kingdom
  - Behind the scenes: show Bernie building + you reviewing

Day 3:
  - Post: "My $1200 rent is a giant red golem. Slaying it felt good."
  - Personal finance angle, relatable content

Week 2:
  - Tutorial: "How I built a 3D game in 7 days with AI coding agents"
  - Link to GitHub repo
  - Deep dive content for tech audience

Ongoing:
  - Share user kingdoms (repost anyone who screenshots)
  - Feature requests → content ("You asked for AI villagers... 👀")
```

---

## EMERGENCY PLAYBOOK

```
If Bernie gets stuck:
  1. Check the error message
  2. Is it a dependency issue? → npm install, check versions
  3. Is it Three.js related? → Check that meshes are added to scene correctly
  4. Is it state related? → Console.log the Zustand store
  5. Is it animation related? → Simplify. Remove animation, get static version working first.
  6. Still stuck? → Debrief with Claude, include error + relevant code snippet

If something looks ugly:
  1. Check COLORS constants are being used (not hardcoded values)
  2. Check lighting (ambient + directional both present?)
  3. Check camera angle (fov=50, position [8,8,8])
  4. Check cube sizes (most things should be 0.5-1.5 scale)

If performance is bad:
  1. Check particle count (cap at 100)
  2. Check monster count (cap at 20)
  3. Ensure geometry reuse (don't create new BoxGeometry per frame)
  4. Check for requestAnimationFrame leaks
```

---

*This blueprint was extracted from a working prototype.*
*Every decision has been tested. Follow it, and ship.* 🗡️
