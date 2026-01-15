# ANTIGRAVITY.md - macOS AI Portfolio "Speed Run" Architecture

## 0. Project Context & Rules (MASTER PROMPT)
**Goal:** Build a functional macOS web simulation with an AI-powered terminal in <48 hours.
**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand, Framer Motion, OpenAI API.
**Agent Behavior:**
- **Strict Typing:** No `any`. Always define interfaces in `src/types/`.
- **Client/Server Boundary:** Use `'use client'` strictly for UI components (Windows, Dock). Use Server Actions/Route Handlers for AI.
- **State Management:** centralized in `src/store`. Do not use local state for window management.
- **Styling:** Use Tailwind utility classes. Maintain "Apple Design" (glassmorphism, clean borders, SF Pro fonts).
- **Icons:** Use `lucide-react`.

---

## 1. Phase 1: The Nervous System (State & Logic)
**Objective:** Make the desktop "live" (windows open, close, focus, drag).

### 1.1 Data Structures (Reference)
* **`WindowState`**: `{ id: string, title: string, isOpen: boolean, isMinimized: boolean, isMaximized: boolean, position: {x, y}, size: {w, h}, zIndex: number }`
* **`AppConfig`**: `{ id: string, title: string, icon: LucideIcon, component: React.ComponentType }`

### 1.2 Execution Steps

#### Step 1.1: Define Core Types
* **Action:** Create type definitions to enforce strict typing.
* **Agent Prompt:**
    > "Create a file `src/types/window.ts`. Define interfaces for `WindowState` and `WindowSize`.
    > Create a file `src/types/app.ts`. Define `AppID` as a union type of 'terminal' | 'finder' | 'projects' | 'resume' | 'vscode'. Define `AppConfig` interface."

#### Step 1.2: Implement Global Store
* **Action:** Set up the Zustand store for window management.
* **Agent Prompt:**
    > "Create `src/store/useWindowStore.ts` using Zustand.
    > State: `windows` (Record<string, WindowState>), `activeWindow` (string | null), `maxZIndex` (number).
    > Actions:
    > - `openWindow(id: AppID)`: If closed, open it with maxZIndex + 1. If open, just focus it.
    > - `focusWindow(id: AppID)`: Update the window's zIndex to maxZIndex + 1 and set activeWindow.
    > - `closeWindow(id: AppID)`: Set isOpen to false.
    > - `minimizeWindow(id: AppID)`: Set isMinimized to true.
    > - `toggleMaximize(id: AppID)`: Toggle isMaximized."

#### Step 1.3: Create the Window Manager
* **Action:** Create the component that renders active windows.
* **Agent Prompt:**
    > "Create `src/components/windows/WindowManager.tsx`.
    > It should use `useWindowStore` to get the list of windows.
    > Map through the `windows` object. If `window.isOpen` is true, render a `<WindowFrame>` component (we will build this next).
    > Pass the window ID and state to WindowFrame.
    > Place `<WindowManager />` inside `src/components/desktop/Desktop.tsx`."

---

## 2. Phase 2: The Window UI (The "Skin")
**Objective:** Create the draggable, glassmorphic window container.

### 2.1 Execution Steps

#### Step 2.1: Build Window Frame
* **Action:** Create the shell that holds apps.
* **Agent Prompt:**
    > "Create `src/components/windows/WindowFrame.tsx`.
    > Props: `window: WindowState`, `children: ReactNode`.
    > Use `react-draggable` (or `react-rnd`) for dragging.
    > Styling:
    > - Tailwind: `fixed rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-gray-900/80`.
    > - Header: 32px height, flex row, contains Traffic Lights.
    > - Drag Handle: The header should be the drag handle.
    > - Events: `onMouseDown` should trigger `focusWindow(id)`."

#### Step 2.2: Implement Traffic Lights
* **Action:** The Red/Yellow/Green buttons.
* **Agent Prompt:**
    > "Create `src/components/windows/TrafficLights.tsx`.
    > Render 3 circles (Red, Yellow, Green) with hover symbols (x, -, +).
    > Connect them to `useWindowStore` actions: close, minimize, maximize."

