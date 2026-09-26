export function MacroTaskQueue({ queue }) {
  return (
    <div className="runtime-list">
      {queue.map((task, index) => (
        <div
          className="runtime-item macrotask-item"
          key={index}
        >
          {typeof task === "string" ? task : task.label}
        </div>
      ))}
    </div>
  );
}