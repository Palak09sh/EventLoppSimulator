import { interpreter } from "./interpreter/interpreter"
import parse from "./interpreter/parser"
import walk from "./interpreter/walk"
function App() {
    const ast = parse(`let a = 24 
        let b = 23;
        add = a+b;
    `)
        console.log(JSON.stringify(ast))
        walk(ast) 
       interpreter(ast)
    return(
        <>
    <h1>this is eventloop simulator</h1>
        </>
       
    )
}
export default App;
 