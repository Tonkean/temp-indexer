const restUtils = require('./restUtils');

class ElasticUtils {

    /**
     * Creates a new index in elastic search.
     * @returns {Promise<void>}
     */
    async createIndex(index, body) {
        await restUtils.put(this.buildUrl(`/${index}`), body)
    }

    /**
     * Checks whether the provided index exists or not
     * @returns {Promise<boolean>}
     */
    async checkIndexExist(index) {
        try {
            await restUtils.head(this.buildUrl(`/${index}`));

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