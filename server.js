var cachelee = require('./src/cachelee');

cacheManager = new cachelee.Cache({ limit: 500, strategy: cachelee.Strategy.LeastFrequentlyUsed});

cacheManager.cache('a',{value: 'a'});
cacheManager.cache('b',{value: 'b'});
cacheManager.cache('c',{value: 'c'});
cacheManager.cache('d',{value: 'd'});
cacheManager.cache('a',{value: 'a'});


console.log(cacheManager.get('d'));
console.log(cacheManager.get('p'));
//
//
//
//
