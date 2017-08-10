/**
 * Created by pomy on 25/07/2017.
 */

import network from './index';

export default {
    async getIndex(){
        const res = await network.get({
            url: `https://api.github.com/users/dwqs/repos`,
            data: {}
        });
        return res;
    }
}
