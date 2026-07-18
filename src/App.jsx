import *  as acorn from "acorn";
let node = acorn.parse('var n = 42')
console.log(node);