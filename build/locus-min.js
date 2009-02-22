/*
 * Locus v0.3 - A Geolocation Javascript Library
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
(function(){var d={};var c,b;if(LokiAPI.isInstalled()){c=LokiAPI()}if(typeof window.google!="undefined"){b=google.gears.factory.create("beta.geolocation")}function e(){return(typeof navigator.geolocation!="undefined")}function h(k,l,m){var n=function(o){locus.lastPosition=o;k(o)};navigator.geolocation.getCurrentPosition(n,l,m)}function g(){return(c)?true:false}function f(k,l,n){var o=function(p){locus.lastPosition=p;k(p)};var m=function(q,p){l(p)};c.onSuccess=o;c.onFailure=m;c.setKey(n.LOKI_KEY);c.requestLocation(true,c.NO_STREET_ADDRESS_LOOKUP)}function j(){return(b)?true:false}function a(k,l,n){var o=function(p){locus.lastPosition=p;k(p)};var m=function(p){l(p.message)};b.getCurrentPosition(o,m)}d.lastPosition=null;d.check=function(l){var k=false;if(!l||(typeof l!="string")){return k}switch(l.toLowerCase()){case"loki":k=g();break;case"geode":k=e();break;case"gears":k=j();break}return k};d.getCurrentPosition=function(o,k,l){if(typeof l=="undefined"){l={}}var n;if(l.serviceList){n=l.serviceList}else{n=["loki","geode","gears"]}for(var m=0;m<n.length;m++){if(n[m]=="loki"&&l.LOKI_KEY&&g()){f(o,k,l);return}else{if(n[m]=="geode"&&e()){h(o,k,l);return}else{if(n[m]=="gears"&&j()){a(o,k,l);return}}}}k("No location services were found.")};window.locus=d})();
/* Copyright 2007, Google Inc.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *  3. Neither the name of Google Inc. nor the names of its contributors may be
 *     used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Sets up google.gears.*, which is *the only* supported way to access Gears.
 *
 * Circumvent this file at your own risk!
 *
 * In the future, Gears may automatically define google.gears.* without this
 * file. Gears may use these objects to transparently fix bugs and compatibility
 * issues. Applications that use the code below will continue to work seamlessly
 * when that happens.
 */
