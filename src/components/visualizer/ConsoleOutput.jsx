export function ConsoleOutput({output}) {
    return(
      <div>
        <h2>Console</h2>
        <div>
            {output.map((log,index) => <div key={index}>{log}</div>)}
        </div>
      </div>
    )
}