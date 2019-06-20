const RestUtils = require('./restUtils');

class JokesProvider {

    /**
     * Fetches multiple jokes from the jokes provider.
     * @param count The number of jokes to fetch.
     * @returns {Promise<Array>}
     */
    async getDocuments(count) {
        let promises = [];
        for (let i = 0; i < count; i++) {
            let promise = RestUtils.get('https://geek-jokes.sameerkumar.website/api')
                .then(response => {
                    return {text: response};
                });

            promises.push(promise);
        }

        return await Promise.all(promises);
    }
}

module.exports = new JokesProvider();