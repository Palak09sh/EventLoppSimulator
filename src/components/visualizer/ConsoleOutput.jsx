export function ConsoleOutput({ output, error }) {
  return (
    <section className="console-panel">
      <div className="panel-header">
        <span className="panel-indicator console-indicator" />
        <h2>Console</h2>
      </div>

      <div className="console-output">
        <div className="console-output">
        {error && (
          <div className="console-error">
            <span className="console-error-prompt">✕</span>
            <span>{error}</span>
          </div>
        )}
               {output.length === 0 && !error ?  (
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
        </div>
    </section>
  );
}