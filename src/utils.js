function contains (root, target) {
    // root 节点是否包含 target 节点
    const isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');
    if (!isElement) {
        return false;
    }
    let node = target;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function assert (condition, msg = '') {
    if (!condition) {
        throw new Error(`[vue-area-linkage]: ${msg}`);
    }
}

function isArray (param) {
    return Object.prototype.toString.call(param) === '[object Array]';
}

function scrollIntoView (container, target) {
    if (!target) {
        container.scrollTop = 0;
        return;
    }

    // refrence: https://github.com/ElemeFE/element/blob/dev/src/utils/scroll-into-view.js
    const top = target.offsetTop;
    const bottom = target.offsetTop + target.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

export {
    contains,
    assert,
    isArray,
    scrollIntoView
};
