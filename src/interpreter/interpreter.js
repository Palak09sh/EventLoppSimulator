import { createScope , define, lookup } from "./scope"

export function interpreter(ast){
 const globalScope = createScope(null)

 evalStatement(ast, globalScope);

}

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
            // case "FunctionDeclaration":{
            //        const name = node.id.name;
            //        functionObject = {
            //         params,
            //         body,
            //         scope
            //        }
            //  define(scope,name,functionObject)
            // }
            

                

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
           break
        }
        case "CallExpression":{
             if(node.callee.object.name === "console" && node.callee.property.name === "log"){
                evalCall(node,scope)
             }

             
            break;

          
            
        }          
            
    }

 }
 function evalCall(node, scope){
    switch(node.type){
        case "cosnole.log":
       {
              const value = []
              
              for(let i = 0; i<node.arguments.length;i++){
                value.push(evalExpression(node.arguments[i],scope))
              }
               return  console.log(...value)
            }
    }

 }

