# Implementation Plan - AI Simulation Lab Integration

The goal is to make the "First Salary Challenge" simulation interactive using the Gemini AI API. Users will chat with "FinYoda" to decide how to allocate their first salary of ₹50,000.

## Backend Changes

### 1. Dependencies & Configuration
- Installed `@google/generative-ai`.
- Configured `.env` with `GEMINI_KEY`.

### 2. API Development (`/api/simulation`)
- **`POST /start`**: Initializes the simulation session. Sends a system prompt to Gemini to set the persona and scenario. Returns the first AI greeting.
- **`POST /chat`**: Handles ongoing conversation. Maintains session history and generates contextual AI responses based on user input.

### 3. Gemini Integration
- Using `gemini-1.5-flash` for fast, conversational responses.
- System prompt defines "FinYoda" persona and the ₹50,000 salary constraint.

## Frontend Changes

### 1. New Component: `FirstSalarySimulation.tsx`
- Implements a premium chat interface (glassmorphism, smooth animations).
- Manages local chat history and communicates with the new simulation API.
- Detects "completion" keywords to trigger the success state.

### 2. Dashboard & Navigation Updates
- `SimulationView` updated with a functional "Launch Scenario" button.
- `App.tsx` manages `activeSimulation` state and switches views smoothly.
- Navigation ensures simulations are cleaned up when switching tabs.

### 3. XP Integration
- Success in the simulation awards **500 XP** to the user's persistent profile.
