import { createScope } from "./scope"
import { define } from "./scope";
import { lookup } from "./scope";
 function  evalStatement(node, scope){
     switch(node.type){
        case "Program":
            for(let i = 0; i< node.body.length;i++) {
                evalStatement(node.body[i],scope);
               
            }
            break;
            case "VariableDeclaration":
                for(let i = 0; i<node.declarations.length;i++){
                   const declaration = node.declarations[i];
                   const value = evalExpression(declaration.init,scope)
                    define(scope,declaration.id.name, value);
}
                break;
            case "return":
                // evalExpression(node.id, scope);
                

    }
  
 }

 function evalExpression(node, scope){
    switch(node.type){
        case "Literal":
            return node.value
            

        case "Identifier":
            return lookup(scope,node.name)
        case "BinaryExpression": {
            const left = evalExpression(node.left,scope)
            const right = evalExpression(node.right,scope)
           if(node.operator === "+"){
            return left + right;
           }
           if(node.operator === "-"){
            return left - right;
           }
           if(node.operator === "*"){
            return left * right;
           }
           if(node.operator === "/"){
            return left / right;
           }
           if(node.operator === "%"){
            return left % right;
           }
           if(node.operator === "**"){
            return left ** right;
           }
        }

                  
            
    }

 }
export function interpreter(ast){
 const globalScope = createScope(null)

 evalStatement(ast, globalScope);

}

