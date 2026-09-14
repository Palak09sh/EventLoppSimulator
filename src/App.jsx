import { runCode } from "./engine/traceRunner"
import { useTracePlayback } from "./hooks/useTracePlayback";
import { CallStack } from "./components/visualizer/CallStack";
import { MicroTaskQueue } from "./components/visualizer/MicrotaskQueue";
import { MacroTaskQueue } from "./components/visualizer/MacrotaskQueue";
import { ConsoleOutput } from "./components/visualizer/ConsoleOutput";
import { PlayBackControls } from "./components/controls/PlaybackControls";
function App() {
    const code = 
 `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
}); `

        const trace = runCode(code);
        const { currentStep , step , callStack,microtaskQueue, macrotaskQueue,consoleOutput,reset } = useTracePlayback(trace)
    return(
        <>
    <h1>this is eventloop simulator</h1>
    <button onClick={step}> step </button>
    <p>current step: {currentStep}</p>
    <CallStack stack={callStack} />
    <MicroTaskQueue queue={microtaskQueue} />
    <MacroTaskQueue queue={macrotaskQueue} />
    <ConsoleOutput output={consoleOutput} />
    <PlayBackControls reset={reset} />
        </>
       
    )
}
export default App;
 