import { trace } from "./interpreter";
import {
  webApiEnqueueEvent,
  webApiCompleteEvent,
} from "./traceEvent";
import { enqueue } from "./macrotask";

export const webApiQueue = [];

export function registerWebApi(task) {
  webApiQueue.push(task);

  trace.push(webApiEnqueueEvent(task));

  completeWebApi(task);
}

function completeWebApi(task) {
  const index = webApiQueue.indexOf(task);

  if (index !== -1) {
    webApiQueue.splice(index, 1);
  }

  trace.push(webApiCompleteEvent(task));

  enqueue(task);
}

export function getWebApiQueue() {
  return webApiQueue;
}