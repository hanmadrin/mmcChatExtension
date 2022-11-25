!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).io=e()}(this,(function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function r(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}function i(){return i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}function s(t){return s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},s(t)}function a(t,e){return a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},a(t,e)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function u(t,e,n){return u=c()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&a(i,n.prototype),i},u.apply(null,arguments)}function h(t){var e="function"==typeof Map?new Map:void 0;return h=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return u(t,arguments,s(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,t)},h(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return f(t)}function p(t){var e=c();return function(){var n,r=s(t);if(e){var i=s(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l(this,n)}}function d(t,e,n){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}},d(t,e,n||t)}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function v(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}var g=Object.create(null);g.open="0",g.close="1",g.ping="2",g.pong="3",g.message="4",g.upgrade="5",g.noop="6";var m=Object.create(null);Object.keys(g).forEach((function(t){m[g[t]]=t}));for(var k={type:"error",data:"parser error"},b="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),w="function"==typeof ArrayBuffer,_=function(t,e,n){var r,i=t.type,o=t.data;return b&&o instanceof Blob?e?n(o):A(o,n):w&&(o instanceof ArrayBuffer||(r=o,"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(r):r&&r.buffer instanceof ArrayBuffer))?e?n(o):A(new Blob([o]),n):n(g[i]+(o||""))},A=function(t,e){var n=new FileReader;return n.onload=function(){var t=n.result.split(",")[1];e("b"+t)},n.readAsDataURL(t)},E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",O="undefined"==typeof Uint8Array?[]:new Uint8Array(256),R=0;R<E.length;R++)O[E.charCodeAt(R)]=R;var T="function"==typeof ArrayBuffer,C=function(t,e){if("string"!=typeof t)return{type:"message",data:S(t,e)};var n=t.charAt(0);return"b"===n?{type:"message",data:B(t.substring(1),e)}:m[n]?t.length>1?{type:m[n],data:t.substring(1)}:{type:m[n]}:k},B=function(t,e){if(T){var n=function(t){var e,n,r,i,o,s=.75*t.length,a=t.length,c=0;"="===t[t.length-1]&&(s--,"="===t[t.length-2]&&s--);var u=new ArrayBuffer(s),h=new Uint8Array(u);for(e=0;e<a;e+=4)n=O[t.charCodeAt(e)],r=O[t.charCodeAt(e+1)],i=O[t.charCodeAt(e+2)],o=O[t.charCodeAt(e+3)],h[c++]=n<<2|r>>4,h[c++]=(15&r)<<4|i>>2,h[c++]=(3&i)<<6|63&o;return u}(t);return S(n,e)}return{base64:!0,data:t}},S=function(t,e){return"blob"===e&&t instanceof ArrayBuffer?new Blob([t]):t},N=String.fromCharCode(30);function x(t){if(t)return function(t){for(var e in x.prototype)t[e]=x.prototype[e];return t}(t)}x.prototype.on=x.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},x.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},x.prototype.off=x.prototype.removeListener=x.prototype.removeAllListeners=x.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var i=0;i<r.length;i++)if((n=r[i])===e||n.fn===e){r.splice(i,1);break}return 0===r.length&&delete this._callbacks["$"+t],this},x.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){r=0;for(var i=(n=n.slice(0)).length;r<i;++r)n[r].apply(this,e)}return this},x.prototype.emitReserved=x.prototype.emit,x.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},x.prototype.hasListeners=function(t){return!!this.listeners(t).length};var L="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")();function P(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})}var j=setTimeout,q=clearTimeout;function I(t,e){e.useNativeTimers?(t.setTimeoutFn=j.bind(L),t.clearTimeoutFn=q.bind(L)):(t.setTimeoutFn=setTimeout.bind(L),t.clearTimeoutFn=clearTimeout.bind(L))}var D,F=function(t){o(r,t);var n=p(r);function r(t,i,o){var s;return e(this,r),(s=n.call(this,t)).description=i,s.context=o,s.type="TransportError",s}return r}(h(Error)),M=function(t){o(i,t);var n=p(i);function i(t){var r;return e(this,i),(r=n.call(this)).writable=!1,I(f(r),t),r.opts=t,r.query=t.query,r.readyState="",r.socket=t.socket,r}return r(i,[{key:"onError",value:function(t,e,n){return d(s(i.prototype),"emitReserved",this).call(this,"error",new F(t,e,n)),this}},{key:"open",value:function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(t){"open"===this.readyState&&this.write(t)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,d(s(i.prototype),"emitReserved",this).call(this,"open")}},{key:"onData",value:function(t){var e=C(t,this.socket.binaryType);this.onPacket(e)}},{key:"onPacket",value:function(t){d(s(i.prototype),"emitReserved",this).call(this,"packet",t)}},{key:"onClose",value:function(t){this.readyState="closed",d(s(i.prototype),"emitReserved",this).call(this,"close",t)}}]),i}(x),U="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),V={},H=0,K=0;function Y(t){var e="";do{e=U[t%64]+e,t=Math.floor(t/64)}while(t>0);return e}function z(){var t=Y(+new Date);return t!==D?(H=0,D=t):t+"."+Y(H++)}for(;K<64;K++)V[U[K]]=K;function W(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function $(t){for(var e={},n=t.split("&"),r=0,i=n.length;r<i;r++){var o=n[r].split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}var J=!1;try{J="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(t){}var X=J;function G(t){var e=t.xdomain;try{if("undefined"!=typeof XMLHttpRequest&&(!e||X))return new XMLHttpRequest}catch(t){}if(!e)try{return new(L[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}function Q(){}var Z=null!=new G({xdomain:!1}).responseType,tt=function(t){o(s,t);var n=p(s);function s(t){var r;if(e(this,s),(r=n.call(this,t)).polling=!1,"undefined"!=typeof location){var i="https:"===location.protocol,o=location.port;o||(o=i?"443":"80"),r.xd="undefined"!=typeof location&&t.hostname!==location.hostname||o!==t.port,r.xs=t.secure!==i}var a=t&&t.forceBase64;return r.supportsBinary=Z&&!a,r}return r(s,[{key:"name",get:function(){return"polling"}},{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(t){var e=this;this.readyState="pausing";var n=function(){e.readyState="paused",t()};if(this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}},{key:"onData",value:function(t){var e=this;(function(t,e){for(var n=t.split(N),r=[],i=0;i<n.length;i++){var o=C(n[i],e);if(r.push(o),"error"===o.type)break}return r})(t,this.socket.binaryType).forEach((function(t){if("opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type)return e.onClose({description:"transport closed by the server"}),!1;e.onPacket(t)})),"closed"!==this.readyState&&(this.polling=!1,this.emitReserved("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var t=this,e=function(){t.write([{type:"close"}])};"open"===this.readyState?e():this.once("open",e)}},{key:"write",value:function(t){var e=this;this.writable=!1,function(t,e){var n=t.length,r=new Array(n),i=0;t.forEach((function(t,o){_(t,!1,(function(t){r[o]=t,++i===n&&e(r.join(N))}))}))}(t,(function(t){e.doWrite(t,(function(){e.writable=!0,e.emitReserved("drain")}))}))}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"https":"http",n="";!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=z()),this.supportsBinary||t.sid||(t.b64=1),this.opts.port&&("https"===e&&443!==Number(this.opts.port)||"http"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port);var r=W(t);return e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(r.length?"?"+r:"")}},{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(t,{xd:this.xd,xs:this.xs},this.opts),new et(this.uri(),t)}},{key:"doWrite",value:function(t,e){var n=this,r=this.request({method:"POST",data:t});r.on("success",e),r.on("error",(function(t,e){n.onError("xhr post error",t,e)}))}},{key:"doPoll",value:function(){var t=this,e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(function(e,n){t.onError("xhr poll error",e,n)})),this.pollXhr=e}}]),s}(M),et=function(t){o(i,t);var n=p(i);function i(t,r){var o;return e(this,i),I(f(o=n.call(this)),r),o.opts=r,o.method=r.method||"GET",o.uri=t,o.async=!1!==r.async,o.data=void 0!==r.data?r.data:null,o.create(),o}return r(i,[{key:"create",value:function(){var t=this,e=P(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;var n=this.xhr=new G(e);try{n.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders)for(var r in n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(r)&&n.setRequestHeader(r,this.opts.extraHeaders[r])}catch(t){}if("POST"===this.method)try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{n.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in n&&(n.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(n.timeout=this.opts.requestTimeout),n.onreadystatechange=function(){4===n.readyState&&(200===n.status||1223===n.status?t.onLoad():t.setTimeoutFn((function(){t.onError("number"==typeof n.status?n.status:0)}),0))},n.send(this.data)}catch(e){return void this.setTimeoutFn((function(){t.onError(e)}),0)}"undefined"!=typeof document&&(this.index=i.requestsCount++,i.requests[this.index]=this)}},{key:"onError",value:function(t){this.emitReserved("error",t,this.xhr),this.cleanup(!0)}},{key:"cleanup",value:function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.xhr.onreadystatechange=Q,t)try{this.xhr.abort()}catch(t){}"undefined"!=typeof document&&delete i.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var t=this.xhr.responseText;null!==t&&(this.emitReserved("data",t),this.emitReserved("success"),this.cleanup())}},{key:"abort",value:function(){this.cleanup()}}]),i}(x);if(et.requestsCount=0,et.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",nt);else if("function"==typeof addEventListener){addEventListener("onpagehide"in L?"pagehide":"unload",nt,!1)}function nt(){for(var t in et.requests)et.requests.hasOwnProperty(t)&&et.requests[t].abort()}var rt="function"==typeof Promise&&"function"==typeof Promise.resolve?function(t){return Promise.resolve().then(t)}:function(t,e){return e(t,0)},it=L.WebSocket||L.MozWebSocket,ot="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),st=function(t){o(i,t);var n=p(i);function i(t){var r;return e(this,i),(r=n.call(this,t)).supportsBinary=!t.forceBase64,r}return r(i,[{key:"name",get:function(){return"websocket"}},{key:"doOpen",value:function(){if(this.check()){var t=this.uri(),e=this.opts.protocols,n=ot?{}:P(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=ot?new it(t,e,n):e?new it(t,e):new it(t)}catch(t){return this.emitReserved("error",t)}this.ws.binaryType=this.socket.binaryType||"arraybuffer",this.addEventListeners()}}},{key:"addEventListeners",value:function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws._socket.unref(),t.onOpen()},this.ws.onclose=function(e){return t.onClose({description:"websocket connection closed",context:e})},this.ws.onmessage=function(e){return t.onData(e.data)},this.ws.onerror=function(e){return t.onError("websocket error",e)}}},{key:"write",value:function(t){var e=this;this.writable=!1;for(var n=function(n){var r=t[n],i=n===t.length-1;_(r,e.supportsBinary,(function(t){try{e.ws.send(t)}catch(t){}i&&rt((function(){e.writable=!0,e.emitReserved("drain")}),e.setTimeoutFn)}))},r=0;r<t.length;r++)n(r)}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"wss":"ws",n="";this.opts.port&&("wss"===e&&443!==Number(this.opts.port)||"ws"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=z()),this.supportsBinary||(t.b64=1);var r=W(t);return e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(r.length?"?"+r:"")}},{key:"check",value:function(){return!(!it||"__initialize"in it&&this.name===i.prototype.name)}}]),i}(M),at={websocket:st,polling:tt},ct=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ut=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ht(t){var e=t,n=t.indexOf("["),r=t.indexOf("]");-1!=n&&-1!=r&&(t=t.substring(0,n)+t.substring(n,r).replace(/:/g,";")+t.substring(r,t.length));for(var i,o,s=ct.exec(t||""),a={},c=14;c--;)a[ut[c]]=s[c]||"";return-1!=n&&-1!=r&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=function(t,e){var n=/\/{2,9}/g,r=e.replace(n,"/").split("/");"/"!=e.substr(0,1)&&0!==e.length||r.splice(0,1);"/"==e.substr(e.length-1,1)&&r.splice(r.length-1,1);return r}(0,a.path),a.queryKey=(i=a.query,o={},i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,n){e&&(o[e]=n)})),o),a}var ft=function(n){o(a,n);var s=p(a);function a(n){var r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(this,a),r=s.call(this),n&&"object"===t(n)&&(o=n,n=null),n?(n=ht(n),o.hostname=n.host,o.secure="https"===n.protocol||"wss"===n.protocol,o.port=n.port,n.query&&(o.query=n.query)):o.host&&(o.hostname=ht(o.host).host),I(f(r),o),r.secure=null!=o.secure?o.secure:"undefined"!=typeof location&&"https:"===location.protocol,o.hostname&&!o.port&&(o.port=r.secure?"443":"80"),r.hostname=o.hostname||("undefined"!=typeof location?location.hostname:"localhost"),r.port=o.port||("undefined"!=typeof location&&location.port?location.port:r.secure?"443":"80"),r.transports=o.transports||["polling","websocket"],r.readyState="",r.writeBuffer=[],r.prevBufferLen=0,r.opts=i({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},o),r.opts.path=r.opts.path.replace(/\/$/,"")+"/","string"==typeof r.opts.query&&(r.opts.query=$(r.opts.query)),r.id=null,r.upgrades=null,r.pingInterval=null,r.pingTimeout=null,r.pingTimeoutTimer=null,"function"==typeof addEventListener&&(r.opts.closeOnBeforeunload&&addEventListener("beforeunload",(function(){r.transport&&(r.transport.removeAllListeners(),r.transport.close())}),!1),"localhost"!==r.hostname&&(r.offlineEventListener=function(){r.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",r.offlineEventListener,!1))),r.open(),r}return r(a,[{key:"createTransport",value:function(t){var e=i({},this.opts.query);e.EIO=4,e.transport=t,this.id&&(e.sid=this.id);var n=i({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new at[t](n)}},{key:"open",value:function(){var t,e=this;if(this.opts.rememberUpgrade&&a.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length)return void this.setTimeoutFn((function(){e.emitReserved("error","No transports available")}),0);t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)}},{key:"setTransport",value:function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(function(t){return e.onClose("transport close",t)}))}},{key:"probe",value:function(t){var e=this,n=this.createTransport(t),r=!1;a.priorWebsocketSuccess=!1;var i=function(){r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",(function(t){if(!r)if("pong"===t.type&&"probe"===t.data){if(e.upgrading=!0,e.emitReserved("upgrading",n),!n)return;a.priorWebsocketSuccess="websocket"===n.name,e.transport.pause((function(){r||"closed"!==e.readyState&&(f(),e.setTransport(n),n.send([{type:"upgrade"}]),e.emitReserved("upgrade",n),n=null,e.upgrading=!1,e.flush())}))}else{var i=new Error("probe error");i.transport=n.name,e.emitReserved("upgradeError",i)}})))};function o(){r||(r=!0,f(),n.close(),n=null)}var s=function(t){var r=new Error("probe error: "+t);r.transport=n.name,o(),e.emitReserved("upgradeError",r)};function c(){s("transport closed")}function u(){s("socket closed")}function h(t){n&&t.name!==n.name&&o()}var f=function(){n.removeListener("open",i),n.removeListener("error",s),n.removeListener("close",c),e.off("close",u),e.off("upgrading",h)};n.once("open",i),n.once("error",s),n.once("close",c),this.once("close",u),this.once("upgrading",h),n.open()}},{key:"onOpen",value:function(){if(this.readyState="open",a.priorWebsocketSuccess="websocket"===this.transport.name,this.emitReserved("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},{key:"onPacket",value:function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data)}}},{key:"onHandshake",value:function(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.maxPayload=t.maxPayload,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var t=this;this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn((function(){t.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emitReserved("drain"):this.flush()}},{key:"flush",value:function(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){var t=this.getWritablePackets();this.transport.send(t),this.prevBufferLen=t.length,this.emitReserved("flush")}}},{key:"getWritablePackets",value:function(){if(!(this.maxPayload&&"polling"===this.transport.name&&this.writeBuffer.length>1))return this.writeBuffer;for(var t,e=1,n=0;n<this.writeBuffer.length;n++){var r=this.writeBuffer[n].data;if(r&&(e+="string"==typeof(t=r)?function(t){for(var e=0,n=0,r=0,i=t.length;r<i;r++)(e=t.charCodeAt(r))<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(r++,n+=4);return n}(t):Math.ceil(1.33*(t.byteLength||t.size))),n>0&&e>this.maxPayload)return this.writeBuffer.slice(0,n);e+=2}return this.writeBuffer}},{key:"write",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"send",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"sendPacket",value:function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var i={type:t,data:e,options:n};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var t=this,e=function(){t.onClose("forced close"),t.transport.close()},n=function n(){t.off("upgrade",n),t.off("upgradeError",n),e()},r=function(){t.once("upgrade",n),t.once("upgradeError",n)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){t.upgrading?r():e()})):this.upgrading?r():e()),this}},{key:"onError",value:function(t){a.priorWebsocketSuccess=!1,this.emitReserved("error",t),this.onClose("transport error",t)}},{key:"onClose",value:function(t,e){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}}]),a}(x);ft.protocol=4;var lt="function"==typeof ArrayBuffer,pt=Object.prototype.toString,dt="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===pt.call(Blob),yt="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===pt.call(File);function vt(t){return lt&&(t instanceof ArrayBuffer||function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}(t))||dt&&t instanceof Blob||yt&&t instanceof File}function gt(e,n){if(!e||"object"!==t(e))return!1;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)if(gt(e[r]))return!0;return!1}if(vt(e))return!0;if(e.toJSON&&"function"==typeof e.toJSON&&1===arguments.length)return gt(e.toJSON(),!0);for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&gt(e[o]))return!0;return!1}function mt(t){var e=[],n=t.data,r=t;return r.data=kt(n,e),r.attachments=e.length,{packet:r,buffers:e}}function kt(e,n){if(!e)return e;if(vt(e)){var r={_placeholder:!0,num:n.length};return n.push(e),r}if(Array.isArray(e)){for(var i=new Array(e.length),o=0;o<e.length;o++)i[o]=kt(e[o],n);return i}if("object"===t(e)&&!(e instanceof Date)){var s={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(s[a]=kt(e[a],n));return s}return e}function bt(t,e){return t.data=wt(t.data,e),t.attachments=void 0,t}function wt(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]=wt(e[r],n);else if("object"===t(e))for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(e[i]=wt(e[i],n));return e}var _t;!function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(_t||(_t={}));var At=function(){function t(n){e(this,t),this.replacer=n}return r(t,[{key:"encode",value:function(t){return t.type!==_t.EVENT&&t.type!==_t.ACK||!gt(t)?[this.encodeAsString(t)]:(t.type=t.type===_t.EVENT?_t.BINARY_EVENT:_t.BINARY_ACK,this.encodeAsBinary(t))}},{key:"encodeAsString",value:function(t){var e=""+t.type;return t.type!==_t.BINARY_EVENT&&t.type!==_t.BINARY_ACK||(e+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(e+=t.nsp+","),null!=t.id&&(e+=t.id),null!=t.data&&(e+=JSON.stringify(t.data,this.replacer)),e}},{key:"encodeAsBinary",value:function(t){var e=mt(t),n=this.encodeAsString(e.packet),r=e.buffers;return r.unshift(n),r}}]),t}(),Et=function(n){o(a,n);var i=p(a);function a(t){var n;return e(this,a),(n=i.call(this)).reviver=t,n}return r(a,[{key:"add",value:function(t){var e;if("string"==typeof t)(e=this.decodeString(t)).type===_t.BINARY_EVENT||e.type===_t.BINARY_ACK?(this.reconstructor=new Ot(e),0===e.attachments&&d(s(a.prototype),"emitReserved",this).call(this,"decoded",e)):d(s(a.prototype),"emitReserved",this).call(this,"decoded",e);else{if(!vt(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(e=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,d(s(a.prototype),"emitReserved",this).call(this,"decoded",e))}}},{key:"decodeString",value:function(t){var e=0,n={type:Number(t.charAt(0))};if(void 0===_t[n.type])throw new Error("unknown packet type "+n.type);if(n.type===_t.BINARY_EVENT||n.type===_t.BINARY_ACK){for(var r=e+1;"-"!==t.charAt(++e)&&e!=t.length;);var i=t.substring(r,e);if(i!=Number(i)||"-"!==t.charAt(e))throw new Error("Illegal attachments");n.attachments=Number(i)}if("/"===t.charAt(e+1)){for(var o=e+1;++e;){if(","===t.charAt(e))break;if(e===t.length)break}n.nsp=t.substring(o,e)}else n.nsp="/";var s=t.charAt(e+1);if(""!==s&&Number(s)==s){for(var c=e+1;++e;){var u=t.charAt(e);if(null==u||Number(u)!=u){--e;break}if(e===t.length)break}n.id=Number(t.substring(c,e+1))}if(t.charAt(++e)){var h=this.tryParse(t.substr(e));if(!a.isPayloadValid(n.type,h))throw new Error("invalid payload");n.data=h}return n}},{key:"tryParse",value:function(t){try{return JSON.parse(t,this.reviver)}catch(t){return!1}}},{key:"destroy",value:function(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}],[{key:"isPayloadValid",value:function(e,n){switch(e){case _t.CONNECT:return"object"===t(n);case _t.DISCONNECT:return void 0===n;case _t.CONNECT_ERROR:return"string"==typeof n||"object"===t(n);case _t.EVENT:case _t.BINARY_EVENT:return Array.isArray(n)&&n.length>0;case _t.ACK:case _t.BINARY_ACK:return Array.isArray(n)}}}]),a}(x),Ot=function(){function t(n){e(this,t),this.packet=n,this.buffers=[],this.reconPack=n}return r(t,[{key:"takeBinaryData",value:function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=bt(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),t}(),Rt=Object.freeze({__proto__:null,protocol:5,get PacketType(){return _t},Encoder:At,Decoder:Et});function Tt(t,e,n){return t.on(e,n),function(){t.off(e,n)}}var Ct=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),Bt=function(t){o(i,t);var n=p(i);function i(t,r,o){var s;return e(this,i),(s=n.call(this)).connected=!1,s.receiveBuffer=[],s.sendBuffer=[],s.ids=0,s.acks={},s.flags={},s.io=t,s.nsp=r,o&&o.auth&&(s.auth=o.auth),s.io._autoConnect&&s.open(),s}return r(i,[{key:"disconnected",get:function(){return!this.connected}},{key:"subEvents",value:function(){if(!this.subs){var t=this.io;this.subs=[Tt(t,"open",this.onopen.bind(this)),Tt(t,"packet",this.onpacket.bind(this)),Tt(t,"error",this.onerror.bind(this)),Tt(t,"close",this.onclose.bind(this))]}}},{key:"active",get:function(){return!!this.subs}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.unshift("message"),this.emit.apply(this,e),this}},{key:"emit",value:function(t){if(Ct.hasOwnProperty(t))throw new Error('"'+t+'" is a reserved event name');for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.unshift(t);var i={type:_t.EVENT,data:n,options:{}};if(i.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]){var o=this.ids++,s=n.pop();this._registerAckCallback(o,s),i.id=o}var a=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable,c=this.flags.volatile&&(!a||!this.connected);return c||(this.connected?(this.notifyOutgoingListeners(i),this.packet(i)):this.sendBuffer.push(i)),this.flags={},this}},{key:"_registerAckCallback",value:function(t,e){var n=this,r=this.flags.timeout;if(void 0!==r){var i=this.io.setTimeoutFn((function(){delete n.acks[t];for(var r=0;r<n.sendBuffer.length;r++)n.sendBuffer[r].id===t&&n.sendBuffer.splice(r,1);e.call(n,new Error("operation has timed out"))}),r);this.acks[t]=function(){n.io.clearTimeoutFn(i);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];e.apply(n,[null].concat(r))}}else this.acks[t]=e}},{key:"packet",value:function(t){t.nsp=this.nsp,this.io._packet(t)}},{key:"onopen",value:function(){var t=this;"function"==typeof this.auth?this.auth((function(e){t.packet({type:_t.CONNECT,data:e})})):this.packet({type:_t.CONNECT,data:this.auth})}},{key:"onerror",value:function(t){this.connected||this.emitReserved("connect_error",t)}},{key:"onclose",value:function(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e)}},{key:"onpacket",value:function(t){if(t.nsp===this.nsp)switch(t.type){case _t.CONNECT:if(t.data&&t.data.sid){var e=t.data.sid;this.onconnect(e)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case _t.EVENT:case _t.BINARY_EVENT:this.onevent(t);break;case _t.ACK:case _t.BINARY_ACK:this.onack(t);break;case _t.DISCONNECT:this.ondisconnect();break;case _t.CONNECT_ERROR:this.destroy();var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}}},{key:"onevent",value:function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}},{key:"emitEvent",value:function(t){if(this._anyListeners&&this._anyListeners.length){var e,n=v(this._anyListeners.slice());try{for(n.s();!(e=n.n()).done;){e.value.apply(this,t)}}catch(t){n.e(t)}finally{n.f()}}d(s(i.prototype),"emit",this).apply(this,t)}},{key:"ack",value:function(t){var e=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];e.packet({type:_t.ACK,id:t,data:i})}}}},{key:"onack",value:function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])}},{key:"onconnect",value:function(t){this.id=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect")}},{key:"emitBuffered",value:function(){var t=this;this.receiveBuffer.forEach((function(e){return t.emitEvent(e)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(e){t.notifyOutgoingListeners(e),t.packet(e)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:_t.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(t){return this.flags.compress=t,this}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}},{key:"timeout",value:function(t){return this.flags.timeout=t,this}},{key:"onAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}},{key:"prependAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}},{key:"offAny",value:function(t){if(!this._anyListeners)return this;if(t){for(var e=this._anyListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}},{key:"onAnyOutgoing",value:function(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}},{key:"prependAnyOutgoing",value:function(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}},{key:"offAnyOutgoing",value:function(t){if(!this._anyOutgoingListeners)return this;if(t){for(var e=this._anyOutgoingListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyOutgoingListeners=[];return this}},{key:"listenersAnyOutgoing",value:function(){return this._anyOutgoingListeners||[]}},{key:"notifyOutgoingListeners",value:function(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){var e,n=v(this._anyOutgoingListeners.slice());try{for(n.s();!(e=n.n()).done;){e.value.apply(this,t.data)}}catch(t){n.e(t)}finally{n.f()}}}}]),i}(x);function St(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}St.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},St.prototype.reset=function(){this.attempts=0},St.prototype.setMin=function(t){this.ms=t},St.prototype.setMax=function(t){this.max=t},St.prototype.setJitter=function(t){this.jitter=t};var Nt=function(n){o(s,n);var i=p(s);function s(n,r){var o,a;e(this,s),(o=i.call(this)).nsps={},o.subs=[],n&&"object"===t(n)&&(r=n,n=void 0),(r=r||{}).path=r.path||"/socket.io",o.opts=r,I(f(o),r),o.reconnection(!1!==r.reconnection),o.reconnectionAttempts(r.reconnectionAttempts||1/0),o.reconnectionDelay(r.reconnectionDelay||1e3),o.reconnectionDelayMax(r.reconnectionDelayMax||5e3),o.randomizationFactor(null!==(a=r.randomizationFactor)&&void 0!==a?a:.5),o.backoff=new St({min:o.reconnectionDelay(),max:o.reconnectionDelayMax(),jitter:o.randomizationFactor()}),o.timeout(null==r.timeout?2e4:r.timeout),o._readyState="closed",o.uri=n;var c=r.parser||Rt;return o.encoder=new c.Encoder,o.decoder=new c.Decoder,o._autoConnect=!1!==r.autoConnect,o._autoConnect&&o.open(),o}return r(s,[{key:"reconnection",value:function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}},{key:"reconnectionAttempts",value:function(t){return void 0===t?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}},{key:"reconnectionDelay",value:function(t){var e;return void 0===t?this._reconnectionDelay:(this._reconnectionDelay=t,null===(e=this.backoff)||void 0===e||e.setMin(t),this)}},{key:"randomizationFactor",value:function(t){var e;return void 0===t?this._randomizationFactor:(this._randomizationFactor=t,null===(e=this.backoff)||void 0===e||e.setJitter(t),this)}},{key:"reconnectionDelayMax",value:function(t){var e;return void 0===t?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,null===(e=this.backoff)||void 0===e||e.setMax(t),this)}},{key:"timeout",value:function(t){return arguments.length?(this._timeout=t,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(t){var e=this;if(~this._readyState.indexOf("open"))return this;this.engine=new ft(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var i=Tt(n,"open",(function(){r.onopen(),t&&t()})),o=Tt(n,"error",(function(n){r.cleanup(),r._readyState="closed",e.emitReserved("error",n),t?t(n):r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var s=this._timeout;0===s&&i();var a=this.setTimeoutFn((function(){i(),n.close(),n.emit("error",new Error("timeout"))}),s);this.opts.autoUnref&&a.unref(),this.subs.push((function(){clearTimeout(a)}))}return this.subs.push(i),this.subs.push(o),this}},{key:"connect",value:function(t){return this.open(t)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var t=this.engine;this.subs.push(Tt(t,"ping",this.onping.bind(this)),Tt(t,"data",this.ondata.bind(this)),Tt(t,"error",this.onerror.bind(this)),Tt(t,"close",this.onclose.bind(this)),Tt(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(t){this.decoder.add(t)}},{key:"ondecoded",value:function(t){this.emitReserved("packet",t)}},{key:"onerror",value:function(t){this.emitReserved("error",t)}},{key:"socket",value:function(t,e){var n=this.nsps[t];return n||(n=new Bt(this,t,e),this.nsps[t]=n),n}},{key:"_destroy",value:function(t){for(var e=0,n=Object.keys(this.nsps);e<n.length;e++){var r=n[e];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(t){for(var e=this.encoder.encode(t),n=0;n<e.length;n++)this.engine.write(e[n],t.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(t,e){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var t=this;if(this._reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=this.setTimeoutFn((function(){e.skipReconnect||(t.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open((function(n){n?(e._reconnecting=!1,e.reconnect(),t.emitReserved("reconnect_error",n)):e.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){clearTimeout(r)}))}}},{key:"onreconnect",value:function(){var t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}]),s}(x),xt={};function Lt(e,n){"object"===t(e)&&(n=e,e=void 0);var r,i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,r=t;n=n||"undefined"!=typeof location&&location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==n?n.protocol+"//"+t:"https://"+t),r=ht(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var i=-1!==r.host.indexOf(":")?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+e,r.href=r.protocol+"://"+i+(n&&n.port===r.port?"":":"+r.port),r}(e,(n=n||{}).path||"/socket.io"),o=i.source,s=i.id,a=i.path,c=xt[s]&&a in xt[s].nsps;return n.forceNew||n["force new connection"]||!1===n.multiplex||c?r=new Nt(o,n):(xt[s]||(xt[s]=new Nt(o,n)),r=xt[s]),i.query&&!n.query&&(n.query=i.queryKey),r.socket(i.path,n)}return i(Lt,{Manager:Nt,Socket:Bt,io:Lt,connect:Lt}),Lt}));

class ChromeStorage{
    constructor(name){
        if(typeof name!=='string') throw new Error ('unknown value for a storage key');
        this.name = name;
    }
    async GET() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(this.name, (result) => { resolve(result[this.name]); }); 
        }); 
    }
    async SET(db) {
        return new Promise((resolve, reject) => {
            const obj = {};
            obj[this.name]=db;
            chrome.storage.local.set(obj, function() {resolve(db)});
        });
    }
}
class ChromeStorageDB{
    constructor({name,attributes}){
        let storageSetup =  this.#constructionCheck({name,attributes});
        /*db name (a string)*/
        this.name = storageSetup.name;
        /*
        attributes has 5 parameter
        type: ('string','number','boolean') -defalut 'number' 
        autoIncrement: (true,false) - default false
        primaryKey: (true,false) - default false
        allowNull: (true,false) - default false
        default: ('string','number','boolean',null) - default null
        */
        this.attributes = storageSetup.attributes;
    }   
    #constructionCheck({name,attributes}){
        if(!name) throw new Error ('storage must have a name value(string)');
        if(!attributes) throw new Error ('storage must have some attributes(object)');

