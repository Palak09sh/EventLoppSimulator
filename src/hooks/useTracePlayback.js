import { useState, useRef } from "react";
export function useTracePlayback(trace) {
    const [currentStep, setCurrentStep] = useState(0);
    const [callStack, setCallstack] = useState([]);
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [microtaskQueue, setMicrotaskQueue] = useState([]);
    const [macrotaskQueue, setMacrotaskQueue] = useState([]);
    const [isRunning, setRunning] = useState(false);
    const intervalRef = useRef(null);
    const currentStepRef = useRef(0);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [webApiQueue, setWebApiQueue] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    function step(traceToPlay = trace) {
        
           const current =  currentStepRef.current 
           if (current < traceToPlay.length) {
            const event = traceToPlay[current];
            applyEvent(event);

           currentStepRef.current = current+1;
           setCurrentStep(current + 1)

        }
    }
    function applyEvent(event) {
        setCurrentEvent(event)
        switch (event.type) {
            case "push":
                setCallstack(prev => [...prev, event.frame])
                break;
            case "pop":
                setCallstack(prev => prev.slice(0, -1))
                break;
            case "log":
                setConsoleOutput(prev => [...prev, event.value])
                break;
            case "microtask-enqueue":
                setMicrotaskQueue(prev => [...prev, event.label])
                break;
            case "microtask-dequeue":
                setMicrotaskQueue(prev => prev.slice(1));
                break;
            case "macrotask-enqueue":
                setMacrotaskQueue(prev => [...prev, event.task]);
                break;
            case "macrotask-dequeue":
                setMacrotaskQueue(prev => prev.slice(1));
                break;
case "webapi-enqueue":
  setWebApiQueue(prev => [...prev, event.label]);
  break;

case "webapi-complete":
  setWebApiQueue(prev => prev.slice(1));
  break;
        }
    }
function reset() {
  clearInterval(intervalRef.current);
  intervalRef.current = null;

  setRunning(false);
  setIsPaused(false);

  setCurrentStep(0);
  setCallstack([]);
  setConsoleOutput([]);
  setMicrotaskQueue([]);
  setMacrotaskQueue([]);
  setWebApiQueue([]);
  setCurrentEvent(null);

  currentStepRef.current = 0;
}
    function pause() {
  clearInterval(intervalRef.current);
  intervalRef.current = null;

  setRunning(false);
  setIsPaused(true);
}
   function run(traceToPlay = trace) {
  if (currentStepRef.current >= traceToPlay.length) {
    return;
  }

  setRunning(true);
  setIsPaused(false);

  const interval = 500 / playbackSpeed;

  intervalRef.current = setInterval(() => {
    step(traceToPlay);

    if (currentStepRef.current >= traceToPlay.length) {
      clearInterval(intervalRef.current);
      setRunning(false);
      setIsPaused(false);
    }
  }, interval);
}
function resume(traceToPlay = trace) {
  if (!isPaused) {
    return;
  }

  run(traceToPlay);
}
    return {
        currentStep,
        callStack,
        consoleOutput,
        microtaskQueue,
        macrotaskQueue,
        step,
        reset,
        run,
        pause,
        resume,
        isPaused,
        isRunning,
        currentEvent,
        playbackSpeed,
        setPlaybackSpeed,
        
webApiQueue,


    };
}