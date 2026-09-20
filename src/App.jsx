import { useState } from "react";
import { runCode } from "./engine/traceRunner"
import { useTracePlayback } from "./hooks/useTracePlayback";
import { CallStack } from "./components/visualizer/CallStack";
import { MicroTaskQueue } from "./components/visualizer/MicrotaskQueue";
import { MacroTaskQueue } from "./components/visualizer/MacrotaskQueue";
import { ConsoleOutput } from "./components/visualizer/ConsoleOutput";
import { PlayBackControls } from "./components/controls/PlaybackControls";
import { CodeEditor } from "./components/editor/CodeEditor";

function App() {
    const[trace,setTrace] = useState([]);
    const[code, setCode] = useState(`console.log("HELLO");
        

setTimeout(() => {
  console.log("TIMER");
}, 10);`)

  
    function handleRun() {
      reset();  
const  newTrace = runCode(code);
setTrace(newTrace)
run(newTrace)
    }
        
        const { currentStep , step , callStack,microtaskQueue, macrotaskQueue,consoleOutput,reset,run,currentEvent} = useTracePlayback(trace)
    return(
        <>
    <h1>this is eventloop simulator</h1>
    <button onClick={step}> step </button>
    <button onClick={handleRun}>Run</button>
    <p>current step: {currentStep}</p>
    <CallStack stack={callStack} />
    <MicroTaskQueue queue={microtaskQueue} />
    <MacroTaskQueue queue={macrotaskQueue} />
    <ConsoleOutput output={consoleOutput} />
    <PlayBackControls reset={reset} />
    <CodeEditor code={code} setCode={setCode} />
    <pre>{JSON.stringify(currentEvent,null,2)}</pre>
        </>
       
    )
}
export default App;
 