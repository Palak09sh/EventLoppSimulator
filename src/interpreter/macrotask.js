import { createQueue } from "./queue";
// Macrotask queue, kept sorted by delay so the task with the shortest
// remaining delay runs first(mirrors how setTimeout scheduling works)
export const macroTaskqueue = createQueue((a, b) => a.delay - b.delay);
/**
 * Creates a macrotask - a deferreed callback with its associated delay.
 * @param {Fucntion} callback - The function to run when the task fries.
 * @param {number} delay - Delay in ms, used to order tasks in queue
 * @returns {{callback: Function, delay: number}} A macrotask object.
 */
export function createMacroTask(callback, delay) {
  return {

    callback,
    delay
  };
}
