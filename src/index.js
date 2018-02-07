
function overrideSettings(settings, options) {

    if (options && typeof options === 'object'){
        for (property in options){

            if (options.hasOwnProperty(property) && settings[property]){
                settings[property] = options[property];
            }
        }
    }
}

function Cachelee(options) {

    var settings = {
        limit: 200,
        strategy: MostFrequentlyUsed
    };

    overrideSettings(settings,options);

    var indexMap = new Map();
    var cachedItems = [];

    this.setStrategy = function (strategy) {
        settings.strategy = strategy;
    };

    this.cache = function (key,item) {

        if (!indexMap.has(key) && cachedItems.length < settings.limit){

            cachedItems.push(item);
            indexMap.set(key,cachedItems.length - 1);
            return true;

        } else {

            return false;
        }
    };

    this.get = function (key) {

      if (indexMap.has(key)){

          var itemIndex = indexMap.get(key);
          return itemIndex ? settings.strategy(indexMap, key, itemIndex, cachedItems) : cachedItems[itemIndex];

      } else {
          return null;
      }

    };

    this.size = function () {
        return cachedItems.length;
    };

    this.maxSize = function () {
        return cacheItemsLimit;
    };

    // this.Strategy = {
    //     MostRecentlyUsed: this.MostRecentlyUsed,
    //     MostFrequentlyUsed: this.MostFrequentlyUsed
    // }
}


function MostRecentlyUsed (indexMap, key, itemIndex, cachedItems) {

    var item = cachedItems[itemIndex];

    cachedItems.splice(itemIndex, 1);
    cachedItems.splice(0, 0, item);

    indexMap.set(key,0);

    return item;

}

function MostFrequentlyUsed(indexMap, key, itemIndex, cachedItems) {

    var item = cachedItems[itemIndex];

    cachedItems.splice(itemIndex - 1, 0, item);
    cachedItems.splice(itemIndex + 1, 1);

    indexMap.set(key,itemIndex - 1);

    return item;
}

module.exports = {
    Cache: Cachelee,
    Strategy: {
        MostRecentlyUsed: MostRecentlyUsed,
        MostFrequentlyUsed: MostFrequentlyUsed
    }
};