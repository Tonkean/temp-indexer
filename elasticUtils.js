const restUtils = require('./restUtils');

class ElasticUtils {

    async createIndex() {
        let body = {
            settings: {},
            mappings: {
                dynamic: 'strict',
                properties: {
                    text: {
                        type: 'text'
                    }
                }
            }
        };

        await restUtils.put(this.buildUrl('/temp-index'), body)
    }

    async checkIndexExist() {
        try {
            await restUtils.head(this.buildUrl('/temp-index'));

            return true;
        } catch (e) {
            return false;
        }
    }

    count() {
    }

    index() {
    }

    buildUrl(path) {
        return 'http://localhost:9200' + path;
    }
}

module.exports = new ElasticUtils();