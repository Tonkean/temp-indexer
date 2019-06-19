class Utils {
    constructor() {
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}

module.exports = new Utils();