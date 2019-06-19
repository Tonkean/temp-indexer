const console = require('console');
const request = require('request-promise');

class Indexer {
    constructor() {
    }

    /**
     * Fetches multiple documents from the relevant provider, indexes all of them into Elastic
     */
    async index() {
        let documents = await this.getDocuments(10);
    }

    async getDocuments(count) {
        let documents = [];
        for (let i = 0; i < count; i++) {
            let options = {
                method: 'GET',
                uri: 'https://geek-jokes.sameerkumar.website/api'
            };

            let response = await request(options);
            let document = { text: response };
            documents.push(document);
        }

        return documents;
    }
}

module.exports = new Indexer();