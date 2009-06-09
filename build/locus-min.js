/*
 * Locus v0.5 - A Geolocation Javascript Library
 *
 * Copyright (c) 2009 Larry Myers (larry@larrymyers.com)
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){var a,f;if((typeof LokiAPI!="undefined")&&LokiAPI.isInstalled()){a=LokiAPI()}if(typeof window.google!="undefined"){f=google.gears.factory.create("beta.geolocation")}function e(){return(typeof navigator.geolocation!="undefined")}function g(i,j,k){var l=function(m){locus.lastPosition=m;i(m)};navigator.geolocation.getCurrentPosition(l,j,k)}function d(){return(a)?true:false}function c(i,j,l){var m=function(n){locus.lastPosition=n;i(n)};var k=function(o,n){j(n)};a.onSuccess=m;a.onFailure=k;a.setKey(l.LOKI_KEY);a.requestLocation(true,a.NO_STREET_ADDRESS_LOOKUP)}function b(){return(f)?true:false}function h(i,j,l){var m=function(n){locus.lastPosition=n;i(n)};var k=function(n){j(n.message)};f.getCurrentPosition(m,k)}window.locus={lastPosition:null,check:function(j){var i=false;if(!j||(typeof j!="string")){return i}switch(j.toLowerCase()){case"w3c":i=e();break;case"gears":i=b();break;case"loki":i=d();break}return i},getCurrentPosition:function(n,j,k){if(typeof k=="undefined"){k={}}var m,l=0;if(k.serviceList){m=k.serviceList}else{m=["loki","w3c","gears"]}for(;l<m.length;l++){if(m[l]=="loki"&&k.LOKI_KEY&&d()){c(n,j,k);return}else{if(m[l]=="w3c"&&e()){g(n,j,k);return}else{if(m[l]=="gears"&&b()){h(n,j,k);return}}}}j("No location services were found.")}}})();