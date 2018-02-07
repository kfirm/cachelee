var cachelee = require('./src/index');


cacheManager = new cachelee.Cache({ limit: 500, strategy: cachelee.Strategy.MostFrequentlyUsed});

cacheManager.setStrategy(cachelee.Strategy.MostRecentlyUsed);

cacheManager.cache('a',{value: 'a'});
cacheManager.cache('b',{value: 'b'});
cacheManager.cache('c',{value: 'c'});
cacheManager.cache('d',{value: 'd'});


console.log(cacheManager.get('d'));
console.log(cacheManager.get('p'));




