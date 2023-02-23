/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

import * as timerModules from './Timer'
import * as viewModules from './View'
const modules = {...timerModules, ...viewModules}

console.log(modules)

export { modules }
