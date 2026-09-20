export function CodeEditor({code,setCode}){
    function onChange(event){
        setCode(event.target.value)
    }
    return (
 <div>
        <textarea value={code} onChange={onChange} />
    </div>
    )
   
}