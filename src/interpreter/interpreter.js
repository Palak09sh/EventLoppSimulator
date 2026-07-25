export function createScope(parent){
    return {
        vars:{},
     parent
    }
    
}
export function define(scope, name, value) {
scope.vars[name] = value;
}
export function lookup(scope, name){
    if(name in scope.vars){
      return scope.vars[name];
    }
    else if(scope.parent === null){
       throw new console.error(`${name} is not defined`);
       
    }
    else{
        lookup(scope.parent, name)
    }
}
