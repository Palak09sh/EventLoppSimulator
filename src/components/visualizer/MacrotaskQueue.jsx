export function MacroTaskQueue({queue}) {
    return (
        <div>
            <h2>MacroTask</h2>
            <div>
                {queue.map((task, index )=> (
                   <div key = {index}> {task.label} </div>
                ))}
            </div>
        </div>
    )
}