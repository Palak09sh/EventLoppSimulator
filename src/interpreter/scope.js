/**
 * creates a new lexical scope
 * @param {object|null} parent -The enclosing scope, or null for the global scope
 * @returns {{vars: object, parent: object|null}} A new scope object.
 */
export function createScope(parent) {
  return {
    vars: {},
    parent,
  };
}

/**
 * Defines a variable in the given scope. Does not check parent scopes -
 * always creates in this scope , even if the variable with the 
 * same name exists further up the chain (this what makes shaddowing work)
 * @param {object} scope 
 * @param {string} name 
 * @param {*} value 
 */
export function define(scope, name, value) {
  scope.vars[name] = value;
}

/**
 * Resolves a variable's value by searching this scope,
 *  then walking up the parent chain until it's found.
 * @param {object} scope 
 * @param {string} name 
 * @returns {*} The variable's value.
 * @throws {Error} If variable is not defined in this scope or any parent scope.
 */
export function lookup(scope, name) {
  if (name in scope.vars) {
    return scope.vars[name];
  } else if (scope.parent === null) {
    throw new Error(`${name} is not defined`);
  } else {
    return lookup(scope.parent, name);
  }
}

/**
 * Reassigns existing variable by walking up the scope chain to find 
 * where it's defined, then updating it in place. Unlike define(), 
 * it doesn't create a new binding - it throws if the variable issn't found anywhere in the chain
 * @param {object} scope 
 * @param {string} name 
 * @param {*} value 
 * @returns {*}
 * @throws {Error} - If the variable is not defined in this scope or any parent scope
 */
export function assign(scope, name, value) {
  if (name in scope.vars) {
    scope.vars[name] = value;
    return;
  }
  if (scope.parent == null) {
    throw new Error(`${name} is not defined`);
  }
  assign(scope.parent, name, value);
}
