function getEventMessage(event) {
  switch (event.type) {
    case "push":
      return `${event.frame} was pushed onto the Call Stack`;

    case "pop":
      return `${event.frame} was removed from the Call Stack`;
    case "log":
      return `Console logged: ${event.value}`
    case "microtask-enqueue":
      return `Microtask Queue`;

    case "microtask-dequeue":
      return `Microtask Queue`;
    case "macrotask-enqueue":
      return `Macrotask Queue`;
    case "macrotask-dequeue":
      return `${event.label} was removed to the Macrotask Queue`;
    case "webapi-enqueue":
      return `${event.label} was added to Web APIs`;

    case "webapi-complete":
      return `${event.label} completed in Web APIs`;
    default:
      return "Unknown event";
  }



}
function getEventCategory(event) {
  switch (event.type) {
    case "push":
    case "pop":
      return `Call Stack`;
    case "log":
      return `Console log`
    case "microtask-enqueue":
      return `Microtask Queue`;

    case "microtask-dequeue":
      return `Microtask Queue`;
    case "macrotask-enqueue":
      return `Macrotask Queue`;
    case "macrotask-dequeue":
      return `Macrotask Queue`;
    case "webapi-enqueue":
    case "webapi-complete":
      return "Web APIs";

    default:
      return "Unknown event";
  }
}

export function CurrentEvent({ event }) {
  if (!event) {
    return (
      <div className="current-event">
        <div className="current-event-empty">
          No event
        </div>
      </div>
    );
  }

  return (
    <div className="current-event">
      <h2>Current Event</h2>

      <p>{getEventCategory(event)}</p>

      <p>{getEventMessage(event)}</p>
    </div>
  );
}