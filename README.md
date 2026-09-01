# TravelMate AI

A full-stack travel planning app for exploring destinations, building itineraries, tracking budgets, and getting AI-style trip suggestions.

- **Backend**: Node.js + Express + SQLite (`/backend`)
- **Frontend**: React + Vite (`/frontend`)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (v20+ recommended)
- npm (comes with Node.js)
- VS Code (recommended extensions are suggested automatically — accept the prompt when you open the project)

## Project Structure

```
travelmate-ai/
├── backend/          Express API + SQLite database
├── frontend/          React + Vite single-page app
├── .vscode/           VS Code tasks, launch configs, settings
├── package.json       Root scripts to run both apps together
```

> Note: the `outputs/`, `work/`, `static/`, and `templates/` folders at the project root are leftovers from an earlier prototype and are **not** used by the current app. They're safe to ignore or delete.

## 1. Install dependencies

From the project root:

```bash
npm run install:all
```

This installs dependencies separately inside `backend/` and `frontend/`. (If `node_modules` folders are already present in those directories, this step just verifies/updates them.)

If you also want the root convenience scripts (`npm run dev`, which runs both servers together), install the root dependency once:

```bash
npm install
```

## 2. Configure environment variables

Both apps already ship with working `.env` files for local development:

- `backend/.env`
  ```
  PORT=5000
  JWT_SECRET=travelmate_super_secret_jwt_key_2026_secure
  NODE_ENV=development
  ```
- `frontend/.env` (optional — the frontend defaults to `http://localhost:5000/api` if this isn't set)
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

Change `JWT_SECRET` before deploying anywhere public.

## 3. Run the project

### Option A — One command from the root (recommended)

```bash
npm run dev
```

This starts the backend (`http://localhost:5000`) and frontend (`http://localhost:5173`) together.

### Option B — VS Code Task

Open the project folder in VS Code, then:
`Terminal → Run Task… → Run TravelMate AI (Backend + Frontend)`

This runs both dev servers in separate integrated terminal panels.

### Option C — Debug with breakpoints

Open the **Run and Debug** panel (`Ctrl+Shift+D` / `Cmd+Shift+D`) and choose:
- `Debug Backend (Node)` — runs the Express server with the debugger attached
- `Full Stack (Backend + Frontend in Chrome)` — starts the backend debugger and opens the frontend in a debuggable Chrome instance

### Option D — Run each app manually

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

### Option E — Windows double-click launcher

`START_PROJECT.bat` (in the project root) is still provided for Windows users who prefer double-clicking a file instead of using a terminal.

## 4. Open the app

Visit **http://localhost:5173** in your browser. The backend API runs at **http://localhost:5000/api**, with a health check at **http://localhost:5000/api/health**.

## Available Backend API Routes

| Route                 | Description                          |
|------------------------|--------------------------------------|
| `POST /api/auth/signup` | Register a new user |
| `POST /api/auth/login`  | Log in and receive a JWT |
| `GET  /api/auth/me`     | Get the logged-in user's profile |
| `GET  /api/destinations`| List destinations (with weather info)|
| `GET  /api/trips`       | Get the logged-in user's saved trips |
| `POST /api/trips`       | Save a new trip |
| `POST /api/planner`     | Generate an itinerary |
| `POST /api/contact`     | Submit a contact form message |

## Troubleshooting

- **`sqlite3` fails to load / native module error**: delete `backend/node_modules`, then re-run `npm install --prefix backend` on your machine — the prebuilt native binary must match your OS/architecture.
- **Port already in use**: change `PORT` in `backend/.env`, or stop whatever else is using port 5000/5173.
- **Frontend can't reach backend**: confirm the backend is running on port 5000 and `VITE_API_URL` (or the default) matches it.
