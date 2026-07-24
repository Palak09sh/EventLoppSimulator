import parse from "./interpreter/parser"
import walk from "./interpreter/interpreter"
function App() {
    const ast = parse(`let a = 24 `)
        console.log(JSON.stringify(ast))
        walk(ast)   
    return(
        <>
    <h1>this is eventloop simulator</h1>
        </>
       
    )
}
export default App;
 