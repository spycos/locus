#!/bin/bash

cat src/locus.js > build/locus.js
cat ext/gears_init.js >> build/locus.js
cat ext/loki.js >> build/locus.js

java -jar lib/yuicompressor-2.4.2.jar build/locus.js > build/locus-min.js