(function(){if(window.google&&google.gears){return}var a=null;if(typeof GearsFactory!="undefined"){a=new GearsFactory()}else{try{a=new ActiveXObject("Gears.Factory");if(a.getBuildInfo().indexOf("ie_mobile")!=-1){a.privateSetGlobalObject(this)}}catch(b){if((typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes["application/x-googlegears"]){a=document.createElement("object");a.style.display="none";a.width=0;a.height=0;a.type="application/x-googlegears";document.documentElement.appendChild(a)}}}if(!a){return}if(!window.google){google={}}if(!google.gears){google.gears={factory:a}}})();
/*  Loki Javascript API
 *  Ryan Sarver <rsarver@skyhookwireless.com>
 *
 *  This is a helper script to help you detect and gracefully handle
 *  users with Loki Plugin installed
 *
/*--------------------------------------------------------------------------*/
LokiPlugin.availableVersion="2.7.2.18";LokiPlugin.scriptRevision="2";function LokiAPI(){return Try.these(function(){return new LokiPlugin()},function(){return new LokiNull()})||false}LokiAPI.isInstalled=function(){return LokiPlugin.isInstalled(true)};function LokiPlugin(){if(LokiPlugin.timer){clearTimeout(LokiPlugin.timer)}LokiPlugin.attemptedInstall=false;LokiPlugin.installFailed=false;LokiPlugin.upgradeStarted=false;LokiPlugin.activex=null;if(LokiPlugin.isInstalled(false)){LokiPlugin.initPlugin()}else{this.tryToInstallPlugin()}}LokiPlugin.isInstalled=function(a){switch(BrowserDetect.browser){case"Explorer":return LokiPlugin.isInstalled_IE(a);case"Firefox":try{var b=new Loki();if(b){LokiPlugin.xpcom=b;return true}}catch(c){}case"Opera":case"Safari":return LokiPlugin.isInstalled_NPAPI(a);default:return false}};LokiPlugin.initPlugin=function(){if(LokiPlugin.xpcom!=null){return}switch(BrowserDetect.browser){case"Explorer":LokiPlugin.init_IE();break;case"Firefox":case"Opera":case"Safari":LokiPlugin.init_NPAPI();break}};LokiPlugin.checkDeprecatedVersion=function(a){if(LokiPlugin.upgradeCompletedSuccessfull){return false}if(!LokiPlugin.upgradeCancelled&&(this.checkVersionOnServer(a)>0)){if(LokiPlugin.upgradeStarted){return true}LokiPlugin.upgradeStarted=true;if(confirm("Newer version of Loki Plugin available. Do you wish to install it?")){return true}else{LokiPlugin.upgradeCancelled=true}}return false};LokiPlugin.checkVersionOnServer=function(a){if(a==undefined||a.indexOf("v.")==-1){return true}actualVersion=a.substring(a.indexOf("v.")+2);if(compareVersions(LokiPlugin.availableVersion,actualVersion)>0){return true}return false};LokiPlugin.prototype.browserSupported=function(){if((BrowserDetect.OS!="Windows"&&BrowserDetect.OS!="Mac"&&BrowserDetect.OS!="Linux")||(BrowserDetect.browser!="Explorer"&&BrowserDetect.browser!="Firefox"&&BrowserDetect.browser!="Safari"&&BrowserDetect.browser!="Opera")){return false}return true};LokiPlugin.prototype.requestLocation=function(c,b,a){this.requestLocationBy(false,c,b,a)};LokiPlugin.prototype.requestIPLocation=function(c,b,a){this.requestLocationBy(true,c,b,a)};LokiPlugin.prototype.requestLocationBy=function(e,d,c,a){if(!this.browserSupported()){if(this.onFailure){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_PLUGIN_BROWSER_NOT_SUPPORTED)}return}if(a==undefined){a=0}if(d==undefined){d=false}if(c==undefined){c=this.NO_STREET_ADDRESS_LOOKUP}if(a>=600||this.installFailed){return}if(LokiPlugin.activex==null&&(LokiPlugin.plugin==undefined||LokiPlugin.plugin.asynchronousRequestLocation==undefined)&&LokiPlugin.xpcom==null){if(LokiPlugin.isInstalled(false)){LokiPlugin.initPlugin();a++}else{if(this.attemptedInstall){a++}}var b=this;if(LokiPlugin.timer){clearTimeout(LokiPlugin.timer)}LokiPlugin.timer=setTimeout(function(){b.requestLocationBy(e,d,c,a)},300);return}if(true==LokiPlugin.waitingRet){return}LokiPlugin.waitingRet=true;if(LokiPlugin.xpcom!=null){this.runRequestLocation_XPCOM(e,d,c)}else{if(BrowserDetect.browser=="Explorer"){this.runRequestLocation_IE(e,d,c)}else{this.runRequestLocation_NPAPI(e,d,c)}}};LokiPlugin.prototype.onFailureProxy=function(a){LokiPlugin.waitingRet=false;if(this.onFailure!=undefined){this.onFailure(a,LokiPlugin.returnMessages[a])}else{if(LokiPlugin.lastOnFailure!=undefined){LokiPlugin.lastOnFailure(a,LokiPlugin.returnMessages[a])}}};LokiPlugin.prototype.onSuccessProxy=function(a){LokiPlugin.waitingRet=false;if(this.onSuccess!=undefined){this.onSuccess(a)}else{if(LokiPlugin.lastOnSuccess!=undefined){LokiPlugin.lastOnSuccess(a)}}};LokiPlugin.isInstalled_IE=function(b){if(LokiPlugin.toolbarDetected){return true}var a;if(LokiPlugin.activex!=null){a=LokiPlugin.activex}else{try{a=new ActiveXObject("Loki.LocationFinder.1")}catch(c){return false}if(!a){return false}}if(!b&&this.checkDeprecatedVersion(a.description)){return false}LokiAPI.pluginDescription=a.description;return true};LokiPlugin.init_IE=function(){LokiPlugin.activex=new ActiveXObject("Loki.LocationFinder.1")};LokiPlugin.prototype.runRequestLocation_XPCOM=function(d,b,a){if(d){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_FEATURE_NOT_SUPPORTED);return}LokiPlugin.xpcom.onSuccess=this.onSuccessProxy;LokiPlugin.xpcom.onFailure=this.onFailureProxy;LokiPlugin.lastOnFailure=this.onFailure;LokiPlugin.lastOnSuccess=this.onSuccess;LokiPlugin.xpcom.setKey(this.key);try{LokiPlugin.xpcom.requestLocation(b,a)}catch(c){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_FEATURE_NOT_SUPPORTED)}};LokiPlugin.prototype.runRequestLocation_IE=function(d,b,a){LokiPlugin.activex.onSuccess=this.onSuccessProxy;LokiPlugin.activex.onFailure=this.onFailureProxy;LokiPlugin.lastOnFailure=this.onFailure;LokiPlugin.lastOnSuccess=this.onSuccess;LokiPlugin.activex.setKey(this.key);try{if(d){LokiPlugin.activex.requestIPLocation(b,a)}else{LokiPlugin.activex.requestLocation(b,a)}}catch(c){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_FEATURE_NOT_SUPPORTED)}};LokiPlugin.isInstalled_NPAPI=function(a){var c=-1;navigator.plugins.refresh(false);for(var b=0;b<navigator.plugins.length;++b){if(navigator.plugins[b]==undefined){continue}if(navigator.plugins[b].name=="Loki Plugin"){if(!a&&this.checkDeprecatedVersion(navigator.plugins[b].description)){return false}LokiAPI.pluginDescription=navigator.plugins[b].description;return true}if(navigator.plugins[b].name=="FindMe Plugin"||navigator.plugins[b].name=="Find Me Plugin"){c=b}}if(-1!=c){if(!a&&this.checkDeprecatedVersion(navigator.plugins[c].description)){return false}LokiAPI.pluginDescription=navigator.plugins[b].description;return true}return false};LokiPlugin.init_NPAPI=function(){if(!LokiPlugin.isRunning){var c={id:"__lokiPlugin",width:"1",height:"1",type:"application/x-loki"};var b=document.createElement("object");for(var a in c){b.setAttribute(a,c[a])}document.getElementsByTagName("body").item(0).appendChild(b);LokiPlugin.plugin=b;LokiPlugin.isRunning=true}};LokiPlugin.prototype.runRequestLocation_NPAPI=function(d,c,b){var a=this;setTimeout(function(){a.runRequestLocation_NPAPI_async(d,c,b)},100)};LokiPlugin.prototype.runRequestLocation_NPAPI_async=function(d,c,b){var a=this;if(d){LokiPlugin.plugin.asynchronousRequestIPLocation(this.key,c,b)}else{LokiPlugin.plugin.asynchronousRequestLocation(this.key,c,b)}setTimeout(function(){a.tickNpapiXHR()},100)};LokiPlugin.prototype.tickNpapiXHR=function(){var a=LokiPlugin.plugin.tickRunHttpRequest();if(!a||a.returnCode==undefined){var b=this;setTimeout(function(){b.tickNpapiXHR()},50);return}if(a.returnCode!=LokiPlugin.returnCodes.WPS_OK){this.onFailureProxy(a.returnCode);return}this.onSuccessProxy(a)};LokiPlugin.prototype.setKey=function(a){if(a==undefined||a==null){this.key=""}else{this.key=a}};LokiPlugin.prototype.tryToInstallPlugin=function(){if(this.attemptedInstall){return}this.attemptedInstall=true;if(BrowserDetect.javaAvail){if(LokiAPI_PreloadNullapplet&&!LokiPlugin.isInstalled(true)){if(BrowserDetect.javaWaitingConfirmation&&(BrowserDetect.browser=="Explorer"||(BrowserDetect.browser=="Safari"&&BrowserDetect.OS=="Windows")||(BrowserDetect.browser=="Firefox"&&LokiPlugin.javaPluginDescription.indexOf("1.4.")!=-1))){var a=(new Date()).getTime()-BrowserDetect.javaWaitingConfirmationSince;if(a<LokiPlugin.fallbackToNativeTimeout){LokiPlugin.nullappletShouldRunInstaller=true;setTimeout(fallbackToNativeInstaller,LokiPlugin.fallbackToNativeTimeout-a)}else{fallbackToNativeInstaller()}}else{LokiPlugin.startInstallApplet()}}else{if(BrowserDetect.browser=="Explorer"||(BrowserDetect.browser=="Safari"&&BrowserDetect.OS=="Windows")||(BrowserDetect.browser=="Firefox"&&LokiPlugin.javaPluginDescription.indexOf("1.4.")!=-1)){LokiPlugin.nullappletShouldRunInstaller=true;LokiPlugin.runNullapplet();setTimeout(fallbackToNativeInstaller,LokiPlugin.fallbackToNativeTimeout)}else{LokiPlugin.startInstallApplet()}}}else{LokiPlugin.downloadNativeInstaller()}};LokiPlugin.downloadNativeInstaller=function(){switch(BrowserDetect.OS){case"Windows":if(BrowserDetect.browser=="Explorer"){if(window.XMLHttpRequest){document.location.href=LokiPlugin.globalURLPrefix+"loki_activex.exe"}else{window.open(LokiPlugin.globalURLPrefix+"loki_activex.exe","download")}}else{document.location.href=LokiPlugin.globalURLPrefix+"loki_setup.exe"}break;case"Mac":document.location.href=LokiPlugin.globalURLPrefix+"LokiPlugin.zip";break;case"Linux":document.location.href=LokiPlugin.globalURLPrefix+"LokiPlugin_Installer.sh";break}};function appletInstallationSuccessfull(){LokiPlugin.upgradeCompletedSuccessfull=true}function fallbackToNativeInstaller(){if(BrowserDetect.javaWaitingConfirmation){BrowserDetect.javaAvail=false;LokiPlugin.nullappletShouldRunInstaller=false;LokiPlugin.downloadNativeInstaller()}}function appletInstallationFailed(){LokiPlugin.downloadNativeInstaller()}LokiPlugin.startInstallApplet=function(){var b=document.createElement("div");var c=LokiPlugin.useGlobalURLs?'<PARAM NAME="archive" VALUE="'+LokiPlugin.globalURLPrefix+'LokiApplet.jar"/>':"";document.getElementsByTagName("body").item(0).appendChild(b);var a=LokiPlugin.useGlobalURLs?'<PARAM NAME="globalUrlPrexif" VALUE="'+LokiPlugin.globalURLPrefix+'">':"";if(BrowserDetect.browser=="Explorer"){b.innerHTML='<OBJECT id="LokiApplet" classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" WIDTH="0" HEIGHT="0">'+c+'<PARAM NAME="CODE" VALUE="LokiApplet.class"/>'+a+'<PARAM NAME="scriptable" VALUE="true"/></OBJECT>'}else{b.innerHTML='<object classid="java:LokiApplet.class" type="application/x-java-applet" code="LokiApplet.class" archive="'+LokiPlugin.globalURLPrefix+'LokiApplet.jar" width=0 height=0><PARAM NAME="MAYSCRIPT" VALUE="true">'+a+"</object>"}};LokiPlugin.prototype.tryToInstallExtension=function(){var a=this;var b=function(e,d){a.attemptedInstall=true;if(d==0){a.init()}else{a.installFailed=true}};var c=function(d){var e=InstallTrigger.install({"Loki Plugin":{URL:LokiPlugin.globalURLPrefix+"loki_plugin.xpi",IconURL:"Loki_B.png"}},b);if(!e){throw"LokiPlugin: failed to prompt user to install plugin."}};c();return};function IsLokiToolbarInstalled(){try{if(Try.these(function(){return new ActiveXObject("Loki.LokiButton.1")})||false){return true}return false}catch(a){return false}}function LokiNull(){}LokiNull.prototype.setKey=function(){};LokiNull.prototype.isInstalled=function(){return false};LokiNull.prototype.requestLocation=function(){if(this.onFailure!=undefined){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_PLUGIN_COULD_NOT_BE_INSTALLED)}};LokiNull.prototype.requestIPLocation=function(){if(this.onFailure!=undefined){this.onFailureProxy(LokiPlugin.returnCodes.WPS_ERROR_PLUGIN_COULD_NOT_BE_INSTALLED)}};var Try={these:function(){var c;for(var b=0;b<arguments.length;b++){var a=arguments[b];try{c=a();break}catch(d){}}return c}};function compareVersions(a,b){versions1=a.split(".");versions2=b.split(".");for(i=0;i<versions1.length&&i<versions2.length;i++){if(parseInt(versions1[i])>parseInt(versions2[i])){return i+1}if(parseInt(versions1[i])<parseInt(versions2[i])){return -(i+1)}}return 0}var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"Unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"Unknown version";this.OS=this.searchString(this.dataOS)||"Unknown OS";if(this.browser=="Explorer"){this.javaAvail=true}else{if(this.browser=="Firefox"&&this.version==3){this.javaAvail=this.findJava()}else{if(this.browser=="Opera"){this.javaAvail=navigator.javaEnabled()}else{this.javaAvail=this.findJava()&&navigator.javaEnabled()}}}this.javaWaitingConfirmation=true;this.javaWaitingConfirmationSince=(new Date()).getTime()},findJava:function(){if(!navigator||!navigator.plugins){return true}navigator.plugins.refresh(false);for(var a=0;a<navigator.plugins.length;++a){if(navigator.plugins[a]==undefined){continue}if(navigator.plugins[a].name.indexOf("Java")!=-1){LokiPlugin.javaPluginDescription=navigator.plugins[a].description;return true}}return false},searchString:function(d){for(var a=0;a<d.length;a++){var b=d[a].string;var c=d[a].prop;this.versionSearchString=d[a].versionSearch||d[a].identity;if(b){if(b.indexOf(d[a].subString)!=-1){return d[a].identity}}else{if(c){return d[a].identity}}}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);if(a==-1){return}return parseFloat(b.substring(a+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};LokiPlugin.javaPluginDescription="";BrowserDetect.init();LokiPlugin.prototype.key="beta";LokiPlugin.prototype.NO_STREET_ADDRESS_LOOKUP=0;LokiPlugin.prototype.LIMITED_STREET_ADDRESS_LOOKUP=1;LokiPlugin.prototype.FULL_STREET_ADDRESS_LOOKUP=2;LokiPlugin.returnCodes=new Object();LokiPlugin.returnCodes.WPS_OK=0;LokiPlugin.returnCodes.WPS_ERROR_SCANNER_NOT_FOUND=1;LokiPlugin.returnCodes.WPS_ERROR_WIFI_NOT_AVAILABLE=2;LokiPlugin.returnCodes.WPS_ERROR_NO_WIFI_IN_RANGE=3;LokiPlugin.returnCodes.WPS_ERROR_UNAUTHORIZED=4;LokiPlugin.returnCodes.WPS_ERROR_SERVER_UNAVAILABLE=5;LokiPlugin.returnCodes.WPS_ERROR_LOCATION_CANNOT_BE_DETERMINED=6;LokiPlugin.returnCodes.WPS_ERROR_PROXY_UNAUTHORIZED=7;LokiPlugin.returnCodes.WPS_ERROR_FILE_IO=8;LokiPlugin.returnCodes.WPS_ERROR_INVALID_FILE_FORMAT=9;LokiPlugin.returnCodes.WPS_ERROR_PLUGIN_COULD_NOT_BE_INSTALLED=1000;LokiPlugin.returnCodes.WPS_ERROR_PERMISSION_DENIED=1001;LokiPlugin.returnCodes.WPS_ERROR_PLUGIN_BROWSER_NOT_SUPPORTED=1002;LokiPlugin.returnCodes.WPS_ERROR_FEATURE_NOT_SUPPORTED=1003;LokiPlugin.returnMessages=new Object();LokiPlugin.returnMessages[0]="Successfull";LokiPlugin.returnMessages[1]="Wi-Fi Scanner was not found";LokiPlugin.returnMessages[2]="Wi-Fi is not available";LokiPlugin.returnMessages[3]="No Wi-Fi access points are in range";LokiPlugin.returnMessages[4]="Invalid application key, please contact the site owner";LokiPlugin.returnMessages[5]="Location server unavailable";LokiPlugin.returnMessages[6]="No Wi-Fi access points were recognized";LokiPlugin.returnMessages[7]="Proxy error";LokiPlugin.returnMessages[8]="A file I/O error was encountered";LokiPlugin.returnMessages[9]="Invalid file format";LokiPlugin.returnMessages[1000]="Plugin could not be installed";LokiPlugin.returnMessages[1001]="Permission denied";LokiPlugin.returnMessages[1002]="Browser is not supported";LokiPlugin.returnMessages[1003]="Feature is not supported by installed version of plugin";LokiPlugin.fallbackToNativeTimeout=10000;LokiPlugin.xpcom=null;LokiPlugin.activex=null;LokiPlugin.isRunning=false;LokiPlugin.timer=0;LokiPlugin.attemptedInstall=false;LokiPlugin.installFailed=false;LokiPlugin.upgradeCancelled=false;LokiPlugin.upgradeStarted=false;LokiPlugin.upgradeCompletedSuccessfull=false;LokiPlugin.nullappletShouldRunInstaller=false;LokiPlugin.waitingRet=false;var LokiAPI_PreloadNullapplet;var LokiAPI_FilesLocation;if(LokiAPI_FilesLocation==undefined){LokiAPI_FilesLocation="http://loki.com/plugin/files/"}if(LokiAPI_PreloadNullapplet==undefined){LokiAPI_PreloadNullapplet=false}LokiPlugin.toolbarDetected=IsLokiToolbarInstalled();LokiPlugin.useGlobalURLs=(LokiAPI_FilesLocation!=undefined&&LokiAPI_FilesLocation!="");LokiPlugin.globalURLPrefix=LokiPlugin.useGlobalURLs?LokiAPI_FilesLocation:"";if(BrowserDetect.javaAvail&&!LokiPlugin.isInstalled(true)){if(LokiAPI_PreloadNullapplet){setTimeout(function(){LokiPlugin.runNullapplet()},200)}}LokiPlugin.runNullapplet=function(){var c=LokiPlugin.useGlobalURLs?'codebase="'+LokiPlugin.globalURLPrefix+'"':"";var b=LokiPlugin.useGlobalURLs?'<PARAM NAME="CODEBASE" VALUE="'+LokiPlugin.globalURLPrefix+'"/>':"";var a=document.createElement("div");document.getElementsByTagName("body").item(0).appendChild(a);if(!LokiAPI_PreloadNullapplet){LokiPlugin.nullappletShouldRunInstaller=true}BrowserDetect.javaWaitingConfirmationSince=(new Date()).getTime();if(BrowserDetect.browser=="Safari"){a.innerHTML='<object type="application/x-java-applet" code="nullapplet.class" '+c+' width=0 height=0><PARAM NAME="MAYSCRIPT" VALUE="true"><param name="JAVA_CODEBASE" value="'+LokiPlugin.globalURLPrefix+'"></object>'}else{if(BrowserDetect.browser=="Explorer"){a.innerHTML='<OBJECT id="nullapplet" classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" WIDTH="0" HEIGHT="0">'+b+'<PARAM NAME="CODE" VALUE="nullapplet.class"/><PARAM NAME="scriptable" VALUE="true"/></OBJECT>'}else{a.innerHTML='<applet name="nullapplet" id="nullapplet" '+c+' code="nullapplet.class" width="0" height="0" mayscript=true><param name="mayscript" value="true"></applet>'}}};function confirmJavaOK(){BrowserDetect.javaWaitingConfirmation=false;if(LokiPlugin.nullappletShouldRunInstaller){LokiPlugin.nullappletShouldRunInstaller=false;LokiPlugin.startInstallApplet()}};