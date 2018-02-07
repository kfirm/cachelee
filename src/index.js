
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

        if ( !indexMap.has(key) && cachedItems.length < settings.limit ){

            cachedItems.push(item);
            indexMap.set(key,cachedItems.length - 1);
            return true;

        } else {

            settings.strategy(indexMap, key, null, cachedItems, item, settings.limit);

            return true;
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
        return settings.limit;
    };

}



function MostFrequentlyUsed(indexMap, key, itemIndex, cachedItems, _item, _limit) {

    if (!_item) {
        var item = cachedItems[itemIndex];

        cachedItems.splice(itemIndex - 1, 0, item);
        cachedItems.splice(itemIndex + 1, 1);

        indexMap.set(key, itemIndex - 1);

        return item;

    } else {

        if (cachedItems.length >= _limit) {
            cachedItems.splice(cachedItems.length -1 , 1);

        }

        cachedItems.push(_item);
        indexMap.set(key,cachedItems.length - 1);

        return _item;
    }
}

function MostRecentlyUsed(indexMap, key, itemIndex, cachedItems, _item, _limit) {

    if (!_item) {
        var item = cachedItems[itemIndex];

        cachedItems.splice(itemIndex, 1);
        cachedItems.splice(0, 0, item);

        indexMap.set(key, 0);

        return item;

    } else {

        if (cachedItems.length >= _limit) {
            cachedItems.splice(0 , 1);
        }

        cachedItems.splice(0, 0, _item);
        indexMap.set(key, 0);

        return _item;
    }

}

module.exports = {
    Cache: Cachelee,
    Strategy: {
        MostRecentlyUsed: MostRecentlyUsed,
        MostFrequentlyUsed: MostFrequentlyUsed
    }
};