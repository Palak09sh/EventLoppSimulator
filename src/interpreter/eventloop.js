import { macroTaskqueue, dequeueMacro } from "./macrotask";
import { microTaskqueue, drainMicrotasks } from "./microtask";
export function runEventLoop(executeFunction){
    while(!microTaskqueue.isEmpty() || !macroTaskqueue.isEmpty()){
        if(!macroTaskqueue.isEmpty()){
            const task = dequeueMacro()
            executeFunction(task.callback, [])
        }
        drainMicrotasks();
        }
    }
