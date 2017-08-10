/**
 * Created by pomy on 31/07/2017.
 */

import {observable, action} from 'mobx';

import awaitTo from 'async-await-error-handling';

import api from '@src/network/api';

class Time {
    @observable
    curTime = 0;

    constructor(time){
        this.curTime = time;
    }

    @action
    async changeTime(){
        const [err, data] = await awaitTo(api.getIndex());
        if(!data){
            return Promise.reject(err);
        }
        // another way to use async/await: https://github.com/mobxjs/mobx/issues/299
        // docs: https://mobx.js.org/refguide/action.html
        this.timeChange();
    }

    @action
    timeChange(){
        this.curTime = Date.now();
    }
}

let time = new Time(Date.now());

export default time;
