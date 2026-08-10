import { createScope, define, lookup } from "./scope";
import { logEvent, popFrame, pushFrame } from "./traceEvent";


//Entry point of the interpreter to evaluate the AST
export function interpreter(ast) {
  //creates the global scope 
  const globalScope = createScope(null);
  //stores all the execution events that will later be used by the visulaiser to show what happened during execution
  const trace = []
  evalStatement(ast, globalScope);


  function evalStatement(node, scope) {
    switch (node.type) {
      //a program is the root node of ast which contains all top-level statements and execute each statement one by one in the same scope.
      case "Program":
        for (let i = 0; i < node.body.length; i++) {
          evalStatement(node.body[i], scope);
        }
        break;
      //handles variable declarations
      case "VariableDeclaration":
        for (let i = 0; i < node.declarations.length; i++) {
          const declaration = node.declarations[i];
          //evaluate the value assigned to the variable.
          const value = evalExpression(declaration.init, scope);
          //store the variable and its value in the current scope
          define(scope, declaration.id.name, value);
        }
        break;
      //handles function declarations
      case "FunctionDeclaration": {
        //store a representation of function in the current scope instead of executing immediately
        const functionObject = {
          isFunction: true,
          node,
          closure: scope,
        };
        //stores the function using its name
        define(scope, node.id.name, functionObject);
        break;
      }
      //handles return statements inside functions, evaluate the returned expressions and pass its value back
      case "ReturnStatement":
        return node.argument ? evalExpression(node.argument, scope) : undefined;
      default:
        throw new Error(`Unsupported Statement ${node.type}`);
    }
  }

  function evalExpression(node, scope) {
    switch (node.type) {
      //handles primitve values
      case "Literal":
        return node.value;
      //handles variable refrences
      case "Identifier":
        return lookup(scope, node.name);
      //handles expressions
      case "BinaryExpression": {
        //evaluate both sides of expression
        const left = evalExpression(node.left, scope);
        const right = evalExpression(node.right, scope);
        //Apply the operator to the evaluated values
        switch (node.operator) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            return left / right;
          default:
            throw new Error(`Unsupported operator ${node.operator}`);
        }
      }
      //handles function calls
      case "CallExpression":
        return evalCall(node, scope);
      //handles the function written as expressions:
      // const add = (a,b) => a+b;
      // the function is not executed here instead a function object is created to remember its scope.
      case "ArrowFunctionExpression":
      case "FunctionExpression":
        return { isFunction: true, node, closure: scope }; //creating the representation of Javascript function
      default:
        throw new Error(`Unsupported Expression: ${node.type}`);
    }
  }

  function evalCall(node, scope) {
    const values = [];
    //evaluate every argument before calling the function 
    for (let i = 0; i < node.arguments.length; i++) {
      values.push(evalExpression(node.arguments[i], scope));
    }
    //console.log special-cased -it's a host function. Therefore it is handled separately
    if (
      node.callee.type === "MemberExpression" &&
      node.callee.object.name === "console" &&
      node.callee.property.name === "log"
    ) {
      //create a log event for the visualiser
      trace.push(logEvent(values.join(", ")))
      return undefined;
    }
    //find the user-defined function in the current scope
    const fn = lookup(scope, node.callee.name)
    //create a variable name for the function call. 
    //Example: add(10,20)
    const functionCall = `${node.callee.name}(${values.join(", ")})`;
    //Record that new function call has created
    trace.push(pushFrame(functionCall))
    //create the fucntion scope for the particular function call
    //function's closure becomes the parent scope
    const callScope = createScope(fn.closure)
    //bind each arguments to its corresponding parameter
    for (let i = 0; i < fn.node.params.length; i++) {
      define(callScope, fn.node.params[i].name, values[i]);
    }
    //execute the function body using the new function scoope
    const result = evalStatement(fn.node.body, callScope)
    //Record that fucntion call has finished
    trace.push(popFrame(functionCall))
    return result;

  }
}
