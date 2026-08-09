//creates a new lexical scope with an optional parent scope.
export function createScope(parent){
    return {
        vars:{},
     parent
    }
    
}

//defines the variable in current scope.
export function define(scope, name, value) {
scope.vars[name] = value;
}

//Looks up a variable by searching the current scope and recursively traversing the parent scopes.
export function lookup(scope, name){
    if(name in scope.vars){
      return scope.vars[name];
    }
    else if(scope.parent === null){
       throw new Error(`${name} is not defined`)
    }
    else{
        return lookup(scope.parent, name)
    }
}