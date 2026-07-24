/* wrapper function to parse js snippets */
import * as acorn from "acorn"
function parse(code) {
    return (
acorn.parse(code, {ecmaVersion:2022, sourceType: "script"})
    )
}
export default parse;


