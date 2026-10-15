# EventloopSimulator

I built EventLoopSimulator to explore the JavaScript runtime beyond writing the regular code. It uses a custom AST interpreter that I implemented to execute a supported subset of JavaScript and generate traces that can be visualized step by step.

Instead of just reading about the event loop, you can write code and watch its execution step by step.

# Features

- **Custom AST Interpreter** - Parses and evaluates supported JavaScript syntax.
- **Runtime Visualization** - Visualizes the call stack, Web APIs, microtask queue, and macrotask queue.
- **Step-by-step** - Move through execution events one step at a time.
- **Auto Run** - Watch the execution trace play automatically with adjustable speed.
- **Console & Error Handling** - View program output and supported execution errors.
- **Code Examples** - Experiment with synchronous code, Promises, and setTimeout.

# Tech Stack

- JavaScript
- React
- Acorn
- CSS
- Vite

  # Getting Started

  Clone the repository and install the dependencies

  ```
  npm install
  npm run dev
  ```

  # Supported JavaScript
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

# Project Structure
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

  # What I learned

Building this project helped me understand AST interpretation, function execution, lexical scopes, execution tracing and how the event loop coordinates asynchronous tasks.

**NOTE** : EventloopSimulator is an educational project that implements a simplified JavaScript runtime, not a complete JavaScript engine.


