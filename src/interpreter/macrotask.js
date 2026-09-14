import { createQueue } from "./queue";
import { Macrotaskdequeue , Macrotaskenqueue} from "./traceEvent";
import { trace } from "./interpreter";
// Macrotask queue, kept sorted by delay so the task with the shortest
// remaining delay runs first(mirrors how setTimeout scheduling works)
export const macroTaskqueue = createQueue((a, b) => a.delay - b.delay);
export function enqueue(task) {
  macroTaskqueue.enqueue(task);
  
  trace.push(Macrotaskenqueue(task))
}
export function dequeueMacro() {
  const task = macroTaskqueue.dequeue();
  trace.push(Macrotaskdequeue(task))
  return task;
}
export function isMacroQueueEmpty() {
  return macroTaskqueue.isEmpty();
}

/**
 * Creates a macrotask - a deferreed callback with its associated delay.
 * @param {Fucntion} callback - The function to run when the task fries.
 * @param {number} delay - Delay in ms, used to order tasks in queue
 * @returns {{callback: Function, delay: number}} A macrotask object.
 */
export function createMacroTask(callback, delay) {
  return {
    callback,
    delay,
    label: "setTimeout callback"
  };
}