#### Step 2.3: Build the Dock
* **Action:** The launcher at the bottom.
* **Agent Prompt:**
    > "Create `src/components/desktop/Dock.tsx`.
    > Use `framer-motion` for the magnification effect.
    > List the apps defined in `AppID`.
    > On click: Call `openWindow(id)` from the store.
    > Style: Glassmorphism container at bottom center."

---

## 3. Phase 3: Terminal Core (The "Mouth")
**Objective:** Functional terminal executing local commands.

### 3.1 Execution Steps

#### Step 3.1: Setup XTerm.js
* **Action:** Initialize the terminal emulator.
* **Agent Prompt:**
    > "Create `src/components/apps/Terminal/Terminal.tsx`.
    > Initialize `XTerm.js` with `FitAddon`.
    > styling: standard macOS terminal colors (SF Mono font).
    > Ensure it resizes correctly when the window resizes."

#### Step 3.2: Local Command Parser
* **Action:** Handle simple commands without AI.
* **Agent Prompt:**
    > "Create `src/lib/commands/localParser.ts`.
    > Function `parseCommand(input: string)`.
    > Supported commands:
    > - `help`: Returns a list of commands.
    > - `clear`: Clears terminal.
    > - `open [app]`: Calls `openWindow(app)`.
    > Integrates this parser into `Terminal.tsx`'s `onData` listener."

---

## 4. Phase 4: AI Brain (The "Mind")
**Objective:** Connect OpenAI to control the desktop.

### 4.1 Execution Steps

#### Step 4.1: API Route
* **Action:** Backend logic for AI.
* **Agent Prompt:**
    > "Create `src/app/api/chat/route.ts`.
    > Use the OpenAI SDK.
    > Define a `system` prompt: 'You are a macOS portfolio assistant. You can open apps using the `open_window` tool.'
    > Define a tool `open_window` with parameter `appId`.
    > If the model calls the tool, return the function call JSON to the client."

#### Step 4.2: Client Integration
* **Action:** Connect Terminal to API.
* **Agent Prompt:**
    > "Update `Terminal.tsx`.
    > If a command is NOT found in `localParser`, send the input string to `/api/chat`.
    > While waiting, show a loading spinner or '...'
    > If the API returns a tool call for `open_window`, execute `useWindowStore.getState().openWindow(id)`."

---

## 5. Phase 5: App Content (The "Soul")
**Objective:** Fill the empty windows.

### 5.1 Execution Steps

#### Step 5.1: Projects App
* **Action:** A grid of your work.
* **Agent Prompt:**
    > "Create `src/components/apps/Projects/ProjectsApp.tsx`.
    > Create a mock data file `src/data/projects.ts` with 3 items.
    > Render a responsive grid of cards using Tailwind.
    > Each card should have a 'View Code' button."

#### Step 5.2: VS Code App
* **Action:** Code viewer.
* **Agent Prompt:**
    > "Create `src/components/apps/VSCode/VSCodeApp.tsx`.
    > Use `@monaco-editor/react`.
    > Set it to read-only mode.
    > Theme: 'vs-dark'."

#### Step 5.3: Register Apps
* **Action:** Map IDs to Components.
* **Agent Prompt:**
    > "Update `src/components/windows/WindowManager.tsx`.
    > Create a mapping object: `{ terminal: <TerminalApp />, projects: <ProjectsApp />, ... }`.
    > Render the correct component based on the window ID."

---

## 6. Verification Checklist
1.  [ ] **Desktop**: Can I see the background and Dock?
2.  [ ] **Window Logic**: Can I click a Dock icon to open a window?
3.  [ ] **Window UI**: Can I drag, resize, and close that window?
4.  [ ] **Terminal**: Can I type `help` and see output?
5.  [ ] **AI**: Can I type "Show me your projects" and does the Projects window open?