        let attributeKeys = Object.keys(attributes);
        if(attributeKeys.length == 0) throw new Error ('attributes must have 1 or more keys');
        /* if(attributeKeys.length != [...new Set(attributeKeys)].length) throw new Error ('each attribute must be unique')*/
        for(let i=0;i<attributeKeys.length;i++){
            let attribute = attributes[attributeKeys[i]];
            if(typeof attribute.type == 'undefined') attribute.type = 'number';
            if(typeof attribute.autoIncrement == 'undefined') attribute.autoIncrement = false;
            if(typeof attribute.primaryKey == 'undefined') attribute.primaryKey = false;
            if(typeof attribute.allowNull == 'undefined') attribute.allowNull = false;
            if(typeof attribute.default == 'undefined') attribute.default = null;
            
            if(!(attribute.type=='number' || attribute.type=='boolean' || attribute.type=='string' /*|| attribute.type=='object' || attribute.type=='array'*/)) throw new Error ('unknown attribute type')
            if(!(attribute.autoIncrement === true || attribute.autoIncrement === false)) throw new Error ('unknown value for autoIncrement');
            if(!(attribute.primaryKey === true || attribute.primaryKey === false)) throw new Error ('unknown value for primaryKey');
            if(!(attribute.allowNull === true || attribute.allowNull === false)) throw new Error ('unknown value for allowNull');
            
            if(attribute.type!='number' && attribute.autoIncrement) throw new Error('autoIncrement is only for number data type');
            if(attribute.primaryKey && attribute.default!=null) throw new Error('primaryKey with default value is not possible');

            if(attribute.default!=null && typeof attribute.default != attribute.type) throw new Error('default value should be equal to key type')
        }
        return {name,attributes};
    }
    async #build(){
        let thisDB = await this.#getDB();
        if(typeof thisDB!='object' || !Array.isArray(thisDB)) {
            await this.#setDB([]);
            thisDB = await this.#getDB();
        }
    }
    async #getDB() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(this.name, (result) => { resolve(result[this.name]); }); 
        }); 
    }
    async #setDB(db) {
        return new Promise((resolve, reject) => {
            let obj = {};
            obj[this.name]=db;
            chrome.storage.local.set(obj, function() {resolve(true)});
        });
    }
    #POSTCheck = (row) => {
        if(typeof row !='object' && Array.isArray(row)) throw new Error ('New row is not enough to get entried');
        if(!row) throw new Error('Row is just empty');
        let rowKeys = Object.keys(row);
        if(!rowKeys.length) throw new Error('Row is  empty');

        let attributes = this.attributes;
        let attributesKeys = Object.keys(attributes);
        for(let i=0;i<attributesKeys.length;i++){
            let attribute = attributes[attributesKeys[i]];
            if(!attribute.autoIncrement){
                if(typeof(row[attributesKeys[i]])!=attribute.type || typeof(row[attributesKeys[i]])=='undefined'){
                    if(typeof(row[attributesKeys[i]])!='undefined') throw new Error (`wrong data type for '${attributesKeys[i]}' key`);
                    if(attribute.primaryKey) throw new Error (`Primary key '${attributesKeys[i]}' must be a valid data`);
                    if(attribute.default==null && !attribute.allowNull) throw new Error (`No valid data provided for '${attributesKeys[i]}' key`);
                    row[attributesKeys[i]] = attribute.default;
                }
            }
        }
        return row;
    }
    async POST(row){
        await this.#build();
        let db = await this.#getDB();
        row = this.#POSTCheck(row);
        let attributes = this.attributes;
        let attributesKeys = Object.keys(attributes);
        for(let i=0;i<attributesKeys.length;i++){
            let attribute = attributes[attributesKeys[i]];
            if(attribute.autoIncrement){
                row[attributesKeys[i]] = 1;
                if(db.length!=0){
                    row[attributesKeys[i]] = (db[db.length-1].id)+1;
                }
            }
            if(attribute.primaryKey){
                if(db.find( data => {return data[attributesKeys[i]] === row[attributesKeys[i]]} ) != undefined)
                throw new Error (`primaryKey '${attributesKeys[i]}' value is not unique`);
                // console.log(`primaryKey '${attributesKeys[i]}' value is not unique`);
            }
        }
        db.push(row);
        await this.#setDB(db);
        return db;
    }
    async GET(where){
        await this.#build();
        where = this.#WHERECheck(where);
        const db = await this.#getDB();
        if(where==null) return db; 
        return this.#whereReturn({db,where,logic:true})
    }
    async DELETE(where){
        await this.#build();
        where = this.#WHERECheck(where);
        if(where==null) return 0;
        const db = await this.#getDB();
        const results = this.#whereReturn({db,where,logic:false});
        await this.#setDB(results);
        return results;
    }
    #WHERECheck(where){
        if(where===undefined) return null;

        if(where!=null)
            if(typeof where!='object' || Array.isArray(where))
                throw new Error('where key got unexpected value');
        let whereKeys = Object.keys(where);
        if(whereKeys.length==0) return null;
        let attributes = this.attributes;
        let attributeKeys = Object.keys(attributes);
        for(let i=0;i<whereKeys.length;i++){
            let whereKeyValues = where[whereKeys[i]];
            if(!attributeKeys.includes(whereKeys[i]))
                throw new Error('where key got keys that are not availabale on attribute keys.');
            if(!whereKeyValues)
                throw new Error('you must be valid object as where key value');
            if(!Array.isArray(whereKeyValues))
                throw new Error('where key value got unexpected value');
            if(whereKeyValues.length==0)
                throw new Error('where key value atleast need one item');
            whereKeyValues.forEach(whereKeyValue => {
                let whereKeyValueKeys = Object.keys(whereKeyValue);
                if(whereKeyValueKeys.length!=2)
                    throw new Error('where key value keys must have 2 key');
                if(typeof whereKeyValue.operation != 'string')
                    throw new Error('opeartion value must be string');
                if(typeof whereKeyValue.value != attributes[whereKeys[i]].type)
                    throw new Error('value type must match');   
            });
        }
        return where;
    }

    #SETCheck(set){
        if(set===undefined || set===null) return null;
        if(set!=null)
            if(typeof set!='object' || Array.isArray(set))
                throw new Error('set key got invalid value');
        const setKeys = Object.keys(set);
        if(setKeys.length==0) throw new Error('must have 1 or more keys in set');
        
        const attributes = this.attributes;
        const attributeKeys = Object.keys(attributes);
        for(let i=0;i<setKeys.length;i++){
            const setKey = setKeys[i];
            if(!attributeKeys.includes(setKeys) && typeof set[setKey] != attributes[setKey].type) 
               throw new Error('set keys value is not defined as key value'); 
            if(attributes[setKey].autoIncrement) throw new Error('autoIncrement should not be changed');
            if(attributes[setKey].primaryKey) throw new Error('primaryKey should not be changed');
        }
        return set;     
    }
    #whereReturn({db,where,logic,hook}){
        if(typeof logic !='boolean') throw new Error('there must be a boolean logic value');
        if(hook == undefined) hook = null;
        const dbLength = db.length;
        let result = [];
        for(let j=0;j<dbLength;j++){
            let row = db[j];
            const whereKeys = Object.keys(where);
            let interKey = true;
            for(let i=0; i<whereKeys.length;i++){
                const whereKey = whereKeys[i];
                const whereKeyValues = where[whereKey];
                let intraKey = false;
                for(let k=0;k<whereKeyValues.length;k++){
                    const operation = whereKeyValues[k].operation;
                    const value = whereKeyValues[k].value;
                    switch(operation){
                        case 'equal':
                            intraKey = intraKey || row[whereKey]===value;
                        break;
                        case 'notEqual':
                            intraKey = intraKey || row[whereKey]!==value;
                        break;
                        default:
                            throw new Error('invalid operation')
                        break;
                    }
                }
                interKey = interKey && intraKey;
            }
            if((interKey && logic) || (!interKey && !logic)){
                if(hook===null){
                    result.push(row);
                }else{
                    row = hook(row);
                }  
            }           
        }
        if(hook===null) return result; else return db;
    }
    async PUT({set,where}){
        await this.#build();
        where = this.#WHERECheck(where);
        set = this.#SETCheck(set);
        if(where==null) return 0;
        let db = await this.#getDB();
        const hook = (row)=>{
            const setKeys = Object.keys(set);
            const setValues = Object.values(set);
            for(let i=0;i<setKeys.length;i++){
                row[setKeys[i]] = setValues[i];
            }
            return row;
        }
        db = this.#whereReturn({db,where,logic:true,hook});
        
        await this.#setDB(db);
        return db;
    }
}

