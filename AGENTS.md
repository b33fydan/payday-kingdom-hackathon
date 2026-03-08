# Payday Kingdom Hackathon Rules

## Payday Kingdom Hackathon Build

### Stack
- React + Vite + Three.js + Zustand

### Core Loop
- Income -> Bills spawn monsters -> Trigger Payday -> Hero battle -> XP -> Island grows -> Share screenshot

### Visual Style
- Voxel miniature kingdom

### Performance Rules
- Reuse geometries
- Cap pixel ratio
- Avoid React state updates per frame

### Scope
- Client-only
- No backend
- LocalStorage persistence

- This repository is a fresh hackathon build.
- Do not copy, import, or reference code/assets from any previous Payday Kingdom repo or local directory.
- Scope: manual income + bills, voxel island, hero payday battle, XP/level, island growth, screenshot capture, responsive UI.
- Out of scope: backend, auth, Plaid, multiplayer, cloud save, app store packaging.
- Prefer simple procedural Three.js BoxGeometry over external assets.
- For multi-step tasks, make a short plan first.
- After code changes, run: npm run build
- Keep diffs focused and reviewable.
- Report blockers immediately instead of guessing.
