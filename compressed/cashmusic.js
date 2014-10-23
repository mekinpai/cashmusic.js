// cashmusic.js v2 | (c) 2014 CASH Music | http://cashmusic.github.io/cashmusic.js/ | https://github.com/cashmusic/cashmusic.js/blob/master/LICENSE
window.cashmusic=function(){var g;null!=window.cashmusic?g=window.cashmusic:(g={embeds:{whitelist:"",all:[]},loaded:!1,soundplayer:!1,lightbox:!1,options:"",path:"",templates:{},eventlist:{},storage:{},embedded:!1,_init:function(){var a=window.cashmusic;a.scriptElement=document.querySelector('script[src$="cashmusic.js"]');a.scriptElement&&(a.path=a.scriptElement.src.substr(0,a.scriptElement.src.length-12));a.options=String(a.scriptElement.getAttribute("data-options"));-1!==this.options.indexOf("lightboxvideo")&&
a.loadScript(a.path+"lightbox/lightbox.js");0<document.querySelectorAll("a.cashmusic.soundplayer,div.cashmusic.soundplayer").length&&a.loadScript(a.path+"soundplayer/soundplayer.js");self!==top&&a._initEmbed();a.events.add(window,"message",function(b){-1!==a.embeds.whitelist.indexOf(b.origin)&&a._handleMessage(b)});this.loaded=!0},_initEmbed:function(){var a=window.cashmusic;a.embedded=!0;a.storage.embedheight=a.measure.scrollheight();a.events.relay("resize",a.storage.embedheight);var b=document.querySelector("div.cashmusic.element");
a.fader.hide(b);var c=b.className.split(" ");a.events.relay("identify",[c[2],c[3].substr(3)]);window.setInterval(function(){var b=a.measure.scrollheight();b!=a.storage.embedheight&&(a.storage.embedheight=b,a.events.relay("resize",b))},250);(c=a.getQueryVariable("cssoverride"))&&a.styles.injectCSS(c);window.setTimeout(function(){a.fader.init(b,100)},100);for(var c=document.getElementsByTagName("form"),d=0;d<c.length;d++){var e=document.createElement("input");e.setAttribute("type","hidden");e.setAttribute("name",
"embedded_element");e.setAttribute("value","1");c[d].appendChild(e)}},_handleMessage:function(a){for(var b=window.cashmusic,c=JSON.parse(a.data),d,e=0;e<b.embeds.all.length;e++)if(b.embeds.all[e].el.contentWindow===a.source){d=b.embeds.all[e];break}"resize"==c.type?(d.el.height=c.data,d.el.style.height=c.data+"px"):"identify"==c.type&&d.id==c.data[1]&&(d.type=c.data[0])},contentLoaded:function(a){var b=!1,c=!0,d=window.document,e=d.documentElement,f=function(c){if("readystatechange"!=c.type||"complete"==
d.readyState)g.events.remove("load"==c.type?window:d,c.type,f),!b&&(b=!0)&&a.call(window,c.type||c)},l=function(){try{e.doScroll("left")}catch(a){setTimeout(l,50);return}f("poll")};if("complete"==d.readyState)a.call(window,"lazy");else{if(d.createEventObject&&e.doScroll){try{c=!window.frameElement}catch(h){}c&&l()}this.events.add(d,"DOMContentLoaded",f);this.events.add(d,"readystatechange",f);this.events.add(d,"load",f)}},embed:function(a,b,c,d,e,f,l){"object"===typeof a&&(b=a.elementid?a.elementid:
!1,c=a.lightboxed?a.lightboxed:!1,d=a.lightboxtxt?a.lightboxtxt:!1,e=a.position?a.position:!1,f=a.targetnode?a.targetnode:!1,l=a.cssoverride?a.cssoverride:!1,a=a.endpoint);var h=window.cashmusic,g=a.replace(/\/$/,"")+"/request/embed/"+b+"/location/"+encodeURIComponent(window.location.href.replace(/\//g,"!slash!"));l&&(g=g+"?cssoverride="+encodeURIComponent(l));var k=document.createElement("iframe");k.src=g;k.className="cashmusic embed";k.style.width="100%";k.style.height="0";k.style.border="0";k.style.overflow=
"hidden";k.scrolling="no";if(f)var m=document.querySelector(f);else a=document.querySelectorAll("script"),m=a[a.length-1];if(m){if(c){var n=document.createElement("span");n.className="cashmusic embed link";h.contentLoaded(function(){d||(d="open element");h.overlay.create(function(){var a=document.createElement("a");a.href=g;a.target="_blank";a.innerHTML=d;n.appendChild(a);m.parentNode.insertBefore(n,m);(function(b){"object"!==typeof b&&(b={top:"40px",left:"30%",width:"40%",marginLeft:"0"});h.events.add(a,
"click",function(a){h.overlay.resize(b.top,b.left,b.width,b.marginLeft);h.overlay.content.appendChild(k);window.cashmusic.fader.init(h.overlay.bg,100);a.preventDefault();return!1})})(e)})})}else m.parentNode.insertBefore(k,m);c=g.split("/").slice(0,3).join("/");-1===h.embeds.whitelist.indexOf(c)&&(h.embeds.whitelist+=c);h.embeds.all.push({el:k,id:b,type:""})}},getTemplate:function(a,b){var c=window.cashmusic,d=c.templates;if(void 0!==d[a])b(d[a]);else if(this.ajax.jsonp(c.path+"templates/"+a+".js",
"callback",function(c){d[a]=c.template;b(c.template)},"cashmusic"+a+"Callback"),!document.querySelectorAll('link[href="'+c.path+"templates/"+a+'.css"]').length){var e=document.createElement("link");e.setAttribute("href",c.path+"templates/"+a+".css");e.setAttribute("rel","stylesheet");e.setAttribute("type","text/css");document.getElementsByTagName("head")[0].appendChild(e)}},addEventListener:function(a,b){var c=window.cashmusic;c.eventlist.hasOwnProperty(a)||(c.eventlist[a]=[]);c.eventlist[a].push(b)},
removeEventListener:function(a,b){var c=window.cashmusic;if(c.eventlist.hasOwnProperty(a)){var d=c.eventlist[a].indexOf(b);-1!=d&&c.eventlist[a].splice(d,1)}},dispatchEvent:function(a){var b=window.cashmusic;if(b.eventlist.hasOwnProperty(a.type)){var c;for(c=0;c<b.eventlist[a.type].length;c++)if(b.eventlist[a.type][c])b.eventlist[a.type][c](a)}},loadScript:function(a,b){if(0<document.querySelectorAll('a[src="'+a+'"]').length)"function"===typeof b&&b();else{var c=document.getElementsByTagName("head")[0]||
document.documentElement,d=document.createElement("script");d.src=a;var e=!1;d.onload=d.onreadystatechange=function(){e||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e=!0,"function"===typeof b&&b(),d.onload=d.onreadystatechange=null,c&&d.parentNode&&c.removeChild(d))};c.insertBefore(d,c.firstChild)}},getQueryVariable:function(a){for(var b=window.location.search.substring(1).split("&"),c=0;c<b.length;c++){var d=b[c].split("=");if(d[0]==a)return decodeURIComponent(d[1])}return!1},
ajax:{getXHR:function(){try{return new XMLHttpRequest}catch(a){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(c){return!1}}}},send:function(a,b,c,d){var e="POST";b||(e="GET",b=null);var f=this.getXHR();f&&(f.open(e,a,!0),f.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"==e&&f.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"function"==typeof c&&(f.onreadystatechange=function(){4===f.readyState&&(200===
f.status?c(f.responseText):"function"===typeof d&&d(f.responseText))}),f.send(b))},jsonp:function(a,b,c,d){a=a||"";b=b||"";c=c||function(){};d=d||!1;"function"==typeof b&&(c=b,b="callback");if(d){var e=d,f=function(){};"function"==typeof window[e]&&(f=window[e])}else e="jsonp"+Math.round(1000001*Math.random());window[e]=function(a){c(a);d?f(a):delete window[e]};a=-1===a.indexOf("?")?a+"?":a+"&";var g=document.createElement("script");g.setAttribute("src",a+b+"="+e);document.getElementsByTagName("head")[0].appendChild(g)},
encodeForm:function(a){if("object"!==typeof a)return!1;var b="";a=a.elements||a;for(var c=0;c<a.length;c++)"checkbox"===a[c].type||"radio"===a[c].type?a[c].checked&&(b+=(b.length?"&":"")+a[c].name+"="+a[c].value):b+=(b.length?"&":"")+a[c].name+"="+a[c].value;return encodeURI(b)}},events:{add:function(a,b,c){a.attachEvent?(a["e"+b+c]=c,a[b+c]=function(){a["e"+b+c](window.event)},a.attachEvent("on"+b,a[b+c])):a.addEventListener(b,c,!1)},remove:function(a,b,c){a.detachEvent?(a.detachEvent("on"+b,a[b+
c]),a[b+c]=null):a.removeEventListener(b,c,!1)},fire:function(a,b,c){var d=window.cashmusic;if(document.dispatchEvent){var e=document.createEvent("CustomEvent");e.initCustomEvent(b,!1,!1,c);a.dispatchEvent(e)}else e=document.createEventObject(),e.detail=c,a.fireEvent("on"+b,e);d.embedded&&d.events.relay(b,c)},relay:function(a,b){window.parent.postMessage(JSON.stringify({type:a,data:b}),"*")}},fader:{elem:!1,flag:!1,alpha:!1,target:!1,init:function(a,b,c){var d=window.cashmusic.fader;d.setElement(a);
clearInterval(d.si);d.alpha=d.elem.style.opacity?100*parseFloat(d.elem.style.opacity):0;d.flag=d.alpha>b?-1:1;d.target=b;0==d.alpha&&0<b&&(d.elem.style.opacity=0,d.elem.style.display="block");d.si=setInterval(function(){d.tween(c)},10)},tween:function(a){var b=window.cashmusic.fader;b.alpha==b.target?(clearInterval(b.si),"function"==typeof a&&a()):(a=Math.round(b.alpha+.05*(b.target-b.alpha))+b.flag,b.elem.style.opacity=a/100,b.elem.style.filter="alpha(opacity="+a+")",0==a&&(b.elem.style.display=
"none"),b.alpha=a)},hide:function(a){var b=window.cashmusic.fader;b.setElement(a);b.elem.style.opacity=0;b.elem.style.display="none"},show:function(a){var b=window.cashmusic.fader;b.setElement(a);b.elem.style.opacity=100;b.elem.style.display="block"},setElement:function(a){window.cashmusic.fader.elem="string"===typeof a?document.getElementById(a):a}},measure:{viewport:function(){return{x:window.innerWidth||document.body.offsetWidth||0,y:window.innerHeight||document.body.offsetHeight||0}},scrollheight:function(){var a=
document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)}},overlay:{bg:!1,content:!1,total:0,callbacks:[],create:function(a){var b=window.cashmusic,c=b.overlay;!1===c.bg?(c.total++,"function"===typeof a&&c.callbacks.push(a),1==c.total&&b.getTemplate("overlay",function(a){var e=document.createElement("div");e.innerHTML=a;c.bg=e.firstChild;c.bg.style.display="none";document.body.appendChild(c.bg);e=null;a=c.bg.getElementsByTagName("div");
c.content=a[0];b.events.add(window,"keyup",function(a){27==a.keyCode&&(c.bg.style.display="block",b.fader.hide(c.bg),c.content.innerHTML="")});b.events.add(c.bg,"click",function(a){a.target===this&&(b.fader.hide(c.bg),c.content.innerHTML="")});for(a=0;a<c.callbacks.length;a++)c.callbacks[a]()})):a()},resize:function(a,b,c,d){var e=window.cashmusic.overlay.content.style;e.top=a;e.left=b;e.width=c;e.marginLeft=d}},styles:{addClass:function(a,b){a.className=a.className+" "+b},hasClass:function(a,b){return-1<
(" "+a.className+" ").indexOf(" "+b+" ")},injectCSS:function(a,b){var c=document.getElementsByTagName("head")[0]||document.documentElement;if("http"==a.substr(0,4)){var d=document.createElement("link");d.rel="stylesheet";d.href=a}else d=document.createElement("style"),d.innerHTML=a;d.type="text/css";b?c.appendChild(d):c.insertBefore(d,c.firstChild)},removeClass:function(a,b){a.className=(" "+a.className+" ").replace(" "+b+" ").replace(/^\s+/,"").replace(/\s+$/,"")},swapClasses:function(a,b,c){a.className=
(" "+a.className+" ").replace(" "+b+" "," "+c+" ").replace(/^\s+/,"").replace(/\s+$/,"")}}},g.contentLoaded(function(){g._init(g)}));return g}();