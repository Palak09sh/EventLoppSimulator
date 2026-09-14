import { createScope, define, lookup, assign } from "./scope";
import { logEvent, popFrame, pushFrame } from "./traceEvent";
import { createMacroTask, macroTaskqueue } from "./macrotask";
import { promiseObject } from "./promise";
import { enqueueMicrotask, microTaskqueue } from "./microtask";
/**
 * Entry point for the interpreter. Walks the AST and evaluates it in a
 * fresh global scope
 * @param {object} ast - The program node by the parser.
 */


 //Execution events (calls, logs) collected for the visualiser to replay
  export const trace = [];
export function interpreter(ast) {
  const globalScope = createScope(null);
 
  evalStatement(ast, globalScope);
}
  //Executes statements - things that don't produce a usable value
  // (declarations, control flow, blocks).
  function evalStatement(node, scope) {
    switch (node.type) {
      case "Program":
        for (let i = 0; i < node.body.length; i++) {
          evalStatement(node.body[i], scope);
        }
        break;

      case "VariableDeclaration":
        for (let i = 0; i < node.declarations.length; i++) {
          const declaration = node.declarations[i];

          const value = evalExpression(declaration.init, scope);

          define(scope, declaration.id.name, value);
        }
        break;
      case "BlockStatement":
        for (let i = 0; i < node.body.length; i++) {
          const statement = node.body[i];
          const result = evalStatement(statement, scope);
          if (statement.type === "ReturnStatement") {
            return result;
          }
        }
        return undefined;


      case "FunctionDeclaration": {
        //store a representation of function in the current scope instead of executing immediately
        const functionObject = {
          isFunction: true,
          node,
          closure: scope
        };

        define(scope, node.id.name, functionObject);
        break;
      }
      case "ExpressionStatement":
        return evalExpression(node.expression, scope);

      case "ReturnStatement":
        return node.argument ? evalExpression(node.argument, scope) : undefined;
      default:
        throw new Error(`Unsupported Statement ${node.type}`);
    }
  }
  // Evaluates expressions - things that produce a value.
  function evalExpression(node, scope) {
    switch (node.type) {

      case "Literal":
        return node.value;

      case "Identifier":
          console.log("IDENTIFIER NODE:", node);
  console.log("IDENTIFIER NAME:", node.name);
        return lookup(scope, node.name);

      case "BinaryExpression": {

        const left = evalExpression(node.left, scope);
        const right = evalExpression(node.right, scope);

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
      case "AssignmentExpression": {
        const value = evalExpression(node.right, scope);
        assign(scope, node.left.name, value);
        return value;
      }

      case "CallExpression":
        return evalCall(node, scope);
      //handles the function written as expressions:
      // const add = (a,b) => a+b;
      // the function is not executed here instead a function object is created to remember its scope.
      case "ArrowFunctionExpression":
      case "FunctionExpression":
        return { isFunction: true, node, closure: scope };
      default:
        throw new Error(`Unsupported Expression: ${node.type}`);
    }
  }
  function evalCall(node, scope) {
    const values = [];

    for (let i = 0; i < node.arguments.length; i++) {
      values.push(evalExpression(node.arguments[i], scope));
    }
    //console.log special-cased -it's a host function. Therefore it is handled separately
    if (
      node.callee.type === "MemberExpression" &&
      node.callee.object.name === "console" &&
      node.callee.property.name === "log"
    ) {

      console.log("VALUES:", values);
  console.log("EVENT:", logEvent(values.join(", ")));
      trace.push(logEvent(values.join(", ")));
      return undefined;
      
    }
      
    //setTimeout is also a host function - schedule the callback as 
    // macrotask instead of calling it immediately
    if (node.callee.name === "setTimeout") {
      const callback = evalExpression(node.arguments[0], scope);
      const delay = evalExpression(node.arguments[1], scope);
      const task = createMacroTask(callback, delay);
      macroTaskqueue.enqueue(task);
      return undefined
    }

   if(node.callee.type === "MemberExpression" && node.callee.object.name === "Promise" && node.callee.property.name === "resolve"){
    
        const value = node.arguments.length > 0
      ? evalExpression(node.arguments[0], scope)
      : undefined;
        const result = promiseObject(value);
        return result;
      
    }
    if(node.callee.type === "MemberExpression" && node.callee.property.name === "then"){
      const promise = evalExpression(node.callee.object, scope);
      const callback = evalExpression(node.arguments[0], scope);
      const task = () => executeFunction(callback, [promise.value]);
      return enqueueMicrotask(task);
    }
    const fn = lookup(scope, node.callee.name);
    return executeFunction(fn, values)
    
    
  }
  

export function executeFunction(fn, values){
    

    const functionCall = `${fn.node.id?.name ?? "callback"}(${values.join(", ")})`;

    trace.push(pushFrame(functionCall));
    // The call's scope chains to the function's closure (where it // was defined), NOt to the caller's scope - this is what makes lexical 
    // scoping works instead of dynamic scoping
    const callScope = createScope(fn.closure);

    for (let i = 0; i < fn.node.params.length; i++) {
      define(callScope, fn.node.params[i].name, values[i]);
    }

    let result;

if (fn.node.body.type === "BlockStatement") {
  result = evalStatement(fn.node.body, callScope);
} else {
  result = evalExpression(fn.node.body, callScope);
}

    trace.push(popFrame(functionCall));
    return result;

  }

//function to reset trace 
export function resetTrace() {
  trace.length = 0;
}
