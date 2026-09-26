export function CodeEditor({ code, setCode }) {
  function onChange(event) {
    setCode(event.target.value);
  }

  return (
    <div className="code-editor">
      <textarea
        value={code}
        onChange={onChange}
        spellCheck={false}
        className="code-textarea"
      />
    </div>
  );
}