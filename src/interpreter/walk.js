//Traversing the AST
function walk(node){
    if(node === null ||typeof node !== "object") return ;

    //Nodes in AST
    if(node.type){
        console.log(node)
    }
    if(Array.isArray(node)){
        for(let i = 0; i<node.length;i++){
            walk(node[i]);
        }
    }

    else if(typeof(node) == "object"){
      const values = Object.entries(node);
      values.forEach(([Key, value]) => walk(value));
    }
}
export default walk;


