import { useState } from "react";
export function useTracePlayback(trace) {
    const [currentStep, setCurrentStep] = useState(0);
    const [callStack, setCallstack] = useState([]);
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [microtaskQueue , setMicrotaskQueue] = useState([]);
     const [macrotaskQueue , setMacrotaskQueue] = useState([]);


    function step() {
        if (currentStep < trace.length) {
            const event = trace[currentStep];
            console.log("TRACE:", trace);
console.log("CURRENT STEP:", currentStep);
            applyEvent(event);

            setCurrentStep(currentStep + 1);
            
        }
    }
    function applyEvent(event) {
        switch (event.type) {
            case "push":
                setCallstack(prev => [...prev , event.frame])
                break;
            case "pop":
                setCallstack(prev => prev.slice(0,-1))
                break;
            case "log":
                setConsoleOutput(prev => [...prev , event.value])
                break;
            case "microtask-enqueue":
             setMicrotaskQueue(prev => [...prev , event.label])
             break;
            case "microtask-dequeue":
                setMicrotaskQueue(prev => prev.slice(1));
                break;
            case "macrotask-enqueue":
                  setMacrotaskQueue(prev => [...prev , event.task]);
                  break;
            case "macrotask-dequeue":
                 setMacrotaskQueue(prev => prev.slice(1));
                 break;

        }
    }
    function reset() {
    setCurrentStep(0);
    setCallstack([]);
    setConsoleOutput([]);
    setCurrentStep([]);
    setMicrotaskQueue([]); 
    setMacrotaskQueue([])

    }
    return {
        currentStep,
        callStack,
        consoleOutput,
        microtaskQueue,
        macrotaskQueue,
        step,
        reset
        
    };
}