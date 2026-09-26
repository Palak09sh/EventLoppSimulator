import { CallStack } from "./CallStack";

export function Visualizer({
  callStack,
  webApiQueue,
  microtaskQueue,
  macrotaskQueue,
}) {
  return (
    <div className="runtime-grid">

      {/* Call Stack */}

      <section className="runtime-panel call-stack-panel">

        <h2 className="panel-title">
          <span className="panel-dot call-stack-dot" />
          Call Stack
        </h2>

        <div className="panel-content">
          <CallStack stack={callStack} />
        </div>

      </section>


      {/* Web APIs */}

      <section className="runtime-panel web-api-panel">

        <h2 className="panel-title">
          <span className="panel-dot web-api-dot" />
          Web APIs
        </h2>

        <div className="panel-content">

          {webApiQueue.length === 0 ? (
            <div className="empty-state">
              Nothing pending
            </div>
          ) : (
            webApiQueue.map((task, index) => (
              <div
                className="runtime-item web-api-item"
                key={index}
              >
                {task}
              </div>
            ))
          )}

        </div>

      </section>


      {/* Microtask Queue */}

      <section className="runtime-panel microtask-panel">

        <h2 className="panel-title">
          <span className="panel-dot microtask-dot" />
          Microtask Queue
        </h2>

        <div className="panel-content">

          {microtaskQueue.length === 0 ? (
            <div className="empty-state">
              Empty
            </div>
          ) : (
            microtaskQueue.map((task, index) => (
              <div
                className="runtime-item microtask-item"
                key={index}
              >
                {task}
              </div>
            ))
          )}

        </div>

      </section>


      {/* Macrotask Queue */}

      <section className="runtime-panel macrotask-panel">

        <h2 className="panel-title">
          <span className="panel-dot macrotask-dot" />
          Macrotask Queue
        </h2>

        <div className="panel-content">

          {macrotaskQueue.length === 0 ? (
            <div className="empty-state">
              Empty
            </div>
          ) : (
            macrotaskQueue.map((task, index) => (
              <div
                className="runtime-item macrotask-item"
                key={index}
              >
                {task.label}
              </div>
            ))
          )}

        </div>

      </section>

    </div>
  );
}