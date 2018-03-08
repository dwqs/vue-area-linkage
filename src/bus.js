const Bus = {
    _Vue: null,
    createEventBus () {
        return new this._Vue();
    },
    saveVueRef (Vue) {
        this._Vue = Vue;
    }
};

export default Bus;
