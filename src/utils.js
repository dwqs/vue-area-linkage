export const assert = function assert (condition, msg = '') {
    if (!condition) {
        throw new Error(`[vue-area-linkage]: ${msg}`);
    }
};
