<p align="center">
  <img src="docs/constellation-banner.svg" alt="Constellation Tracker Banner" width="100%"/>
</p>

<h1 align="center">Constellation Tracker</h1>

<p align="center">
  <strong>Turn your daily habits into beautiful constellations in the night sky.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/TypeScript-supported-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

---

## About

Constellation Tracker is a web application that reimagines habit tracking as an astronomical experience. When you create a habit, the app generates a unique constellation pattern in the night sky. Each day you complete your habit, a star in that constellation lights up with a golden glow. Connect all the stars, complete the constellation, and watch the entire pattern illuminate.

The concept is simple: **consistency builds something beautiful.**

## Features

- **Constellation Visualization** -- Each habit is mapped to a constellation pattern with interactive star nodes rendered via SVG. Click a star to mark a day complete and watch it glow gold.
- **Habit Creation** -- Describe any habit you want to build and choose how many days (1--100) to track. The backend generates a unique constellation shape for your goal.
- **Progress Tracking** -- Completed days light up as golden stars. When every star is activated, the entire constellation glows to celebrate your streak.
- **AI Chat Assistant** -- An integrated chat panel lets you ask questions and get advice about your habit, powered by a backend AI endpoint.
- **Animated Night Sky** -- A twinkling background of 800 stars, shooting star animations in the navbar, and smooth visual transitions throughout.
- **Reset Progress** -- Start fresh anytime with a single click.

## Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | React 18.2 with React Router 7              |
| Build Tool  | Vite 5.1                                    |
| Styling     | Tailwind CSS 3.4, PostCSS, custom CSS       |
| Language    | JavaScript (JSX) + TypeScript (TSX)         |
| Linting     | ESLint 8 with React Hooks & Refresh plugins |

## Project Structure

```
constellation-tracker/
├── src/
│   ├── main.jsx              # App entry point with React Router
│   ├── App.jsx               # Root component with route definitions
│   ├── Navbar.jsx            # Navigation bar with shooting star animations
│   ├── habitTracker.jsx      # Habit tracker page layout
│   ├── pages/
│   │   ├── Prompt.jsx        # Habit creation form
│   │   └── Details.jsx       # Details page
│   ├── assets/               # Static assets
│   ├── index.css             # Global styles
│   └── App.css               # App component styles
├── component/
│   ├── habitCard.tsx         # Core constellation visualization component
│   ├── HabitDetails.tsx      # AI chat interface panel
│   ├── star-node.tsx         # Individual star node button
│   ├── habitStyle.css        # Star node & terminal font styles
│   └── global.css            # Tailwind base & dark mode styles
├── public/                   # Static public files
├── docs/                     # Documentation assets
├── tailwind.config.tsx       # Tailwind theme configuration
├── vite.config.js            # Vite build configuration
├── postcss.config.js         # PostCSS plugins
├── eslint.config.js          # ESLint rules
└── package.json              # Dependencies & scripts
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)
- A running instance of the Constellation Tracker backend API on `http://localhost:3000`

### Installation

```bash
# Clone the repository
git clone https://github.com/sskarz/constellation-tracker.git
cd constellation-tracker

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` with hot module reloading enabled.

### Production Build

```bash
# Create an optimized build
npm run build

# Preview the production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

## API Endpoints

The frontend communicates with a backend API at `http://localhost:3000`. The following endpoints are expected:

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/createHabit`               | Create a new habit and constellation |
| GET    | `/getHabit?habitId={id}`     | Fetch habit data and node positions  |
| PUT    | `/habit/{habitId}/toggleNode`| Toggle a day node's completion state |
| POST   | `/chat`                      | Send a message to the AI assistant   |

## How It Works

1. **Create a Habit** -- Navigate to `/prompt`, describe your habit, and choose the number of days to track.
2. **View Your Constellation** -- The app renders your habit as a constellation pattern. Each node represents one day.
3. **Track Daily Progress** -- Click on a star node to mark that day as complete. The star turns from white to gold.
4. **Complete the Constellation** -- When all nodes are activated, the entire constellation glows to celebrate your achievement.
5. **Get AI Guidance** -- Use the built-in chat panel to ask for advice, motivation, or tips related to your habit.

## Scripts

| Command           | Description                                |
|-------------------|--------------------------------------------|
| `npm run dev`     | Start Vite dev server with HMR             |
| `npm run build`   | Build for production                       |
| `npm run preview` | Serve the production build locally         |
| `npm run lint`    | Run ESLint checks                          |

## License

This project is privately maintained.
