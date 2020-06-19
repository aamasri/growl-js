/*
 * global loader (attaches Growl to the global window object)
 */

const debug = false;

// lazy load growl and it's dependencies (on first invocation only)
import(/* webpackChunkName: "growl" */ './growl').then(function (growlModule) {
    window.growl = growlModule.default;
    if (debug) console.debug('growl loaded', typeof window.growl);
});