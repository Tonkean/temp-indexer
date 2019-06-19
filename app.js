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

ElasticUtils.checkIndexExist('temp-index')
    .then(exist => {
        if (!exist) {
            return ElasticUtils.createIndex('temp-index', tempIndexSettings);
        }
    })
    .then(value => {
        return Indexer.index();
    });

