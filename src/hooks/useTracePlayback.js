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

        }
    }
    function reset() {
        clearInterval(intervalRef.current)
        setRunning(false)
        setCurrentStep(0);
        setCallstack([]);
        setConsoleOutput([]);
        setMicrotaskQueue([]);
        setMacrotaskQueue([]);
        currentStepRef.current = 0;
        intervalRef.current = null;

    }
    function pause() {
        clearInterval(intervalRef.current);
        setRunning(false);

    }
    function run(traceToPlay = trace) {
        if (!isRunning && currentStepRef.current < traceToPlay.length) {
            setRunning(true)
            intervalRef.current = setInterval(() => {
                step(traceToPlay);
                if (currentStepRef.current >= traceToPlay.length) {
                    clearInterval(intervalRef.current)
                    setRunning(false)

                }

            }, 500)
        }
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
        currentEvent,


    };
}