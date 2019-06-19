const RestUtils = require('./restUtils');
const ElasticUtils = require('./elasticUtils');
const Utils = require('./utils');

class Indexer {
    constructor() {
    }

    /**
     * Fetches multiple documents from the relevant provider, indexes all of them into Elastic
     */
    async index(index) {
        let documents = await this.getDocuments(10);
        for (const document of documents) {
            ElasticUtils.indexDocument(index, Utils.guid(), document);
        }

        await Utils.sleep(500);

        let count = await ElasticUtils.count(index);
        if (count !== documents.length) {
            throw new Error(`WTF? I expected to find [${documents.length}] documents, but found [${count}]`);
        }
    }

    /**
     * Fetches multiple jokes from the jokes provider.
     * @param count The number of jokes to fetch.
     * @returns {Promise<Array>}
     */
    async getDocuments(count) {
        let documents = [];
        for (let i = 0; i < count; i++) {
            let response = await RestUtils.get('https://geek-jokes.sameerkumar.website/api');
            let document = { text: response };
            documents.push(document);
        }

        return documents;
    }
}

module.exports = new Indexer();