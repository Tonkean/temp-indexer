const ElasticUtils = require('./elasticUtils');
const Utils = require('./utils');

class Indexer {
    constructor() {
    }

    /**
     * Fetches multiple documents from the relevant provider, indexes all of them into Elastic
     */
    async index(provider, index) {
        let documents = await provider.getDocuments(10);
        for (const document of documents) {
            ElasticUtils.indexDocument(index, Utils.guid(), document);
        }

        let count = await ElasticUtils.count(index);
        if (count !== documents.length) {
            throw new Error(`WTF? I expected to find [${documents.length}] documents, but found [${count}]`);
        }
    }
}

module.exports = new Indexer();