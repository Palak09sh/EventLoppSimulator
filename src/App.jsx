import { useState } from "react";

import { CodeEditor } from "./components/editor/CodeEditor";
import { PlayBackControls } from "./components/controls/PlaybackControls";
import { Visualizer } from "./components/visualizer/Visualiser";
import { CurrentEvent } from "./components/visualizer/CurrentEvent";
import { ConsoleOutput } from "./components/visualizer/ConsoleOutput";

import { runCode } from "./engine/traceRunner";
import { useTracePlayback } from "./hooks/useTracePlayback";
import { ExampleSelector } from "./components/controls/ExampleSelector";

import "./index.css";

function App() {
  const [code, setCode] = useState(`console.log("Hello");`);
  const [trace, setTrace] = useState([]);
  const [error, setError] = useState(null);
  
function handleExampleSelect(exampleCode) {
    pause();
    reset();
    setTrace([]);
    setCode(exampleCode);
    setError(null);
  }
  function generateTrace() {
    pause();
    reset();

    try {
      const newTrace = runCode(code);
      setTrace(newTrace);
      return newTrace;
    } catch (error) {
      setError(error.message);
      setTrace([]);
      return [];
    }
  }
  function handleStep() {
    if(trace.length === 0){
      const newTrace = generateTrace();
      if(newTrace.length > 0) {
        step(newTrace);
      }
      return; 
    }
    step(trace)
  }
  function handleAutoRun() {
    const newTrace = generateTrace();

    if (newTrace.length > 0) {
      run(newTrace);
    }
  }
  function handleReset() {
    reset();
    setError(null);
  }
  
  const {
    currentEvent,
    callStack,
    webApiQueue,
    microtaskQueue,
    macrotaskQueue,
    consoleOutput,
    playbackSpeed,
    setPlaybackSpeed,
    isPaused,
    isRunning,
    step,
    reset,
    run,
    pause,
    resume,

  } = useTracePlayback(trace);

  return (
    <main className="app">

      <header className="app-header">

        <div className="brand">
          <div className="brand-icon">
            ◔
          </div>

          <div>
            <h1>Event Loop Visualizer</h1>
            <p>A Visual Playground for the JavaScript Runtime</p>
          </div>
        </div>

        <div className="header-actions">
          <ExampleSelector onSelect={handleExampleSelect} />

          <div className="speed-control">
            <span>Speed:</span>

            <strong>
              {Math.round(500 / playbackSpeed)}ms
            </strong>

            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={playbackSpeed}
              onChange={(event) =>
                setPlaybackSpeed(Number(event.target.value))
              }
            />
          </div>

          <button
            className="header-icon-button"
            onClick={handleReset}
            title="Reset"
          >
            <span>↻</span>
            Reset
          </button>

        </div>

      </header>

      <div className="simulator-layout">

        <section className="editor-area">

          <div className="editor-header">

            <div className="editor-language">
              <span className="status-dot" />
              JavaScript
            </div>

            <span className="editor-extension">
              JS
            </span>

          </div>

          <CodeEditor
            code={code}
            setCode={setCode}
          />

        </section>


        <section className="runtime-area">

          {/* Controls */}

          <div className="controls-area">

            {/* Right */}
            <div className="playback-buttons">

              <PlayBackControls
                step={handleStep}
                autoRun={() => handleAutoRun()}
                resume={() => resume(trace)}
                pause={pause}
                isRunning={isRunning}
                isPaused={isPaused}
              />

            </div>

          </div>


          {/* Current Event */}

          <div className="current-event-wrapper">
            <CurrentEvent event={currentEvent} />
          </div>

          {/* Runtime visualization */}

          <Visualizer
            callStack={callStack}
            webApiQueue={webApiQueue}
            microtaskQueue={microtaskQueue}
            macrotaskQueue={macrotaskQueue}
          />

        </section>

        {/*RIGHT — CONSOLE*/}

        <section className="output-area">

          <div className="output-header">

            <div>
              <span className="output-dot" />
              Console
            </div>

          </div>

          <div className="output-content">

            <ConsoleOutput
              output={consoleOutput}
              error={error}
            />

          </div>

        </section>

      </div>

    </main>
  );
}

export default App;