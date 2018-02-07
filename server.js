var cachelee = require('./src/index');


cache = new cachelee.Cache({ limit: 500, strategy: cachelee.Strategy.MostFrequentlyUsed});

// cash.setStrategy(cash.Strategy.MostRecentlyUsed);

cache.cache('a',{value: 'a'});
cache.cache('b',{value: 'b'});
cache.cache('c',{value: 'c'});
cache.cache('d',{value: 'd'});


console.log(cache.get('d'));
console.log(cache.get('p'));




