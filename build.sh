#!/bin/bash

cat ext/gears_init.js > build/locus-all.js
cat ext/loki.js >> build/locus-all.js
cat src/locus.js >> build/locus-all.js

java -jar lib/yuicompressor-2.4.2.jar build/locus-all.js > build/locus-all-min.js
java -jar lib/yuicompressor-2.4.2.jar src/locus.js > build/locus-min.js

rm build/locus-all.js
