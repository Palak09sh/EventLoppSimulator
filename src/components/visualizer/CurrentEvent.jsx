 function getEventMessage(event) {
        switch(event.type){
            case "push":
                      return `${event.frame} was pushed onto the Call Stack`;

    case "pop":
      return `${event.frame} was removed from the Call Stack`;
      case "log":
                return `Console logged: ${event.value}`
           case "microtask-enqueue":
  return `${event.label} was added to the Microtask Queue`;

case "microtask-dequeue":
  return `${event.label} was removed from the Microtask Queue`;
            case "macrotask-enqueue":
                return `${event.label} was added to the Macrotask Queue`;
            case "macrotask-dequeue":
                return `${event.label} was removed to the Macrotask Queue`;
                  default:
      return "Unknown event";
        }
  


        }
    
export function CurrentEvent({event}){
   
    return(
        <div>
            <h2>Current Event</h2>
            {event ? (
                <p>{getEventMessage(event)}</p>
            )
            : (
            <p>No event</p>
            )}
        </div>
    );
}