import { createQueue } from "./queue";

// Microtask queue - plain FIFO, no compare function.
// microtasks have no delay to sort by; they always run in the ordere queued.

export const microTaskqueue = createQueue();
export function enqueueMicrotask(task) {
  microTaskqueue.enqueue(task);
}
/**
 * Runs every microtask currently in the queue, including by NEW
 * microtasks scheduled by callbacks while draining is in progress
 * (e.g. a.then() inside a.then()). This is why it's a `while` loop
 * re-checking the live queue, not a single pass over a fixed snapshot.
 *
 * `task` must always be a bare, directly-callable function - never an
 * interpreter function value ({node, closure}) and never a wrapper
 * object. Anything pushed via enqueueMicrotask must already be "real"
 * JS-callable by the time it lands here
 */

export function drainMicrotasks() {
  while (!microTaskqueue.isEmpty()) {
    const task = microTaskqueue.dequeue();
    task();
  }
}

export function isMicroQueueEmpty() {
  return microTaskqueue.isEmpty();
}
