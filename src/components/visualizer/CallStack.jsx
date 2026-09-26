export function CallStack({ stack }) {
  return (
    <div className="runtime-list">
      {stack.map((frame, index) => (
        <div
          className="runtime-item callstack-item"
          key={index}
        >
          {frame}
        </div>
      ))}
    </div>
  );
}