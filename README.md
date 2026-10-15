# EventLoopSimulator
*A Visual Playground for the JavaScript Runtime*

I built EventLoopSimulator to understand how JavaScript works under the hood. It uses a custom AST interpreter that I implemented to execute a supported subset of JavaScript and generate traces of its execution

Instead of just reading about the event loop, you can write code and watch its execution step by step.
## Preview

<img width="400" height="186" alt="gif" src="https://github.com/user-attachments/assets/f226a13c-d4d4-4537-af3e-ef31a93cfbe9" />

## Features

- **Custom AST Interpreter** - Parses and evaluates supported JavaScript syntax.
- **Runtime Visualization** - Visualizes the call stack, Web APIs, microtask queue, and macrotask queue.
- **Step-by-step** - Move through execution events one step at a time.
- **Auto Run** - Watch the execution trace play automatically with adjustable speed.
- **Console & Error Handling** - View program output and supported execution errors.
- **Code Examples** - Experiment with synchronous code, Promises, and setTimeout.

## Tech Stack

- JavaScript
- React
- Acorn
- CSS
- Vite

## How It Works

- **Parsing** — JavaScript source code is converted into an Abstract Syntax Tree (AST).
- **Interpretation** — The custom interpreter evaluates supported statements and expressions.
- **Trace Generation** — Execution events are recorded, including function calls, returns, console logs, and queue operations.
- **Event Loop Simulation** — The simulator processes macrotasks and drains the microtask queue after each macrotask.
- **Trace Playback** — The React frontend replays the trace and updates the runtime visualization.
  
## Supported JavaScript
  The interpreter supports a subset of JavaScript features, including:

  - Variable Declarations
  - Function declarations and calls
  - Return Statements
  - Block Statements
  - Literals and identifiers
  - Basic arithmetic expressions
  - Assignment expressions
  - console.log()
  - setTimeout()
  - Promise.resolve().then()
  - Arrow functions and function expression



## Project Structure
```
src/
├── components/
│   ├── controls/
│   │   ├── PlaybackControls.jsx
│   │   └── ExampleSelector.jsx
│   ├── editor/
│   │   └── CodeEditor.jsx
│   └── visualizer/
│       ├── CallStack.jsx
│       ├── ConsoleOutput.jsx
│       ├── CurrentEvent.jsx
│       ├── MacrotaskQueue.jsx
│       ├── MicrotaskQueue.jsx
│       └── Visualiser.jsx
├── engine/
│   └── traceRunner.jsx
├── example/
│   ├── snippet.js
│   └── examples.js
├── hooks/
│   └── useTracePlayback.js
├── interpreter/
│   ├── eventloop.js
│   ├── interpreter.js
│   ├── macrotask.js
│   ├── main.js
│   ├── microtask.js
│   ├── parser.js
│   ├── promise.js
│   ├── queue.js
│   ├── scope.js
│   ├── traceEvent.js
│   ├── walk.js
│   └── webapi.js
├── App.jsx
└── index.css
```
## Getting Started

  Clone the repository and install the dependencies

  ```
  npm install
  npm run dev
  ```

## What I learned

Building this project helped me understand AST interpretation, function execution, lexical scopes, execution tracing and how the event loop coordinates asynchronous tasks.

**NOTE:**  EventloopSimulator is an educational project that implements a simplified JavaScript runtime, not a complete JavaScript engine.