const essentials = {
    sleep: (ms)=>{
        return new Promise(resolve=>{
            setTimeout(resolve, ms);
        });
    }
}
const mondayFetch = async (query) => {
    const metaInformationDB = new ChromeStorage('metaInformation'); 
    const metaInformation = await metaInformationDB.GET();
    const mondayResponse = await fetch (
        `https://api.monday.com/v2`,
        {
            cache: "no-cache",
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': metaInformation.defaultAPI
            },
            body: JSON.stringify({query})
        }
    );
    return mondayResponse;
}
const fixedData = {
    metaInformation: {
        deviceId:{
            title: 'Device Id',
            type: 'text',
            defaultValue: '1-1',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        extensionSwitch:{
            title: 'Extension Switch',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: true,
        },
        skipSendingNewMessages:{
            title: 'Skip Sending New Messages',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: false,
        },
        debugModeSwitch:{
            title: 'Debug Switch',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: false,
        },
        hourlyMessageLimit:{
            title: 'Hourly Message Limit',
            type: 'number',
            defaultValue: 3,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        hourlyNewMessageLimit:{
            title: 'Hourly New Message Limit',
            type: 'number',
            defaultValue: 3,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        hourlyReplyMessageLimit:{
            title: 'Hourly Reply Message Limit',
            type: 'number',
            defaultValue: 3,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        readMessageLimitCount:{
            title: 'Read Message Limit Count',
            type: 'number',
            defaultValue: 10,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        checkMessageDaysLimit:{
            title: 'Check message days limit',
            type: 'number',
            defaultValue: 3,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        messagingStartTime:{
            title: 'Messaging Start Time(24 HOURS)',
            type: 'number',
            defaultValue: 8,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        messagingEndTime:{
            title: 'Messaging End Time(24 HOURS)',
            type: 'number',
            defaultValue: 19,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        defaultAPI:{
            title: 'Default API',
            type: 'text',
            defaultValue: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3MjU1MTMxNiwidWlkIjozMDI3MzE5NCwiaWFkIjoiMjAyMi0wNy0yN1QyMzowMzowNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg0NzExMCwicmduIjoidXNlMSJ9.OsVnuCUSnm-FF21sjAND10cWEKN9-UIqIkNx6Rz8Bfo',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        domain:{
            title: 'Domain',
            type: 'text',
            defaultValue: 'https://xentola.com',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        accountEmail:{
            title: 'Account Email',
            type: 'text',
            defaultValue: '',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        accountPassword:{
            title: 'Account Password',
            type: 'text',
            defaultValue: '',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },

    },
    workingUrls:{
        messages: 'https://m.facebook.com/messages/?folder=unread',
        home: 'https://m.facebook.com/?tbua=1',
        itemSuffix: 'https://m.facebook.com/marketplace/item/',
        unknownMessageSuffix: 'https://m.facebook.com/messages/read/?tid=cid.g.',
        sellerMessageSuffix: 'https://m.facebook.com/marketplace/message_seller/',
    },
    workingSelectors:{
        messages:{
            allMessages: '[href^="/messages/read/?tid=cid.g."]',
            moreMessagesButton: '[href^="/messages/?pageNum"]',
            unseenMessages: `.${'_55wp _7om2 _5b6o _67iu _67ix _2ycx aclb del_area async_del abb touchable _592p _25mv'.split(' ').join('.')}`,
            timeStamp : '[data-sigil="timestamp"]',
        },
        newMessage:{
            messageInput: 'form [name="message"]',
            sendButton: '[type="submit"][value="Send"]',
            seeConversationButton: '[type="submit"][value="See Conversation"]',
            askForDetailsButton: '[type="submit"][value="Ask for Details"]',
        },
        content:{
            console: 'CONTENT_CONSOLE',
        },
        readMessage:{
            postUrl : 'a[href^="/marketplace/item/"]',
            olderMessage : '[href^="/messages/read/?tid=cid.g."]',
            SingleMessages : '.msg [data-sigil="message-text"]',
            messageDataHolder: ':scope > span,.messageAttachments',
            neutralMessages : '.msg .fcg',
        },
        sendUnsentMessage:{
            sold: `.${'_a58 _9_7 _2rgt _1j-g _2rgt'.split(' ').join('.')}`,
            messageInput: 'form [name="message"]',
            sendButton: 'button[type="submit"][value="Send"]',
        }
    },
    limits:{
        loadMessages: 10,
        // lastUnreadMesaage: (86400*3),
    },
    mondayFetch:{
        appraisalCounterBoard : 1255820475,
        borEffortBoardId : 1250230293,
        systemArchiveBoardId : 3353179014,
        myAccountId : 30273194,
        columnValuesIds:{
            borEffortBoard:{
                person : 'person',
                url: 'text7',
                status: 'status',
                date: 'date4',
                fbCode: 'text84',
                vin: 'text6',
            },
            appraisalCounterBoard:{
                status: 'status',
            },
            systemArchiveBoard:{
                status: 'status',
            }

        },
        statuses: {
            borEffortBoard:{
                unVerified: 5,
                verified: 1,
                bad: 4,
                verifiedWithVin: 17,
            }
        }
    },
    
};
const contentScripts = {
    accountInfo : async()=>{
        const accountInfoDB = new ChromeStorage('accountInfo');
        let id = '';
        let name = '';
        try{
            const infos = JSON.parse(document.body.textContent.match(/{"ACCOUNT_ID":.+?}/)[0]);
            id = infos.ACCOUNT_ID;
            name = infos.NAME;
            await accountInfoDB.SET({id, name});
        }catch(e){
            const infos = await accountInfoDB.GET();
            id = infos.id;
            name = infos.name;
        }

        return {id, name};
    },
    isUserLoggedIn: ()=>{
        // return getCookie('c_user')==''?false:true;
        let result = '';
        let name = 'c_user' + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                result = c.substring(name.length, c.length);
            }
        }
        return result==''?false:true;
    },
    isProgramReady: async()=>{
        let values = await new ChromeStorage('metaInformation').GET();
        values = values==null?{}:values;
        const metas = fixedData.metaInformation;
        const metaKeys = Object.keys(metas);
        for(let i=0;i<metaKeys.length;i++){
            const metaKey = metaKeys[i];
            const meta = metas[metaKey];
            if(meta.requiredToStart){
                if(values[metaKey]===undefined || values[metaKey]===false){
                    console.log('meta not found', metaKey,values[metaKey]);
                    return false;
                }
            }
        }
        return true;
    },
    setupConsoleBoard: ()=>{
        const consoleBoard = document.createElement('div');
        consoleBoard.id = fixedData.workingSelectors.content.console;
        dragElement(consoleBoard);
        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
            elmnt.onmousedown = dragMouseDown;
            }
        
            function dragMouseDown(e) {
            e = e || window.event;
            // e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            }
        
            function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        
            function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            }
        }
        document.body.appendChild(consoleBoard);
    },
    showDataOnConsole: (data)=>{
        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        const content = document.createElement('div');
        content.classList.add('font-sub');
        content.innerText = data;
        consoleBoard.appendChild(content);
        console.log(data);
    },
    pageRedirection: async (url,message)=>{
        // show data on console
        contentScripts.showDataOnConsole('Redirection:'+url);
        contentScripts.showDataOnConsole('Message:'+message);
        const redirectionMessagesDB = new ChromeStorage('redirectionMessages');
        const isRedirectionAllowed = async (message)=>{
            let messages = await redirectionMessagesDB.GET();
            if(messages!=null){
                messages.unshift(message);
                messages = messages.slice(0,10);
                await redirectionMessagesDB.SET(messages);
                if(messages.length>5){
                    if(messages[0]==message && messages[1]==message && messages[2]==message && messages[3]==message && messages[4]==message ){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }else{
                await redirectionMessagesDB.SET([`${message}`]);
                return true;
            }
        }
        if(await isRedirectionAllowed(message)){
            const metaInformationDB = new ChromeStorage('metaInformation');
            const metaInformation = await metaInformationDB.GET();
            const debugModeSwitch = metaInformation.debugModeSwitch;
            if(debugModeSwitch){
                const redirectButton = document.createElement('button');
                redirectButton.innerText = 'Redirect';
                redirectButton.onclick = ()=>{
                    window.location.href = url;
                }
                const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                consoleBoard.appendChild(redirectButton);
            }else{
                window.location.href = url;
            }
            
        }else{
            const messages = await redirectionMessagesDB.GET();
            for(let i=0;i<messages.length;i++){
                contentScripts.showDataOnConsole(messages[i]);
            }
            const button = document.createElement('button');
            button.innerText = 'Continue or Try again';
            button.onclick = ()=>{
                redirectionMessagesDB.SET([]);
                contentScripts.showDataOnConsole("Error data cleared");
                contentScripts.pageRedirection(url,message);
            }
            const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
            consoleBoard.appendChild(button);
        }
    },
    getItemIdByMessageId: async (fb_message_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const itemIdDataJSON = await fetch(`${domain}/extension/getItemIdByMessageId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_message_id: `${fb_message_id}`})
        });
        const itemIdData = await itemIdDataJSON.json();
        return itemIdData.item_id;
    },
    markItemAsLinkGone: async (item_id)=>{
        console.log('marking item as link gone');
        if(item_id){
            const query = `
                query{
                    items(ids: [${item_id}]){
                        board{
                            id
                        }
                    }
                }
            `;
            const boardDataJSON = await mondayFetch(query);
            const boardData = await boardDataJSON.json();
            const boardId = boardData.data.items[0].board.id;
            if(boardId==fixedData.mondayFetch.borEffortBoardId || boardId==fixedData.mondayFetch.appraisalCounterBoard){
                const columnId = boardId==fixedData.mondayFetch.borEffortBoardId?fixedData.mondayFetch.columnValuesIds.borEffortBoard.status:fixedData.mondayFetch.columnValuesIds.appraisalCounterBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "Link Gone") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await mondayFetch(query);
                const itemData = await itemDataJSON.json();
                const query1 = `
                    mutation {
                        archive_item(item_id: ${item_id}) {
                            id
                        }
                    }
                `;
                const itemDataJSON1 = await mondayFetch(query1);
                const itemData1 = await itemDataJSON1.json();
            }
            const metaInformationDB = new ChromeStorage('metaInformation');
            const metaInfromation = await metaInformationDB.GET();
            
            const serverLinkGoneUpdate = await fetch(`${metaInfromation.domain}/extension/serverLinkGoneUpdate`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_id: `${item_id}`,
                    fb_id: `${(await contentScripts.accountInfo()).fb_id}`
                })
            });
        }
    },
    markItemAsSecondMessage: async (item_id)=>{
        console.log('marking item as second message');
        if(item_id){
            const query = `
                query{
                    items(ids: [${item_id}]){
                        board{
                            id
                        }
                    }
                }
            `;
            const boardDataJSON = await mondayFetch(query);
            const boardData = await boardDataJSON.json();
            const boardId = boardData.data.items[0].board.id;
            if(boardId==fixedData.mondayFetch.borEffortBoardId){
                const columnId = fixedData.mondayFetch.columnValuesIds.borEffortBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "2nd 1st Msg") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await mondayFetch(query);
                const itemData = await itemDataJSON.json();
            }
        }
    },
    readCurrentMessage: async ()=>{
        contentScripts.showDataOnConsole('Reading current message');
        const accountInfo = await contentScripts.accountInfo();
        const messageData = [];
        let messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
        for(let i=0;i<messages.length;i++){
            messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
            let message = messages[i];
            const messageInfo = JSON.parse(message.getAttribute('data-store'));
            const timestamp = messageInfo.timestamp;
            const sent_from = (messageInfo.author==accountInfo.id || messageInfo.author==accountInfo.name)?'me':'seller';
            const text = message.querySelector(':scope > span');
            let attachment = message.querySelector(':scope > div');
            if(text.children.length!=0){
                const textData = {
                    type: 'text',
                    sent_from,
                    message: text.innerText,
                    timestamp,
                    fb_id: accountInfo.id,
                    status: 'done'
                }
                messageData.push(textData);
            }
            if(attachment.children.length !=0){
                messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
                message = messages[i];
                attachment = message.querySelector(':scope > div');
                let images = attachment.querySelectorAll('img,i');
                for(let j=0;j<images.length;j++){
                    await essentials.sleep(1000);
                    messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
                    message = messages[i];
                    attachment = message.querySelector(':scope > div');
                    images = attachment.querySelectorAll('img,i');
                    const image = images[j];
                    const tagName = image.tagName.toLowerCase();
                    let imageSrc = '';
                    if(tagName=='img'){
                        imageSrc = image.src;
                    }else{
                        imageSrc = image.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
                    }
                    console.log(image);
                    const attachmentLink = image.closest('.msg').querySelector('a');
                    let url = '';
                    let fileType = '';
                    if(attachmentLink){
                        const onpageUrl = attachmentLink.getAttribute('href');
                        if(onpageUrl.includes("https://") && !onpageUrl.includes("https://facebook.com")){
                            url = onpageUrl;
                            fileType = 'link';
                        }else{
                            url = await contentScripts.retrieveAttachementUrl(document.querySelector(`[href="${onpageUrl}"]`));
                            fileType = contentScripts.getFileTypeFromUrl(url);
                        }
                    }else{
                        url = imageSrc;
                        fileType = contentScripts.getFileTypeFromUrl(url);
                    }
                    
                    console.log(imageSrc)
                    const imageData = {
                        type: fileType,
                        sent_from,
                        message: url,
                        timestamp,
                        fb_id: accountInfo.id,
                        status: 'done'
                    }
                    messageData.push(imageData);

                    // const imageData = {
                    //     type: 'image',
                    //     sent_from,
                    //     message: imageSrc,
                    //     timestamp,
                    //     fb_id: accountInfo.id,
                    //     status: 'done'
                    // }
                    // messageData.push(imageData);
                }
            }
        }
        return messageData;
    },
    getFileTypeFromUrl: (url)=>{
        url = new URL(url);
        const path = url.pathname;
        const urlData = path.split('.');
        const type = urlData[urlData.length-1];
        const imageTypes = ['jpg','jpeg','png','gif','bmp','svg','webp'];
        if(imageTypes.includes(type)){
            return 'image';
        }else{
            return 'file';
        }
    },
    retrieveAttachementUrl: async (image)=>{
        image.click();
        let url = '';
        while(true){
            await essentials.sleep(5000);
            contentScripts.showDataOnConsole('Waiting for image to load');
            if(window.location.href.includes('https://m.facebook.com/messages/attachment_preview') || window.location.href.includes('https://m.facebook.com/messages/attachment_confirm')){
                const attachmentLinks = [...document.querySelectorAll('a')].filter((a)=>a.innerText=='Download'||a.innerText=='Open');
                const closeLinks = [...document.querySelectorAll('a')].filter((a)=>a.innerText=='Close'||a.innerText=='Cancel');
                if(attachmentLinks.length==1 && closeLinks.length!=0){
                    url = attachmentLinks[0].href;
                    closeLinks[closeLinks.length-1].click();
                    break;
                }
            }else{
                contentScripts.showDataOnConsole('Waiting for page to load');
            }
        }
        while(true){
            await essentials.sleep(5000);
            contentScripts.showDataOnConsole('Waiting for image to close');
            if(window.location.href.includes('https://m.facebook.com/messages/read/')){
                break;
            }
        }
        return url;
    },
    sendMessagesToServer: async (messageData)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const messageDataJSON = await fetch(`${domain}/extension/sendMessagesToServer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({messageData})
        });
        const messageDataResponse = await messageDataJSON.json();
        if(messageDataResponse.restored){
            if(messageData.length>0){
                const item_id = messageData[0].item_id;
                const query = `
                    query{
                        items(ids: [${item_id}]){
                            board{
                                id
                            }
                        }
                    }
                `;
                const boardDataJSON = await mondayFetch(query);
                const boardData = await boardDataJSON.json();
                const boardId = boardData.data.items[0].board.id;
                if(boardId==fixedData.mondayFetch.systemArchiveBoardId){
                    const columnId = fixedData.mondayFetch.columnValuesIds.systemArchiveBoard.status;
                    const query = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${item_id}, 
                                board_id: ${boardId}, 
                                column_id: "${columnId}", 
                                value: "Restored") {
                                id
                            }
                        }
                    `;
                    try{
                        const itemDataJSON = await mondayFetch(query);
                        const itemData = await itemDataJSON.json();
                        const itemId = itemData.data.change_simple_column_value.id;
                    }catch(e){
                        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                        const removeLeadButton  = document.createElement('button');
                        removeLeadButton.innerText = 'Remove Lead';
                        removeLeadButton.onclick = async ()=>{
                            await contentScripts.markItemAsLinkGone(item_id);
                        };
                        consoleBoard.appendChild(removeLeadButton);
                    }
                    
                }
            }
        }
        return messageDataResponse;
    },
    isCurrentMessageValid: ()=>{
        // "You named the conversation"
        // "You changed the conversation picture"
        // "waiting for your response about this listing"
        // "changed the listing title"
        // "reduced the price"
        // "changed the listing description"
        // "left the group"
        // " sold "
        // "removed the item from Marketplace"
        const invalidIndicators = [
            "left the group",
            "removed the item from Marketplace",
            " sold ",
        ]
        const neutralMessages = document.querySelectorAll(fixedData.workingSelectors.readMessage.neutralMessages);
        for(let i=0;i<neutralMessages.length;i++){
            const neutralMessage = neutralMessages[i];
            const message = neutralMessage.innerText;
            // console.log(message);
            for(let j=0;j<invalidIndicators.length;j++){
                const indicator = invalidIndicators[j];
                if(message.includes(indicator)){
                    return false;
                }
            }
        }
        return true;
    },
    lastMessageOnServerByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const itemLastMessageDataJSON = await fetch(`${metaInfromation.domain}/extension/lastMessageOnServerByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
        });
        const itemLastMessageData = await itemLastMessageDataJSON.json();
        return itemLastMessageData.message;
    },
    itemIdByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const itemIdDataJSON = await fetch(`${metaInfromation.domain}/extension/itemIdByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
        });
        const itemIdData = await itemIdDataJSON.json();
        return itemIdData.item_id;
    },
    postIdByItemId: async (item_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const postIdDataJSON = await fetch(`${metaInfromation.domain}/extension/postIdByItemId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item_id: `${item_id}`})
        });
        const postIdData = await postIdDataJSON.json();
        return postIdData.fb_post_id;
    },
    isValidTimeToSendFirstMessage:  async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const firstMessageTimeDB = new ChromeStorage('firstMessageTime');
        const metaInfromation = await metaInformationDB.GET();
        const messagingStartHour = metaInfromation.messagingStartTime;
        const messagingEndHour = metaInfromation.messagingEndTime;  
        const time = new Date().getTime()/1000;

        const americanHour = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
        const hourlyMessageLimit = metaInfromation.hourlyMessageLimit;
        const minimumDuration = 3600/hourlyMessageLimit;
        const firstMessageTime = (await firstMessageTimeDB.GET()) || 0;
        console.log('firstMessageTime',minimumDuration-(time-firstMessageTime));
        if(americanHour>=messagingStartHour && americanHour<=messagingEndHour){
            if(time-firstMessageTime>=minimumDuration){
                return {
                    status: true,
                    waitingTime: 0
                };
            }else{
                return {
                    status: true,
                    waitingTime: minimumDuration-(time-firstMessageTime)
                };
            }
        }else{
            return {
                status: false,
                waitingTime: 60*5
            };
        }
    },
    isValidTimeToSendUnsentMessage: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const messagingStartHour = metaInfromation.messagingStartTime;
        const messagingEndHour = metaInfromation.messagingEndTime;  

        const americanHour = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
        return (americanHour>=messagingStartHour && americanHour<=messagingEndHour);
    },
    getUnsentMessagePostIds : async ()=>{
        const fb_id = (await contentScripts.accountInfo()).id;
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const unsentMessagesDataJSON = await fetch(`${domain}/extension/getUnsentMessagePostIds`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id: `${fb_id}`})
        });
        const unsentMessagesData = await unsentMessagesDataJSON.json();
        return unsentMessagesData.post_ids;
    },
    getUnsentMessagesByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const unsentMessagesDataJSON = await fetch(`${domain}/extension/getUnsentMessagesByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
        });
        const unsentMessagesData = await unsentMessagesDataJSON.json();
        return unsentMessagesData.messages;
    },
    isValidMessageInSellerMessage: ()=>{
        // "left the group"
        // "Sold"
        // "removed the item from Marketplace"
        const error = document.body.innerText.includes('Sorry, something went wrong');
        const removed = document.body.innerText.includes('removed the item from Marketplace');
        const soldHolder = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sold);
        let sold = false;
        if(soldHolder){
            sold = soldHolder.innerText.includes('Sold');
        }
        console.log(`error: ${error}, removed: ${removed}, sold: ${sold}`);
        return !(error || removed || sold);
    },
    markMessageAsSent: async ( messageId)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const markMessageAsSentJSON = await fetch(`${domain}/extension/markMessageAsSent`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message_id:`${messageId}`})
        });
        const markMessageAsSent = await markMessageAsSentJSON.json();
        return markMessageAsSent;
    },
    markItemMessagesdone: async (itemId)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const markItemMessagesdoneJSON = await fetch(`${domain}/extension/markItemMessagesdone`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item_id:`${itemId}`})
        });
        const markItemMessagesdone = await markItemMessagesdoneJSON.json();
        return markItemMessagesdone;
    },
    waitWithVisual: async (waitingTime)=>{
        waitingTime = parseInt(waitingTime);
        let stopTimer = false;
        const timer = document.createElement('div');
        timer.classList.add('font-header');
        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        consoleBoard.replaceChildren(timer);
        const stopButton = document.createElement('button');
        stopButton.innerText = 'Stop';
        stopButton.classList.add('btn','btn-danger','btn-sm');
        stopButton.addEventListener('click',()=>{
            stopTimer = true;
        }); 
        consoleBoard.appendChild(stopButton);
        for(let i = waitingTime;i>=0;i--){
            timer.innerText = `Waiting for ${i} seconds`;
            await essentials.sleep(1000);
            if(stopTimer){
                break;
            }
        }
    },
    hasRepliesToSend: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const hasRepliesToSendJSON = await fetch(`${domain}/extension/hasRepliesToSend`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`})
        });
        const hasRepliesToSend = await hasRepliesToSendJSON.json();
        return hasRepliesToSend;
    },
    hasUnsentFirstMessage: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const hasUnsentFirstMessageJSON = await fetch(`${domain}/extension/hasUnsentFirstMessage`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`})
        });
        const hasUnsentFirstMessage = await hasUnsentFirstMessageJSON.json();
        return hasUnsentFirstMessage;
    },
    hasNewRawItem: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const hasNewRawItemJSON = await fetch(`${domain}/extension/hasNewRawItem`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const hasNewRawItem = await hasNewRawItemJSON.json();
        return hasNewRawItem;
    },
    hasSecondMessageToSend: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const hasSecondMessageToSendJSON = await fetch(`${domain}/extension/hasSecondMessageToSend`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`})
        });
        const hasSecondMessageToSend = await hasSecondMessageToSendJSON.json();
        return hasSecondMessageToSend;
    },
    setSecondMessage: async (item_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const setSecondMessageJSON = await fetch(`${domain}/extension/setSecondMessage`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`,item_id:`${item_id}`})
        });
        const setSecondMessage = await setSecondMessageJSON.json();
        return setSecondMessage;
    },
    updateFirstMessageTime: async()=>{
        const firstMessageTimeDB = new ChromeStorage('firstMessageTime');
        await firstMessageTimeDB.SET(new Date().getTime()/1000);
    },
    sendNewSellerMessage: async ()=>{ 
        const sendNewSellerMessageDB = new ChromeStorage('sendNewSellerMessage');
        const sendNewSellerMessage = await sendNewSellerMessageDB.GET();
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInformation = await new ChromeStorage('metaInformation').GET();
        const skipSendingNewMessages = metaInformation.skipSendingNewMessages;
        if(skipSendingNewMessages){
            await sendNewSellerMessageDB.SET(null);
            await workingStepDB.SET('collectUnseenMessage');
            contentScripts.pageRedirection(fixedData.workingUrls.messages,'skipping sending new messages');
            return;
        }
        // else{
        //     const hasRepliesToSend = await contentScripts.hasRepliesToSend();
        //     const hasSecondMessageToSend = await contentScripts.hasSecondMessageToSend();
        //     // if(hasRepliesToSend.status || hasSecondMessageToSend.status){
        //     if(hasRepliesToSend.status){
        //         await sendNewSellerMessageDB.SET(null);
        //         await workingStepDB.SET('collectUnseenMessage');
        //         contentScripts.pageRedirection(fixedData.workingUrls.messages,'has replies or second message to send');
        //         return;
        //     }
        // }

        if(sendNewSellerMessage==null){
            const domain = metaInformation.domain;
            const newPostJSON = await fetch(`${domain}/extension/newPostId`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fb_id: `${(await contentScripts.accountInfo()).id}`,
                    fb_user_name: `${(await contentScripts.accountInfo()).name}`
                })
            });
            if(newPostJSON.status==200){
                const newPost = await newPostJSON.json();
                newPost.has_unsent_message = true;
                await sendNewSellerMessageDB.SET(newPost);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'New Post to message');
            }else if(newPostJSON.status==201){
                contentScripts.showDataOnConsole((await newPostJSON.json()).message)
            }
            else{
                contentScripts.showDataOnConsole('No raw Item to work With');
                await contentScripts.waitWithVisual(60*5);
                await sendNewSellerMessageDB.SET(null);
                await workingStepDB.SET('collectUnseenMessage');               
                contentScripts.pageRedirection(fixedData.workingUrls.messages,'No raw Item to work With');
            }
        }else{
            if(sendNewSellerMessage.fb_post_id){
                contentScripts.showDataOnConsole('fb post id collected');
                await essentials.sleep(5000); 
                // const markAsLinkGone = async ()=>{
                //     contentScripts.showDataOnConsole('marking as "Link Gone"');
                //     const query1 = `
                //         mutation {
                //             change_simple_column_value(
                //                 item_id: ${sendNewSellerMessage.item_id}, 
                //                 board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                //                 column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                //                 value: "Link Gone") {
                //                 id
                //             }
                //         }
                //     `;
                //     try{
                //         const LinkGoneDataJSON = await mondayFetch(query1);
                        
                //         const LinkGoneData = await LinkGoneDataJSON.json();
                        
                //         await sendNewSellerMessageDB.SET(null);               
                //         contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                //     }catch(e){
                //         contentScripts.showDataOnConsole('Error marking as "Link Gone"');
                //     }
                // }
                const markAsFirstMessage = async (message)=>{
                    contentScripts.showDataOnConsole('marking as "First Message"');
                    
                    const query = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${sendNewSellerMessage.item_id}, 
                                board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                                value: "1st MSG") {
                                id
                            }
                        }
                    `;
                    const formatDateToMondayAmerican = ()=>{
                        const americanTime = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
                        let month = '' + (americanTime.getMonth() + 1);
                        let day = '' + americanTime.getDate();
                        let year = americanTime.getFullYear();
                    
                        if (month.length < 2) 
                            month = '0' + month;
                        if (day.length < 2) 
                            day = '0' + day;
                    
                        return [year, month, day].join('-');
                    }
                    const query2 = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${sendNewSellerMessage.item_id}, 
                                board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.date}", 
                                value: "${formatDateToMondayAmerican()}") {
                                id
                            }
                        }
                    `;
                    try{
                        const firstMessageDataJSON = await mondayFetch(query);
                        const dateDataJSON = await mondayFetch(query2);
                        const dateData = await dateDataJSON.json();
                        const firstMessageData = await firstMessageDataJSON.json();
                        const metaInformation = await metaInformationDB.GET();
                        const domain = metaInformation.domain;
                        const saveFirstMessageActionJSON = await fetch(`${domain}/extension/saveFirstMessageAction`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                item_id: `${sendNewSellerMessage.item_id}`,
                                fb_post_id: `${sendNewSellerMessage.fb_post_id}`,
                                fb_id: `${(await contentScripts.accountInfo()).id}`,
                                fb_user_name: `${(await contentScripts.accountInfo()).name}`,
                                messageText: message
                            })
                        });
                        if(saveFirstMessageActionJSON.status==200){
                            await contentScripts.messageCountEligible(true);
                            console.log('first message action saved');
                            await sendNewSellerMessageDB.SET(null);       
                            await workingStepDB.SET('collectUnseenMessage');
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'Message Sent and unseen messages started');
                        }else{
                            contentScripts.showDataOnConsole('Error marking as "1st Message"');
                        }
                        
                    }catch(e){
                        contentScripts.showDataOnConsole('Error marking as "1st Message"');
                    }
                }
                if(window.location.href.indexOf('unavailable-product')!=-1){
                    console.log('unavailable-product');
                    // markAsLinkGone replacement
                    await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                    await sendNewSellerMessageDB.SET(null);               
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                    // await markAsLinkGone();
                }else{
                    if(window.location.href==`${fixedData.workingUrls.itemSuffix}${sendNewSellerMessage.fb_post_id}`){
                        
                        // if(document.querySelector(fixedData.workingSelectors.newMessage.seeConversationButton)){
                        //     await markAsFirstMessage();
                        //     await contentScripts.updateFirstMessageTime();
                        // }else if(document.querySelector(fixedData.workingSelectors.newMessage.askForDetailsButton)){
                        //     const accountInfo = await contentScripts.accountInfo();
                        //     const metaInformation = await metaInformationDB.GET();
                        //     const domain = metaInformation.domain;
                        //     const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                        //         method: 'POST',
                        //         headers: {
                        //             'Content-Type': 'application/json'
                        //         }
                        //     });
                        //     const messageText = await messageTextJSON.json();
                        //     await contentScripts.sendMessagesToServer([
                        //         {
                        //             item_id : sendNewSellerMessage.item_id,
                        //             type: 'text',
                        //             sent_from:'me',
                        //             message: messageText,
                        //             timestamp: `${parseInt(new Date().getTime())}`,
                        //             fb_id: accountInfo.id,
                        //             status: 'unsent',
                        //         }
                        //     ]);
                        //     await markAsFirstMessage(messageText);
                        // }else if(!document.querySelector('form [name="message"]')){
                        //     // markAsLinkGone replacement
                        //     await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                        //     await sendNewSellerMessageDB.SET(null);               
                        //     contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                        //     // await markAsLinkGone();
                        // }else if(document.querySelector('form [name="message"]')){
                        //     contentScripts.showDataOnConsole('sending message');
                        //     const message = document.querySelector(fixedData.workingSelectors.newMessage.messageInput);
                        //     const button = document.querySelector(fixedData.workingSelectors.newMessage.sendButton);
                        //     const metaInformation = await metaInformationDB.GET();
                        //     const domain = metaInformation.domain;
                        //     const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                        //         method: 'POST',
                        //         headers: {
                        //             'Content-Type': 'application/json'
                        //         }
                        //     });
                        //     const messageText = await messageTextJSON.json();
                        //     message.value = messageText;
                        //     button.click();
                        //     let i =0;
                        //     while(true){
                        //         if(document.querySelector(fixedData.workingSelectors.newMessage.seeConversationButton)){
                        //             break;
                        //         }
                        //         await essentials.sleep(5000);
                        //         contentScripts.showDataOnConsole(`waiting for message to send ${++i}`);
                        //         if(i>20){
                        //             const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                        //             const tryAgainButton = document.createElement('button');
                        //             tryAgainButton.innerText = 'Try Again';
                        //             tryAgainButton.onclick = async ()=>{
                        //                 contentScripts.pageRedirection(window.location.href,'Trying to send first message Again');
                        //             }
                        //             const removeLeadButton = document.createElement('button');
                        //             removeLeadButton.innerText = 'Remove Lead';
                        //             removeLeadButton.onclick = async ()=>{
                        //                 await sendNewSellerMessageDB.SET(null); 
                        //                 contentScripts.pageRedirection(fixedData.workingUrls.home,'Message Sent and unseen messages started');
                        //             };
                        //             consoleBoard.append(tryAgainButton,removeLeadButton);
                        //             return null;
                        //         }
                        //     }
                        //     await markAsFirstMessage(messageText);
                        //     await contentScripts.updateFirstMessageTime();
                        // }else{
                        //     contentScripts.showDataOnConsole('something unexpected happening!');
                        // }

                        if(document.querySelector(fixedData.workingSelectors.newMessage.askForDetailsButton)){
                            const accountInfo = await contentScripts.accountInfo();
                            const metaInformation = await metaInformationDB.GET();
                            const domain = metaInformation.domain;
                            const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const messageText = await messageTextJSON.json();
                            await contentScripts.sendMessagesToServer([
                                {
                                    item_id : sendNewSellerMessage.item_id,
                                    type: 'text',
                                    sent_from:'me',
                                    message: messageText,
                                    timestamp: `${parseInt(new Date().getTime())}`,
                                    fb_id: accountInfo.id,
                                    status: 'unsent',
                                }
                            ]);
                            await markAsFirstMessage(messageText);
                        }else if(!document.querySelector('form [name="message"]')){
                            // markAsLinkGone replacement
                            await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                            await sendNewSellerMessageDB.SET(null);               
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                            // await markAsLinkGone();
                        }else if(document.querySelector('form [name="message"]')){
                            const accountInfo = await contentScripts.accountInfo();
                            const metaInformation = await metaInformationDB.GET();
                            const domain = metaInformation.domain;
                            const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const messageText = await messageTextJSON.json();
                            await contentScripts.sendMessagesToServer([
                                {
                                    item_id : sendNewSellerMessage.item_id,
                                    type: 'text',
                                    sent_from:'me',
                                    message: messageText,
                                    timestamp: `${parseInt(new Date().getTime())}`,
                                    fb_id: accountInfo.id,
                                    status: 'unsent',
                                }
                            ]);
                            await markAsFirstMessage(messageText);
                        }else{
                            contentScripts.showDataOnConsole('something unexpected happening!');
                            const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                            const tryAgainButton = document.createElement('button');
                            tryAgainButton.innerText = 'Try Again';
                            tryAgainButton.onclick = async ()=>{
                                contentScripts.pageRedirection(window.location.href,'Trying to send first message Again');
                            }
                            const removeLeadButton = document.createElement('button');
                            removeLeadButton.innerText = 'Remove Lead';
                            removeLeadButton.onclick = async ()=>{
                                await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                                await sendNewSellerMessageDB.SET(null);               
                                contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                            };
                            consoleBoard.append(tryAgainButton,removeLeadButton);
                        }

                    }else{
                        contentScripts.pageRedirection(`${fixedData.workingUrls.itemSuffix}${sendNewSellerMessage.fb_post_id}`,'Not on item page');
                    }
                }                
            }else{
                contentScripts.showDataOnConsole('fb post id not collected');
                const processUrlAndContinue = async(url)=>{
                    // get digits from url
                    const postId = url.match(/\d+/g).map(Number)[0];
                    sendNewSellerMessage.fb_post_id = `${postId}`;
                    await sendNewSellerMessageDB.SET(sendNewSellerMessage);
                    contentScripts.pageRedirection(`${fixedData.workingUrls.itemSuffix}${postId}`,'Redirecting to post page');
                }
                const setNameOnMondayAndCollectURL = async ()=>{
                    const query1 = `
                        query{
                            items(ids: [${sendNewSellerMessage.item_id}]){
                                column_values(ids:["${fixedData.mondayFetch.columnValuesIds.borEffortBoard.url}"]){
                                    value
                                }
                            }
                        }
                    `;
                    const urlDataJSON = await mondayFetch(query1);
                    const urlData = await urlDataJSON.json();
                    const url = urlData.data.items[0].column_values[0].value;
                    const query2 = `
                        mutation{
                            change_simple_column_value(board_id:${fixedData.mondayFetch.borEffortBoardId},
                            item_id:${sendNewSellerMessage.item_id},
                            column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.person}",
                            value: "${fixedData.mondayFetch.myAccountId}") 
                            {
                                id
                            }
                        }
                    `;
                    const itemDataJSON = await mondayFetch(query2);
                    const itemData = await itemDataJSON.json();
                    const item = itemData.data.change_simple_column_value;
                    return url;
                }
                try{
                    await processUrlAndContinue(await setNameOnMondayAndCollectURL());
                }catch(e){
                    const contentConsole = document.getElementById(fixedData.workingSelectors.contentConsole);
                    const collectAgainButton = document.createElement('button');
                    collectAgainButton.innerText = 'Collect & Set Again';
                    collectAgainButton.addEventListener('click',async ()=>{
                        try{
                            await processUrlAndContinue(await setNameOnMondayAndCollectURL());
                        }catch(e){
                            contentScripts.showDataOnConsole('Error Collecting URL');
                        }
                    });
                    contentConsole.appendChild(collectAgainButton);
                }
            }
        }
        

    },
    collectUnseenMessage: async()=>{
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        if(window.location.href==fixedData.workingUrls.messages){
            let atttemptCount = 0;
            await essentials.sleep(5000);
            while(true){
                atttemptCount++;
                const allUnseenMessages = document.querySelectorAll(fixedData.workingSelectors.messages.unseenMessages);
                const allUnseenMarketplaceMessages = document.querySelectorAll(`${fixedData.workingSelectors.messages.allMessages} `);
                const moreMessagesButton = document.querySelector(fixedData.workingSelectors.messages.moreMessagesButton);
                const lastMessageTimeObject = allUnseenMessages.length!=0?allUnseenMessages[allUnseenMessages.length-1].querySelector(fixedData.workingSelectors.messages.timeStamp).getAttribute('data-store'):'{"time":0}';
                const lastMessageTime = JSON.parse(lastMessageTimeObject).time;
                const timeNow = (new Date().getTime())/1000;
                const metaInformation = await metaInformationDB.GET();
                const checkMessageDaysLimit = metaInformation.checkMessageDaysLimit;
                if(allUnseenMarketplaceMessages.length >= fixedData.limits.loadMessages || moreMessagesButton==null || (timeNow - lastMessageTime) >= checkMessageDaysLimit*86400){
                    break;
                }else{
                    contentScripts.showDataOnConsole(`Load More Attempt: ${atttemptCount}`);
                    moreMessagesButton.click();
                    await essentials.sleep(5000);
                }
            }
            const unseenMessages = document.querySelectorAll(fixedData.workingSelectors.messages.unseenMessages);
            const unseenMessageIds = [];
            for(let i=0;i<unseenMessages.length;i++){ 
                const unseenMessage = unseenMessages[i];
                const unseenMessageTimeObject = unseenMessage.querySelector(fixedData.workingSelectors.messages.timeStamp).getAttribute('data-store');
                const unseenMessageTime = JSON.parse(unseenMessageTimeObject).time;
                const timeNow = (new Date().getTime())/1000;
                const metaInformation = await metaInformationDB.GET();
                const checkMessageDaysLimit = metaInformation.checkMessageDaysLimit;
                if((timeNow - unseenMessageTime) <= checkMessageDaysLimit*86400){
                    const messageLink = unseenMessage.querySelector('a');
                    const url = new URL(messageLink.href);
                    const messageTID = url.searchParams.get('tid');
                    if(messageTID.indexOf('cid.g.')!=-1){
                        const messageID = messageTID.match(/\d+/g)[0];
                        unseenMessageIds.push(messageID);
                    }
                }
            }
            if(unseenMessageIds.length==0){
                await workingStepDB.SET('prepareOutgoingMessage');
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending message');
                contentScripts.showDataOnConsole(`Unseen Messages: ${unseenMessageIds.length}`);
            }else{
                await workingStepDB.SET('readUnseenMessage');
                const readUnseenMessageDB = new ChromeStorage('readUnseenMessage');
                await readUnseenMessageDB.SET(unseenMessageIds);
                contentScripts.showDataOnConsole(`Unseen Messages: ${unseenMessageIds.length}`);
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${unseenMessageIds[0]}`,'start reading Unseen Message');
            }
        }else{
            contentScripts.pageRedirection(fixedData.workingUrls.messages,'Not on message page');
        }
    },
    getCarVinFromText : (text)=>{
        text = text+'';
        text = text.toUpperCase();
        text = text.replace(/[^A-Z0-9]/g, '');
        const vinRegex = /([A-HJ-NPR-Z\d]{8})([X\d]{1})([E-HJ-NPR-TV]{1})([A-HJ-NPR-Z\d]{2})([\d]{5})/;
        const vinMatch = vinRegex.exec(text);
        let vin = '';
        if(vinMatch){
            vin = vinMatch[0];
            const beforeCheckDigit = vin.substring(0, 8);
            const checkDigit = vin.substring(8, 9)=="X"?"10":parseInt(vin.substring(8, 9));
            const afterCheckDigit = vin.substring(9);
            const stringWithoutCheckDigit = beforeCheckDigit + afterCheckDigit;
            const changeLetterToNumberValue = (letter)=>{
                // no i,O,Q
                letter = letter.replace(/[AJ]/g, '1');
                letter = letter.replace(/[BKS]/g, '2');
                letter = letter.replace(/[CLT]/g, '3');
                letter = letter.replace(/[DMU]/g, '4');
                letter = letter.replace(/[ENV]/g, '5');
                letter = letter.replace(/[FW]/g, '6');
                letter = letter.replace(/[GPX]/g, '7');
                letter = letter.replace(/[HY]/g, '8');
                letter = letter.replace(/[RZ]/g, '9');
                return letter;
            };
            const numberWithoutCheckDigit = changeLetterToNumberValue(stringWithoutCheckDigit);
            const numberWeights = [8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const numberArray = numberWithoutCheckDigit.split('');
            let sum = 0;
            for(let i=0; i<numberArray.length; i++){
                sum += numberArray[i]*numberWeights[i];
            }
            const checkDigitCalculatedValue = sum%11;
            if(checkDigitCalculatedValue==checkDigit){
                return vin;
            }else{
                console.log('Wrong Vin');
                return null;
            }
        }else{
            console.log('No vin found');
            return null;
        }
    },
    itemNeedVin: async(item_id)=>{
        const query =`
            query{
                boards(ids:[${fixedData.mondayFetch.borEffortBoardId}]){
                    items(limit:1,ids:[${item_id}]){
                        column_values(ids:["${fixedData.mondayFetch.columnValuesIds.borEffortBoard.vin}"]){
                            id,  
                            value
                        }
                    }
                }
            }
        `;
        const mondayFetch = await mondayFetch(query);
        const mondayFetchJSON = await mondayFetch.json();
        const itemExists = mondayFetchJSON.data.boards[0].items.length!=0;
        if(itemExists){
            const vin = mondayFetchJSON.data.boards[0].items[0].column_values[0].value;
            return vin==null;
        }else{
            return false;
        }
        
    },
    getVinFromMessageData: async(messageData)=>{
        // where message type is text get message
        let messageTexts = '';
        for(let i=0;i<messageData.length;i++){
            const message = messageData[i];
            if(message.type=='text'){
                messageTexts += message.message;
            }
        }
        const vin = contentScripts.getCarVinFromText(messageTexts);
        return vin;
    },
    readUnseenMessage: async ()=>{
        const workingStepDB = new ChromeStorage('workingStep');
        const readUnseenMessageDB = new ChromeStorage('readUnseenMessage');
        const readUnseenMessage = await readUnseenMessageDB.GET();
        const afterReadingMessage = async ()=>{
            readUnseenMessage.shift();
            await readUnseenMessageDB.SET(readUnseenMessage);
            if(readUnseenMessage.length==0){
                await workingStepDB.SET('prepareOutgoingMessage');
                await readUnseenMessageDB.SET(null);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending message');
            }else{
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`,`unseen message : ${readUnseenMessage[0]}`);
            }
        }
        if(readUnseenMessage.length==0){
            await workingStepDB.SET('prepareOutgoingMessage');
            await readUnseenMessageDB.SET(null);
            contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending message');
        }else{
            if(window.location.href!=`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`){
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`,'Redirecting to message page');
            }else{
                contentScripts.showDataOnConsole('reading message');
                const metaInformationDB = new ChromeStorage('metaInformation');
                const metaInfromation = await metaInformationDB.GET();
                const postUrl = document.querySelector(fixedData.workingSelectors.readMessage.postUrl);
                const itemData = {fb_message_id:`${readUnseenMessage[0]}`};
                if(postUrl){
                    const postId = postUrl.href.match(/\d+/g)[0];
                    itemData.fb_post_id = `${postId}`;
                    itemData.fb_id = `${(await contentScripts.accountInfo()).id}`;
                    const isValidMessageIdJSON = await fetch(`${metaInfromation.domain}/extension/isValidMessageId`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(itemData)
                    });
                    if(isValidMessageIdJSON.status==200){
                        const validData = await isValidMessageIdJSON.json();
                        const valid = validData.valid;
                        if(valid){
                            await essentials.sleep(2000);
                            const isMessageValid = contentScripts.isCurrentMessageValid();
                            if(isMessageValid){
                                contentScripts.showDataOnConsole('message is valid to read or write');
                                const messageDatas = await contentScripts.readCurrentMessage();
                                const lastMessageFromServer = await contentScripts.lastMessageOnServerByPostId(itemData.fb_post_id);
                                const item_id = await contentScripts.itemIdByPostId(itemData.fb_post_id);
                                if(item_id==null){
                                    contentScripts.showDataOnConsole('item_id not found');
                                    await afterReadingMessage();
                                    return;
                                }
                                let newMessageDatas = [];
                                for(let i = messageDatas.length-1;i>=0;i--){
                                    const messageData = messageDatas[i];
                                    messageData.item_id = `${item_id}`;
                                    const message = messageData.message;
                                    if(message.replace(/[^a-zA-Z0-9]/g,'')==lastMessageFromServer.replace(/[^a-zA-Z0-9]/g,'')){
                                        break;
                                    }else{
                                        newMessageDatas = [messageData].concat(newMessageDatas);
                                    }
                                }
                                console.log(newMessageDatas);
                                const readUnseenMessageCountDB = new ChromeStorage('readUnseenMessageCount');
                                const readUnseenMessageCount = await readUnseenMessageCountDB.GET() || 0;
                                for(let i=0;i<newMessageDatas.length;i++){
                                    if(newMessageDatas[i].type=='image'){
                                        if(newMessageDatas[i].message.includes('https://scontent.fdac')){
                                            if(readUnseenMessageCount<2){
                                                await readUnseenMessageCountDB.SET(readUnseenMessageCount+1);
                                                contentScripts.pageRedirection(window.location.href,'redirecting to collect better image');
                                                return null;
                                            }
                                        }
                                    }
                                }
                                await readUnseenMessageCountDB.SET(0);
                                await contentScripts.sendMessagesToServer(newMessageDatas);




                                // read vin from message --start
                                if(newMessageDatas.length>0){
                                    const needVin = await contentScripts.itemNeedVin(item_id);
                                    if(needVin){
                                        const vin  = await contentScripts.getVinFromMessageData(newMessageDatas);
                                        if(vin!=null){
                                            const query1 = `
                                                mutation{
                                                    change_simple_column_value(board_id:${fixedData.mondayFetch.borEffortBoardId},item_id:${item_id},column_id: ${fixedData.mondayFetch.columnValuesIds.borEffortBoard.vin}, value: "${vin}") {
                                                        id
                                                    }
                                                }
                                            `;
                                            const vinUpdateResponse = await mondayFetch(query1);
                                            const vinUpdate = vinUpdateResponse.data.change_simple_column_value.id;
                                            console.log('vin added to item')
                                            const query2 = `
                                                mutation{
                                                    change_simple_column_value(board_id:${fixedData.mondayFetch.borEffortBoardId},item_id:${item_id},column_id: ${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}, value: "Auto Vin") {
                                                        id
                                                    }
                                                }
                                            `;
                                            const statusUpdateResponse = await mondayFetch(query2);
                                            const statusUpdate = statusUpdateResponse.data.change_simple_column_value.id;
                                            console.log('status changed to Auto Vin')
                                        }
                                    }
                                }
                                //read vin from message --end



                            }else{
                                contentScripts.showDataOnConsole('message is not valid to read or write');
                                await contentScripts.markItemAsLinkGone();
                            }
                            await afterReadingMessage();
                        }else{
                            await afterReadingMessage();
                        }
                    }else{
                        contentScripts.showDataOnConsole('error validating message iD');
                    }
                }else{
                    const itemId = await contentScripts.getItemIdByMessageId(readUnseenMessage[0]);
                    if(itemId){
                        await contentScripts.markItemAsLinkGone(itemId);
                    }
                    await afterReadingMessage();
                }
            }
        }
    },
    sendUnsentMessage: async ()=>{
        // Sorry, something went wrong.
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const sendUnsentMessageDB = new ChromeStorage('sendUnsentMessage');
        let sendUnsentMessage = await sendUnsentMessageDB.GET();
        const metaInfromation = await metaInformationDB.GET();
        // const fb_id = (await contentScripts.accountInfo()).id;
        const afterSendingMessage = async ()=>{
            sendUnsentMessage.shift();
            if(sendUnsentMessage.length==0){
                await workingStepDB.SET(null);
                await sendUnsentMessageDB.SET(null);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
            }else{
                await sendUnsentMessageDB.SET(sendUnsentMessage);
                const fb_post_id = sendUnsentMessage[0];
                contentScripts.pageRedirection(fixedData.workingUrls.home,'Redirecting to seller message page');
            }
        }
        if(sendUnsentMessage==null){
            const hasRepliesToSend = await contentScripts.hasRepliesToSend();
            console.log(hasRepliesToSend);
            if(hasRepliesToSend.status){
                contentScripts.showDataOnConsole('has replies to send');
                sendUnsentMessage = await contentScripts.getUnsentMessagePostIds();
                // console.log('unsent message post ids',sendUnsentMessage);
                // console.log(sendUnsentMessage);
                // console.log(`item_id: ${hasRepliesToSend.item_id}`);
                // const fb_post_id = await contentScripts.postIdByItemId(hasRepliesToSend.item_id);
                // console.log(`fb_post_id: ${fb_post_id}`);
                // sendUnsentMessage =[fb_post_id];
                // console.log(`postIds to send: ${sendUnsentMessage}`);
                await sendUnsentMessageDB.SET(sendUnsentMessage);
            }else{
                // contentScripts.showDataOnConsole('no replies but checking for second message');
                // const hasSecondMessageToSend = await contentScripts.hasSecondMessageToSend();
                // if(hasSecondMessageToSend.status){
                //     contentScripts.showDataOnConsole('has second message to send');
                //     await contentScripts.setSecondMessage(hasSecondMessageToSend.item_id);
                //     await contentScripts.markItemAsSecondMessage(hasSecondMessageToSend.item_id);
                //     const fb_post_id = await contentScripts.postIdByItemId(hasSecondMessageToSend.item_id);
                //     sendUnsentMessage = [fb_post_id];
                //     await sendUnsentMessageDB.SET(sendUnsentMessage);
                // }else{
                    contentScripts.showDataOnConsole('no second message to send');
                    await workingStepDB.SET(null);
                    await sendUnsentMessageDB.SET([]);
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
                // }
                
            }
        }
        if(sendUnsentMessage.length!=0){
            const fb_post_id = sendUnsentMessage[0];
            if(window.location.href!=`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`){
                if(fb_post_id==null){
                    await afterSendingMessage();
                }else{
                    contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`,'Redirecting to seller message page');
                }
            }else{
                const validTosendMessage = contentScripts.isValidMessageInSellerMessage();
                if(validTosendMessage){
                    const messages = await contentScripts.getUnsentMessagesByPostId(fb_post_id);
                    if(messages.length!=0){
                        await essentials.sleep(5000);
                        for(let i=0;i<messages.length;i++){
                            const messageData = messages[i];
                            if(messageData==null){
                                await afterSendingMessage();
                            }else{
                                const message = messageData.message;
                                const all_content = document.body.innerText.replace(/[^a-zA-Z0-9]/g,'');
                                const message_content = message.replace(/[^a-zA-Z0-9]/g,'');
                                if(all_content.includes(message_content)){
                                    await contentScripts.markMessageAsSent(messageData.id); 
                                    await contentScripts.updateFirstMessageTime();
                                    await contentScripts.messageCountEligible(true);
                                    if(i==messages.length-1){
                                        // updateFirstMessageTime
                                        await afterSendingMessage();
                                    }
                                }else{
                                    await essentials.sleep(5000);
                                    const messageInput = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.messageInput);
                                    messageInput.value = message;
                                    const sendButton = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sendButton);
                                    sendButton.click();
                                    const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                                    const markAsLinkGoneButton = document.createElement('button');
                                    markAsLinkGoneButton.innerText = 'Mark as link gone';
                                    consoleBoard.append(markAsLinkGoneButton);
                                    markAsLinkGoneButton.onclick = async ()=>{
                                        const item_id = await contentScripts.itemIdByPostId(fb_post_id);
                                        await contentScripts.markItemAsLinkGone(item_id);
                                        await contentScripts.markItemMessagesdone(item_id);
                                        await afterSendingMessage();
                                    };
                                    break;
                                }
                            }
                        }
                        contentScripts.showDataOnConsole('program should not be stucked here');
                    }else{
                        await afterSendingMessage();
                    }
                    
                }else{
                    const item_id = await contentScripts.itemIdByPostId(fb_post_id);
                    await contentScripts.markItemAsLinkGone(item_id);
                    await contentScripts.markItemMessagesdone(item_id);
                    await afterSendingMessage();
                }
                
            }

        }else{
            console.log('redirecting to home to start sending new message');
            await workingStepDB.SET(null);
            await sendUnsentMessageDB.SET(null);
            contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
        }
    },
    messageCountEligible: async (input)=>{
        const workingStepDB = new ChromeStorage('workingStep');
        const messageCountDB = new ChromeStorage('messageCount');
        const workingStep = await workingStepDB.GET();
        let messageCounts = await messageCountDB.GET();
        const currentHour = parseInt(new Date().getTime()/1000/3600);
        if(messageCounts==null){
            messageCounts = {
                [currentHour]: {new:0,reply:0},
                [currentHour-1]: {new:0,reply:0},
                [currentHour-2]: {new:0,reply:0},
            }
            await messageCountDB.SET(messageCounts);
        }else{
            const keys = Object.keys(messageCounts);
            for(let i=0;i<keys.length;i++){
                const key = keys[i];
                if(key<currentHour-2){
                    delete messageCounts[key];
                }
            }
            if(messageCounts[currentHour]==null){
                messageCounts[currentHour] = {new:0,reply:0};
            }
            if(messageCounts[currentHour-1]==null){
                messageCounts[currentHour-1] = {new:0,reply:0};
            }
            if(messageCounts[currentHour-2]==null){
                messageCounts[currentHour-2] = {new:0,reply:0};
            }
            await messageCountDB.SET(messageCounts);
        }
        const eligibility = async (type)=>{
            if(type=='new'){
                if(messageCounts[currentHour-1].new+messageCounts[currentHour-2].new-2 > messageCounts[currentHour-1].reply+messageCounts[currentHour-2].reply){
                    return false;
                }else{
                    return true;
                }
            }else if(type=='reply'){
               const hasRepliesToSend = await contentScripts.hasRepliesToSend();
               if(hasRepliesToSend.status){
                    return true;
               }else{
                    return false;
               }
            }
        };
        contentScripts.showDataOnConsole(workingStep);
        if(input){
            if(workingStep == undefined || workingStep == null){
                messageCounts[currentHour].new++;
            }else if(workingStep == 'sendUnsentMessage'){
                messageCounts[currentHour].reply++;
            }else{
                contentScripts.showDataOnConsole('This is not possible!!!!!');
            }
        }else{
            if(workingStep == undefined || workingStep == null){
                return {
                    status: await eligibility('new'),
                    totalStatus: (await eligibility('new'))||(await eligibility('reply')),
                }
            }else if(workingStep == 'sendUnsentMessage'){
                return {
                    status: await eligibility('reply'),
                    // totalStatus: (await eligibility('new'))||(await eligibility('reply')),
                }
            }else{
                contentScripts.showDataOnConsole('This is not possible!!!!!');
            }
        }
    },
    setupAccountControl: async ()=>{
        const metaInformation = new ChromeStorage('metaInformation');
        const metaInformationValues = await metaInformation.GET();
        const deviceId = metaInformationValues.deviceId;
        const domain = metaInformationValues.domain;
        const accountControlData = await fetch(`${domain}/extension/getAccountControlByDeviceId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: deviceId,
            }),
        });
        const accountControl = await accountControlData.json();
        
        let hourlyLimitData = accountControl.hourlyLimitData;
        hourlyLimitData = JSON.parse(hourlyLimitData);

        metaInformationValues.extensionSwitch = accountControl.mainSwitch;
        metaInformationValues.debugModeSwitch = accountControl.debugSwitch;
        metaInformationValues.checkMessageDaysLimit = accountControl.readMessageDays;
        metaInformationValues.readMessageLimitCount = accountControl.readMessageLimit;

        const americanHour = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
        const hourlyLimitExists = hourlyLimitData[`h${americanHour}`]!=null;
        if(hourlyLimitExists){
            const newMessageLimit = hourlyLimitData[`h${americanHour}`].n;
            const replyMessageLimit = hourlyLimitData[`h${americanHour}`].r;

            metaInformationValues.hourlyMessageLimit = newMessageLimit + replyMessageLimit;
            metaInformationValues.hourlyNewMessageLimit = newMessageLimit;
            metaInformationValues.hourlyReplyMessageLimit = replyMessageLimit;
            metaInformationValues.messagingStartTime = americanHour;
            metaInformationValues.messagingEndTime = americanHour;

        }else{
            metaInformationValues.hourlyMessageLimit = 0;
            metaInformationValues.hourlyNewMessageLimit = 0;
            metaInformationValues.hourlyReplyMessageLimit = 0;
            metaInformationValues.messagingStartTime = 0;
            metaInformationValues.messagingEndTime = 0;
        }
        await metaInformation.SET(metaInformationValues);
    },
    americanHour: ()=>{
        return new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
    },
    programTimeController: async ()=>{
        // status = true means program is running
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInformation = await metaInformationDB.GET();
        const messagingStartHour = parseInt(metaInformation.messagingStartTime);
        const hourlyMessageLimit = metaInformation.hourlyMessageLimit;
        const minimumDuration = 3600/hourlyMessageLimit/100*90;
        const time = new Date().getTime()/1000;
        const timeDoneThisHour = (new Date().getMinutes())*60 + new Date().getSeconds();
        const timeLeftThisHour = 3600 - timeDoneThisHour;
        const messageTime = await contentScripts.messageTime();
        
        if(messagingStartHour==0){
            return {
                status: false,
            }
        }else{
            if(hourlyMessageLimit==0){
                return {
                    status: true,
                    waitingTime: timeLeftThisHour+100
                }
            }else{
                return {
                    status: true,
                    waitingTime: minimumDuration-(time-messageTime)
                }
            }
        }
    },
    messageTime: async (input)=>{
        const messageTimeDB = new ChromeStorage('messageTime');
        let messageTime = await messageTimeDB.GET();
        if(messageTime == null){
            messageTime = 0;
        }
        if(input){
            messageTime = new Date().getTime()/1000;
        }
        await messageTimeDB.SET(messageTime);
        return messageTime;
    },
    messageCounter: async(input)=>{
        const messageCounterDB = new ChromeStorage('messageCounter');
        let messageCounter = await messageCounterDB.GET();
        
        const workingStepDB = new ChromeStorage('workingStep');
        const workingStep = await workingStepDB.GET();
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInformation = await metaInformationDB.GET();
        const currentHour = metaInformation.messagingStartTime;
        if(messageCounter==null){
            messageCounter = {
                [currentHour]: {new:0,reply:0,total:0},
                [currentHour-1]: {new:0,reply:0,total:0},
                [currentHour-2]: {new:0,reply:0,total:0},
            };
        }
        const hours = Object.keys(messageCounter);
        for(let i=0;i<hours.length;i++){
            const hour = hours[i];
            if(hour<currentHour-2){
                delete messageCounter[hour];
            }
        }
        if(messageCounter[currentHour]==null){
            messageCounter[currentHour] = {new:0,reply:0,total:0};
        }
        if(messageCounter[currentHour-1]==null){
            messageCounter[currentHour-1] = {new:0,reply:0,total:0};
        }
        if(messageCounter[currentHour-2]==null){
            messageCounter[currentHour-2] = {new:0,reply:0,total:0};
        }
        if(input){
            await contentScripts.messageTime(true);
            messageCounter[currentHour].total++;
            if(workingStep == 'sendFirstMessage'){
                messageCounter[currentHour].new++;
            }else if(workingStep == 'sendReplyMessage'){
                messageCounter[currentHour].reply++;
            }
        }
        await messageCounterDB.SET(messageCounter);
        return messageCounter;
    },
    prepareOutgoingMessage: async()=>{
        console.log('preparing outgoing message');
        const timeController = await contentScripts.programTimeController();
        if(timeController.status){
            await contentScripts.waitWithVisual(timeController.waitingTime);
        }else{
            console.log('program is not running');
            return false;
        }
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const sendOutgoingMessageDB = new ChromeStorage('sendOutgoingMessage');
        const metaInformation = await metaInformationDB.GET();
        const serverCount = {new:metaInformation.hourlyNewMessageLimit,reply:metaInformation.hourlyReplyMessageLimit,total:metaInformation.hourlyMessageLimit};

        const currentHour = metaInformation.messagingStartTime;
        const localCounts = await contentScripts.messageCounter();
        const localCount = localCounts[currentHour];
        if(serverCount.total>localCount.total){
            console.log('have slot for sending message this hour');
            const balanceLogic = localCounts[currentHour-1].new+localCounts[currentHour-2].new-2 > localCounts[currentHour-1].reply+localCounts[currentHour-2].reply
            if(serverCount.new>localCount.new && balanceLogic){  
                console.log('have slot for sending new message this hour');
                const hasUnsentFirstMessage = await contentScripts.hasUnsentFirstMessage();
                if(hasUnsentFirstMessage.status){
                    console.log('has unsent first message');
                    await sendOutgoingMessageDB.SET(hasUnsentFirstMessage);
                    await workingStepDB.SET('sendFirstMessage');
                    await contentScripts.pageRedirection(fixedData.workingUrls.home,'will send first message now');
                    return true;
                }else{
                    console.log('dont have unsent first message');
                    const hasNewRawItem = await contentScripts.hasNewRawItem();
                    if(hasNewRawItem.status){
                        console.log('has new raw item');
                        const query1 = `
                            query{
                                items(ids: [${hasNewRawItem.item_id}]){
                                    column_values(ids:["${fixedData.mondayFetch.columnValuesIds.borEffortBoard.url}"]){
                                        value
                                    }
                                }
                            }
                        `;
                        const urlDataJSON = await mondayFetch(query1);
                        const urlData = await urlDataJSON.json();
                        const url = urlData.data.items[0].column_values[0].value;
                        const fb_post_id = url.match(/\d+/g).map(Number)[0];
                        const initiateItemMessaging = await fetch(`${metaInformation.domain}/extension/initiateItemMessaging`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                item_id: `${hasNewRawItem.item_id}`,
                                fb_post_id: `${fb_post_id}`,
                                fb_id: `${(await contentScripts.accountInfo()).id}`,
                                fb_user_name: `${(await contentScripts.accountInfo()).name}`
                            }),
                        });
                        const initiateItemMessagingData = await initiateItemMessaging.json();
                        if(initiateItemMessagingData.status){
                            console.log('initiated item messaging');
                            await sendOutgoingMessageDB.SET(initiateItemMessagingData);
                            await workingStepDB.SET('sendFirstMessage');
                            await contentScripts.pageRedirection(fixedData.workingUrls.home,'will send first message now');
                            return true;
                        }else{
                            console.log('initiation failed!! Try again');
                            return false;
                            // initiation failed
                        }
                    }else{
                        console.log('dont have raw item to send first message');
                        const hasRepliesToSend = await contentScripts.hasRepliesToSend();
                        if(hasRepliesToSend.status){
                            console.log('has replies to send');
                            await sendOutgoingMessageDB.SET(hasRepliesToSend);
                            await workingStepDB.SET('sendReplyMessage');
                            await contentScripts.pageRedirection(fixedData.workingUrls.home,'will send reply message now');
                            return true;
                        }else{
                            console.log('dont have replies to send');
                            await contentScripts.waitWithVisual(300);
                            return false;
                        }
                    }
                }
            }else if(serverCount.reply>localCount.reply || serverCount.total>localCount.total){
                const hasRepliesToSend = await contentScripts.hasRepliesToSend();
                if(hasRepliesToSend.status){
                    console.log('has replies to send');
                    await sendOutgoingMessageDB.SET(hasRepliesToSend);
                    await workingStepDB.SET('sendReplyMessage');
                    await contentScripts.pageRedirection(fixedData.workingUrls.home,'will send reply message now');
                    return true;
                }else{
                    console.log('dont have replies to send');
                    await contentScripts.waitWithVisual(360);
                    await workingStepDB.SET('collectUnseenMessage');
                    await contentScripts.pageRedirection(fixedData.workingUrls.home,'will collect unseen message now');
                    return false;
                }
            }
        }else{
            console.log(metaInformation);
            console.log(localCount);
            console.log(typeof(serverCount.total), typeof(localCount.total));
            console.log('dont have slot for sending message this hour');
            await contentScripts.waitWithVisual(360);
            await workingStepDB.SET('collectUnseenMessage');
            await contentScripts.pageRedirection(fixedData.workingUrls.home,'will collect unseen message now');
            return false;
        }
    },
    sendOutgoingMessage: async()=>{
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const sendOutgoingMessageDB = new ChromeStorage('sendOutgoingMessage');
        let sendOutgoingMessage = await sendOutgoingMessageDB.GET();
        const metaInfromation = await metaInformationDB.GET();
        const workingStep = await workingStepDB.GET();
        
        // const afterSendingMessage = async ()=>{
        //     sendUnsentMessage.shift();
        //     if(sendUnsentMessage.length==0){
        //         await workingStepDB.SET(null);
        //         await sendUnsentMessageDB.SET(null);
        //         contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
        //     }else{
        //         await sendUnsentMessageDB.SET(sendUnsentMessage);
        //         const fb_post_id = sendUnsentMessage[0];
        //         contentScripts.pageRedirection(fixedData.workingUrls.home,'Redirecting to seller message page');
        //     }
        // }
        if(sendOutgoingMessage==null){
            console.log('already sent message');
            contentScripts.pageRedirection(fixedData.workingUrls.home,'already sent message');
        }else if(sendOutgoingMessage.status){
            const fb_post_id = sendOutgoingMessage.fb_post_id;
            const item_id = sendOutgoingMessage.item_id;
            const id = sendOutgoingMessage.id;
            const message = sendOutgoingMessage.message;
            if(window.location.href!=`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`){
                contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`,'Redirecting to seller message page');
                return false;
            }else{
                const validTosendMessage = contentScripts.isValidMessageInSellerMessage();
                if(validTosendMessage){
                    // sending message
                    await essentials.sleep(3000);
                    const all_content = document.body.innerText.replace(/[^a-zA-Z0-9]/g,'');
                    const message_content = message.replace(/[^a-zA-Z0-9]/g,'');
                    if(all_content.includes(message_content)){
                        console.log('message already sent');
                        if(workingStep=='sendFirstMessage'){
                            contentScripts.showDataOnConsole('marking as "First Message"');
                            const query = `
                                mutation {
                                    change_simple_column_value(
                                        item_id: ${item_id}, 
                                        board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                        column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                                        value: "1st MSG") {
                                        id
                                    }
                                }
                            `;
                            const formatDateToMondayAmerican = ()=>{
                                const americanTime = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
                                let month = '' + (americanTime.getMonth() + 1);
                                let day = '' + americanTime.getDate();
                                let year = americanTime.getFullYear();
                            
                                if (month.length < 2) 
                                    month = '0' + month;
                                if (day.length < 2) 
                                    day = '0' + day;
                            
                                return [year, month, day].join('-');
                            }
                            const query1 = `
                                mutation {
                                    change_simple_column_value(
                                        item_id: ${item_id}, 
                                        board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                        column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.fbCode}", 
                                        value: "${(await contentScripts.accountInfo()).name}") {
                                        id
                                    }
                                }
                            `;
                            const query2 = `
                                mutation {
                                    change_simple_column_value(
                                        item_id: ${item_id}, 
                                        board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                        column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.date}", 
                                        value: "${formatDateToMondayAmerican()}") {
                                        id
                                    }
                                }
                            `;
                            const firstMessageDataJSON = await mondayFetch(query);
                            const fbCodeJSON = await mondayFetch(query1);
                            const dateDataJSON = await mondayFetch(query2);
                            const dateData = await dateDataJSON.json();
                            const fbCode = await fbCodeJSON.json();
                            const firstMessageData = await firstMessageDataJSON.json();
                            const metaInformation = await metaInformationDB.GET();
                            const domain = metaInformation.domain;
                            
                        }
                        await contentScripts.messageCounter(true);
                        await contentScripts.markMessageAsSent(id);
                        await workingStepDB.SET('collectUnseenMessage');
                        await contentScripts.pageRedirection(fixedData.workingUrls.home,'will collect unseen message now');
                        return true;
                    }else{
                        console.log('sending message');
                        await essentials.sleep(5000);
                        const messageInput = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.messageInput);
                        messageInput.value = message;
                        const sendButton = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sendButton);
                        sendButton.click();
                        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                        const markAsLinkGoneButton = document.createElement('button');
                        markAsLinkGoneButton.innerText = 'Mark as link gone';
                        consoleBoard.append(markAsLinkGoneButton);
                        markAsLinkGoneButton.onclick = async ()=>{
                            console.log('marking as link gone');
                            await contentScripts.markItemAsLinkGone(item_id);
                            await contentScripts.markItemMessagesdone(item_id);
                            console.log('found a message that is not valid, grabbing new one');
                            await workingStepDB.SET('prepareOutgoingMessage');
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'will grab another unsent message');
                            return false;
                        };
                        return true;
                    }
                }else{
                    console.log('marking as link gone');
                    await contentScripts.markItemAsLinkGone(item_id);
                    await contentScripts.markItemMessagesdone(item_id);
                    console.log('found a message that is not valid, grabbing new one');
                    await workingStepDB.SET('prepareOutgoingMessage');
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'will grab another unsent message');
                    return false;
                }
            }
        }else{
            console.log('Program should not be here unless fatal error');
        }
        
        // if(sendUnsentMessage.length!=0){
        //     const fb_post_id = sendUnsentMessage[0];
        //     if(window.location.href!=`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`){
        //         if(fb_post_id==null){
        //             await afterSendingMessage();
        //         }else{
        //             contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`,'Redirecting to seller message page');
        //         }
        //     }else{
        //         const validTosendMessage = contentScripts.isValidMessageInSellerMessage();
        //         if(validTosendMessage){
        //             const messages = await contentScripts.getUnsentMessagesByPostId(fb_post_id);
        //             if(messages.length!=0){
        //                 await essentials.sleep(5000);
        //                 for(let i=0;i<messages.length;i++){
        //                     const messageData = messages[i];
        //                     if(messageData==null){
        //                         await afterSendingMessage();
        //                     }else{
        //                         const message = messageData.message;
        //                         const all_content = document.body.innerText.replace(/[^a-zA-Z0-9]/g,'');
        //                         const message_content = message.replace(/[^a-zA-Z0-9]/g,'');
        //                         if(all_content.includes(message_content)){
        //                             await contentScripts.markMessageAsSent(messageData.id);
        //                             await contentScripts.updateFirstMessageTime();
        //                             await contentScripts.messageCountEligible(true);
        //                             if(i==messages.length-1){
        //                                 // updateFirstMessageTime
        //                                 await afterSendingMessage();
        //                             }
        //                         }else{
        //                             await essentials.sleep(5000);
        //                             const messageInput = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.messageInput);
        //                             messageInput.value = message;
        //                             const sendButton = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sendButton);
        //                             sendButton.click();
        //                             const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        //                             const markAsLinkGoneButton = document.createElement('button');
        //                             markAsLinkGoneButton.innerText = 'Mark as link gone';
        //                             consoleBoard.append(markAsLinkGoneButton);
        //                             markAsLinkGoneButton.onclick = async ()=>{
        //                                 const item_id = await contentScripts.itemIdByPostId(fb_post_id);
        //                                 await contentScripts.markItemAsLinkGone(item_id);
        //                                 await contentScripts.markItemMessagesdone(item_id);
        //                                 await afterSendingMessage();
        //                             };
        //                             break;
        //                         }
        //                     }
        //                 }
        //                 contentScripts.showDataOnConsole('program should not be stucked here');
        //             }else{
        //                 await afterSendingMessage();
        //             }
                    
        //         }else{
        //             const item_id = await contentScripts.itemIdByPostId(fb_post_id);
        //             await contentScripts.markItemAsLinkGone(item_id);
        //             await contentScripts.markItemMessagesdone(item_id);
        //             await afterSendingMessage();
        //         }
                
        //     }

        // }else{
        //     console.log('redirecting to home to start sending new message');
        //     await workingStepDB.SET(null);
        //     await sendUnsentMessageDB.SET(null);
        //     contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
        // }
    },
};

