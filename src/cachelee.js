var LinkedList = require('linkedlee');

function overrideSettings(settings, options) {

    if (options && typeof options === 'object') {
        for (property in options) {

            if (options.hasOwnProperty(property) && settings[property]) {
                settings[property] = options[property];
            }
        }
    }
}

function Cachelee(options) {

    var settings = {
        limit: 1000,
        strategy: LeastFrequentlyUsed
    };

    overrideSettings(settings, options);

    var indexMap = new Map();
    var cachedItems = new LinkedList(settings.limit);

    this.setStrategy = function (strategy) {
        settings.strategy = strategy;
    };

    /***
     *
     * @param key - Key reference
     * @param item - The item to store in cache
     */
    this.cache = function (key, item) {
        settings.strategy.push(cachedItems, item, indexMap, key);
    };

    /***
     *
     * @param key - Key to retrieve the stored item by
     * @returns {null} - if no such key found
     */
    this.get = function (key) {

        if (indexMap.has(key)) {

            return settings.strategy.pull(indexMap, key, cachedItems);

        } else {
            return null;
        }

    };

    this.size = function () {
        return cachedItems.length;
    };

    this.maxSize = function () {
        return settings.limit;
    };

}


function LeastFrequentlyUsed() {

}

LeastFrequentlyUsed.prototype.push = function (cachedItems, item, indexMap, key) {

    var itemIndex = indexMap.get(key);

    // if item already cached and is first
    if (itemIndex === 0) {

        return item;

    // if item already cached but is not first
    } else if (itemIndex > 0) {

        cachedItems.pushAt(itemIndex, item);
        cachedItems.up(itemIndex);
        indexMap.set(key, itemIndex - 1);

    } else {

        if (!cachedItems.push(item)) {
            cachedItems.remove(cachedItems.size() - 1);
            cachedItems.push(item);
        }

        indexMap.set(key, cachedItems.size() - 1);
    }

    return item;
};

LeastFrequentlyUsed.prototype.pull = function (indexMap, key, cachedItems) {

    var itemIndex = indexMap.get(key);

    if (itemIndex !== null && itemIndex !== undefined && itemIndex !== 0) {

        var item = cachedItems.get(itemIndex).value();

        cachedItems.up(itemIndex);
        indexMap.set(key, itemIndex - 1);

        return item;

    } else if (itemIndex === 0) {

        return cachedItems.get(itemIndex).value();

    } else {
        return null;
    }
};

function LeastRecentlyUsed() {
}

LeastRecentlyUsed.prototype.push = function (cachedItems, item, indexMap, key) {

    // if already has an item with that key - remove it from current location an store on top
    if (indexMap.has(key)) {

        var itemIndex = indexMap.get(key);

        cachedItems.remove(itemIndex);
        cachedItems.pushTop(item);

    } else {

        // if push failed due to max size reached - remove the last element and push on top again
        if (!cachedItems.pushTop(item)) {
            cachedItems.remove(cachedItems.size() - 1);
            cachedItems.pushTop(item)
        }
    }

    indexMap.set(key, 0);

    return item;
};

LeastRecentlyUsed.prototype.pull = function (indexMap, key, cachedItems) {

    var item = null;

    if (indexMap.has(key)) {
        var itemIndex = indexMap.get(key);
        item = cachedItems.get(itemIndex).value();

        cachedItems.remove(itemIndex);
        cachedItems.pushTop(item);

        indexMap.set(key, 0);
    }

    return item;
};

module.exports = {
    Cache: Cachelee,
    Strategy: {
        LeastRecentlyUsed: new LeastRecentlyUsed(),
        LeastFrequentlyUsed: new LeastFrequentlyUsed()
    }
};