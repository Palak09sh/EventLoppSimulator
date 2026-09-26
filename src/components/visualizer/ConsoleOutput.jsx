export function ConsoleOutput({ output }) {
  return (
    <section className="console-panel">
      <div className="panel-header">
        <span className="panel-indicator console-indicator" />
        <h2>Console</h2>
      </div>

      <div className="console-output">
        {output.length === 0 ? (
          <div className="empty-state">
            No output yet
          </div>
        ) : (
          output.map((log, index) => (
            <div
              className={`console-line ${index === output.length - 1
                  ? "console-line-active"
                  : ""
                }`}
              key={index}
            >
              <span className="console-prompt">&gt;</span>
              {log}
            </div>
          ))
        )}
      </div>
    </section>
  );
}