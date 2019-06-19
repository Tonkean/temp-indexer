const request = require('request-promise');

class ElasticUtils {

    get(url, params) {
        let options = {
            method: 'GET',
            uri: url,
            qs: params,
            json: true
        };

        return this.requestWrapper(async () => {
            return await request(options);
        }, options);
    }

    requestWrapper(requestFunction, options) {
        return requestFunction()
            .catch(e => {
                // If there is an exception here, debug and put a break point here.
                // In the call stack you would see where this came from, without this catch the callstack would lead to
                // the request lib and we would have no way of knowing which request went wrong
                throw new Error(`Error in reaching out to server. Options: [${JSON.stringify(options)}], Inner Error: [${e}]`);
            });
    }
}

module.exports = new ElasticUtils();