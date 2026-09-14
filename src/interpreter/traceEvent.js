// Helper functions(Constructors)for creating execution events used by the visualizer
export function pushFrame(frame) {
  return { type: "push", frame };
}
export function popFrame(frame) {
  return { type: "pop", frame };
}
export function isEmpty(){
  return this.frame.length === 0;
}
export function logEvent(value) {
  return { type: "log", value };
}
export function Microtaskenqueue(task){
  return {
  type: "microtask-enqueue",
  task,
  label: "Promise.then callback"
  };
}
export function Microtaskdequeue(task){
  return {
    type: "microtask-dequeue", 
    task
  };
}
export function Macrotaskenqueue(task){
  return {
    type: "macrotask-enqueue",
    task
  };
}


export function Macrotaskdequeue(task){
  return {
    type: "macrotask-dequeue",
    task
  };
}

