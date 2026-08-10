// Helper functions(Constructors)for creating execution events used by the visualizer
export function pushFrame(frame) {
  return { type: "push", frame };
}
export function popFrame(frame) {
  return { type: "pop", frame };
}
export function logEvent(value) {
  return { type: "log", value };
}
