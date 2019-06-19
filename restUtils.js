const request = require('request-promise');

class ElasticUtils {

    /**
     * HTTP Get request
     */
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


    /**
     * HTTP Head request
     */
    head(url, data, params) {
        let options = {
            method: 'HEAD',
            uri: url,
            qs: params
        };

        return this.requestWrapper(async () => {
            return await request.head(options);
        }, options);
    }

    /**
     * HTTP Post request
     */
    post(url, data, params) {
        let options = {
            method: 'POST',
            uri: url,
            qs: params,
            body: data,
            json: true
        };

        return this.requestWrapper(async () => {
            return await request.post(options);
        }, options);
    }


    /**
     * HTTP Put request
     */
    put(url, data, params) {
        let options = {
            method: 'PUT',
            uri: url,
            qs: params,
            body: data,
            json: true
        };

        return this.requestWrapper(async () => {
            return await request.put(options);
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