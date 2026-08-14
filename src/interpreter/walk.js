/**
 * Recursively walks any AST and logs every node t
 * that has a `type` property. This is inspection utility, not a part of the interpreter's execution path.
 * @param {*} node - Current node (object, array or primitive) being visited
 */
function walk(node) {
    //Primitives and null have no childern - stop recursing.
    if (node === null || typeof node !== "object") return;

    //AST nodes are identified by a `type` field (e.g. "Literal", "CallExpression")
    if (node.type) {
        console.log(node)
    }
    if (Array.isArray(node)) {
        // Arrays hold siblings nodes (e.g. a Program's body) - walk each one.
        for (let i = 0; i < node.length; i++) {
            walk(node[i]);
        }
    }

    else if (typeof (node) == "object") {
        // Any other object: walk every property value, since child nodes can 
        // live under different keys (body, left, right, etc.) and we don't know the AST's shape ahead of time.
        const values = Object.entries(node);
        values.forEach((value) => walk(value));
    }
}
export default walk;


