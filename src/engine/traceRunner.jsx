import parse from '../interpreter/parser';
import { interpreter, executeFunction, trace, resetTrace } from '../interpreter/interpreter';
import { runEventLoop } from '../interpreter/eventloop';
export function runCode(code){
    resetTrace()
    const ast = parse(code);
    interpreter(ast);
    runEventLoop(executeFunction);
    

console.log("AST:", ast);

    return trace;
}