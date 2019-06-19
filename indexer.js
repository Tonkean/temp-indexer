const restUtils = require('./restUtils');

class Indexer {
    constructor() {
    }

    /**
     * Fetches multiple documents from the relevant provider, indexes all of them into Elastic
     */
    async index() {
        let documents = await this.getDocuments(10);
    }

    /**
     * Fetches multiple jokes from the jokes provider.
     * @param count The number of jokes to fetch.
     * @returns {Promise<Array>}
     */
    async getDocuments(count) {
        let documents = [];
        for (let i = 0; i < count; i++) {
            let response = await restUtils.get('https://geek-jokes.sameerkumar.website/api');
            let document = { text: response };
            documents.push(document);
        }

        return documents;
    }
}

module.exports = new Indexer();