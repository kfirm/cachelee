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
 | limit         | numeric       |   200    |
 | strategy      | MFU/MRU       |   MFU    |
 
 
 ```$xslt
var cachelee = require('cachelee');

var cacheManager = new cachelee.Cache( {   limit: 500, 
                                            strategy: cachelee.Strategy.MostFrequentlyUsed
                                        });

cacheManager.cache('A',{value: 'A'});
cacheManager.cache('B',{value: 'B'});
cacheManager.cache('C',{value: 'C'});

```

You can also change strategy by:

```$xslt
cacheManager.setStrategy(cachelee.Strategy.MostRecentlyUsed);
```