export function MicroTaskQueue({queue}) {
    return (
        <div>
            <h2>MicroTask</h2>
            <div>
                {queue.map((task, index )=> (
                   <div key = {index}> {task} </div>
                ))}
            </div>
        </div>
    )
}