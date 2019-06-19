const Indexer = require('./indexer');
const ElasticUtils = require('./elasticUtils');

let tempIndexSettings = {
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

let indexName = 'temp-index';
ElasticUtils.checkIndexExist(indexName)
    .then(exist => {
        if (exist) {
            return ElasticUtils.deleteIndex(indexName);
        }
    })
    .then(value => {
        return ElasticUtils.createIndex(indexName, tempIndexSettings);
    })
    .then(value => {
        return Indexer.index(indexName);
    });

