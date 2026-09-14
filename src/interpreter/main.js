import { executeFunction } from "./interpreter"
import { macroTaskqueue , dequeueMacro } from "./macrotask"
import { microTaskqueue , drainMicrotasks} from "./microtask"
import { runEventLoop } from "./runEventLoop"
runEventLoop(executeFunction);