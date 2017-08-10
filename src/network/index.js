/**
 * Created by pomy on 25/07/2017.
 */

import axios from 'axios';

console.log('api prefix', window.PREFIX);

const instance = axios.create({
    baseURL: window.PREFIX,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

export default {
    get (obj) {
        return Promise.resolve(
            instance.get(obj.url,{
                params: obj.data ? obj.data : {}
            })
        )
    },

    post (obj) {
        return Promise.resolve(
            instance.post(obj.url,{
                data: obj.data ? obj.data : {}
            })
        )
    },

    delete (obj) {
        return Promise.resolve(
            instance.delete(obj.url,{
                data: obj.data ? obj.data : {}
            })
        )
    },

    put (obj) {
        return Promise.resolve(
            instance.put(obj.url,{
                data: obj.data ? obj.data : {}
            })
        )
    },

    patch(obj){
        return Promise.resolve(
            instance.patch(obj.url,{
                data: obj.data ? obj.data : {}
            })
        )
    }
};
