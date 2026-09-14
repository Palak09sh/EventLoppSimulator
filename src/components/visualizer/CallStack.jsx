export function CallStack({ stack }){
    return (
        <div>
            <h2>CallStack</h2>
            <div>
                {stack.map((frame, index )=> (
                   <div key = {index}> {frame} </div>
                ))}
            </div>
        </div>
    )

    
}