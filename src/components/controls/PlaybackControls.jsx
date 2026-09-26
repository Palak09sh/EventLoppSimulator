export function PlayBackControls({
  step,
  autoRun,
  resume,
  pause,
  isRunning,
  isPaused,
}) {
  return (
    <div className="playback-buttons">
      <button onClick={step}>
        Step
      </button>

      <button
        onClick={autoRun}
        disabled={isRunning}
      >
        Auto Run
      </button>

      <button
        onClick={resume}
        disabled={!isPaused}
      >
        Resume
      </button>

      <button
        onClick={pause}
        disabled={!isRunning}
      >
        Pause
      </button>
    </div>
  );
}