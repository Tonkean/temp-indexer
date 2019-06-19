const restUtils = require('./restUtils');

/**
 * This class wraps all the communication with ElasticSearch.
 */
class ElasticUtils {

    /**
     * Creates a new index in elastic search.
     * @returns {Promise<void>}
     */
    async createIndex(index, body) {
        await restUtils.put(this.buildUrl(`/${index}`), body);
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

    /**
     * Delete an index from elastic
     * @returns {Promise<void>}
     */
    async deleteIndex(index) {
        await restUtils.delete(this.buildUrl(`/${index}`));
    }

    /**
     * Index a new document into elastic
     * @returns {Promise<void>}
     */
    async indexDocument(index, id, document) {
        await restUtils.post(this.buildUrl(`/${index}/_doc/${id}`), document);
    }


    /**
     * Returns the number of documents that are indexed in elastic.
     * @returns {Promise<*>}
     */
    async count(index) {
        let response = await restUtils.post(this.buildUrl(`/${index}/_count`));

        return response.count;
    }

    buildUrl(path) {
        return 'http://localhost:9200' + path;
    }
}

module.exports = new ElasticUtils();