const popupSetup = async()=>{
    // const accountControllerView = accountController({});
    // const popupHolder = document.createElement('div');
    // popupHolder.className = 'h-500px overflow-y-auto'
    // popupHolder.append(accountControllerView);
    // document.body.append(popupHolder);
    
    console.log('popup');
    document.body.id ="POPUP";
    const metas = fixedData.metaInformation;
    const popupMetaDB = new ChromeStorage('metaInformation');
    let popupMetaValues = await popupMetaDB.GET();
    popupMetaValues = popupMetaValues==null?{}:popupMetaValues;
    const metaKeys = Object.keys(metas);
    for(let i=0;i<metaKeys.length;i++){
        const metaKey = metaKeys[i];
        const meta = metas[metaKey];
        if(meta.interactive==true){
            const label = document.createElement('label');
            label.innerText = meta.title;
            const input = document.createElement('input');
            input.setAttribute('type', meta.type);
            input.setAttribute('id', metaKey);
            // input.setAttribute('placeholder', meta.title);
            // input.setAttribute(meta.point, meta.defaultValue);
            if(popupMetaValues[metaKey]==null){
                popupMetaValues[metaKey] = meta.defaultValue;
            }
            input[meta.point] = popupMetaValues[metaKey];
            document.body.append(label,input);
        }else{
            // readd only
            const label = document.createElement('label');
            label.innerText = `${meta.title}: ${popupMetaValues[metaKey]}`;
            document.body.append(label);
        }
    }
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', async ()=>{
        for(let i=0;i<metaKeys.length;i++){
            if(metas[metaKeys[i]].interactive==true){
                const metaKey = metaKeys[i];
                const meta = metas[metaKey];
                popupMetaValues[metaKey] = document.getElementById(metaKey)[meta.point];
            }
        }
        await popupMetaDB.SET(popupMetaValues);
        window.close();
    });
    document.body.appendChild(saveButton);
     
}
const contentSetup = async()=>{
    // const accountInfo = await contentScripts.accountInfo();
    // console.log(accountInfo);
    contentScripts.setupConsoleBoard();
    //get deviceId from storage
    const metaInformation = new ChromeStorage('metaInformation');
    const metaInformationValues = await metaInformation.GET();
    const deviceId = metaInformationValues.deviceId;
    if(deviceId){
        await contentScripts.setupAccountControl();
    }else{
        contentScripts.showDataOnConsole('Device ID name not found');
        return false;
    }
    if(await contentScripts.isProgramReady()){
        contentScripts.showDataOnConsole('Program is ready');
        if(contentScripts.isUserLoggedIn()){
            const workingStepDB = new ChromeStorage('workingStep');
            const workingStep = await workingStepDB.GET();
            // const isValidTimeToSendFirstMessage = await contentScripts.isValidTimeToSendFirstMessage();
            // const messageCountEligible = await contentScripts.messageCountEligible();
            switch(workingStep){
                case undefined:
                case null:
                    const workingStepDB = new ChromeStorage('workingStep');
                    await workingStepDB.SET('collectUnseenMessage');
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'start collecting unseen message');

                    // const hasRepliesToSend = await contentScripts.hasRepliesToSend();
                    // await contentScripts.waitWithVisual(isValidTimeToSendFirstMessage.waitingTime);
                    // if(!messageCountEligible.totalStatus){
                    //     await contentScripts.waitWithVisual('600');
                    // }
                    // if(isValidTimeToSendFirstMessage.status && messageCountEligible.status){
                    //     await contentScripts.sendNewSellerMessage();
                    // }else{
                    //     const workingStepDB = new ChromeStorage('workingStep');
                    //     await workingStepDB.SET('collectUnseenMessage');
                    //     if(!messageCountEligible.status){
                    //         contentScripts.showDataOnConsole('Message count Eligibility is in action');
                    //     }
                    //     contentScripts.pageRedirection(fixedData.workingUrls.home,'start collecting unseen message');
                    // }
                break;
                case 'collectUnseenMessage':
                    await contentScripts.collectUnseenMessage();
                break;
                case 'readUnseenMessage':
                    await contentScripts.readUnseenMessage();
                break;
                case 'prepareOutgoingMessage':
                    await contentScripts.prepareOutgoingMessage();
                break;
                case 'sendFirstMessage':
                case 'sendReplyMessage':
                    await contentScripts.sendOutgoingMessage();
                // case 'sendUnsentMessage':
                //     if(isValidTimeToSendFirstMessage.status && messageCountEligible.status){
                //         await contentScripts.waitWithVisual(isValidTimeToSendFirstMessage.waitingTime);
                //         await contentScripts.sendUnsentMessage();
                //     }else{
                //         const workingStepDB = new ChromeStorage('workingStep');
                //         await workingStepDB.SET(null);
                //         if(!messageCountEligible.status){
                //             contentScripts.showDataOnConsole('Message count Eligibility is in action');
                //         }
                //         contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
                //     }
                break;
                default:
                    console.log('what??');
                break;
            }
        }else{
            contentScripts.showDataOnConsole('User is not logged in');
            const metaValues = await new ChromeStorage('metaInformation').GET();
            contentScripts.showDataOnConsole(`Account Email: ${metaValues.accountEmail}`);
            contentScripts.showDataOnConsole(`Account Password: ${metaValues.accountPassword}`);
        }
    }else{
        contentScripts.showDataOnConsole('Please Save required values and restart');
    }
}
(async ()=>{
    if(typeof window=== 'undefined'){
        console.log('background');
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
              switch(request.action){
                case 'userLogout':
                  chrome.cookies.remove({"url": 'https://facebook.com', "name": 'c_user'}, function(cookie) {});
                  sendResponse('success');
                break;
              }
            }
        );
    }else{
        if(window.location.href.includes('chrome-extension')){
           
            await popupSetup();
        }else{

            await contentSetup();
        }
    }
})();



// license plate
// https://www.faxvin.com/license-plate-lookup/result?plate=959ECL&state=IN
// https://vincheck.info/prepare-license-search.php?state=IN&plate=959ECL
// https://www.autocheck.com/consumer-api/meta/v1/summary/plate/959ECL/state/IN -- https://www.autocheck.com/vehiclehistory/search-by-license-plate
// https://www.vinfreecheck.com/free-license-plate-lookup`