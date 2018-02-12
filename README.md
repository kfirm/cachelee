# Cachlee
A fast caching mechanism for NodeJS applications

# Install
 
 ```$xslt
 npm install --save cachelee
```

 
 # Usage
 
 You can set some options for caching by giving it a setting object with the following possible properties:
 
 | Property      | Value         | Default  |
 | ------------- |:-------------:| --------:|
 | limit         | numeric       |   1000   |
 | strategy      | LRU/LFU       |    LFU   |
 
 
 
 # API
 
 **cacheManager.cache(key, value)** - add to cache with key and value. Note that the key could be anything (string, object etc.)    
 **cacheManager.get(key)** - get cached object by key. returns null of none existing    
 **cacheManager.size()** - get current size of the cache  
 **cacheManager.maxSize()** - get the max size set for the cache  
 **cacheManager.setStrategy(strategy)** - change the caching strategy. In this you have two possibilities: **LeastRecentlyUsed** (default) or **LeastFrequentlyUsed**. (see example below)
 
 ```$xslt
var cachelee = require('cachelee');

var cacheManager = new cachelee.Cache( {   limit: 500, 
                                            strategy: cachelee.Strategy.LeastRecentlyUsed
                                        });

// add to cache by cacheManager.cache(KET, VALUE);
cacheManager.cache('A',{value: 'A'});
cacheManager.cache('B',{value: 'B'});
cacheManager.cache('C',{value: 'C'});

// extract from cache by cacheManager.get(KEY);

var aObj = cacheManager.get('A')

```

You can also change strategy by:

```$xslt
cacheManager.setStrategy(cachelee.Strategy.LeastFrequentlyUsed);
```