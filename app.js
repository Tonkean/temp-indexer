const Indexer = require('./indexer');
const ElasticUtils = require('./elasticUtils');

ElasticUtils.checkIndexExist()
    .then(exist => {
        if (!exist) {
            return ElasticUtils.createIndex();
        }
    })
    .then(value => {
        return Indexer.index();
    });

