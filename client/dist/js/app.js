!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=c(n(3)),o=c(n(8)),s=c(n(9));function c(e){return e&&e.__esModule?e:{default:e}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return a(e,[{key:"add",value:function(e,t,n){var r={};if(void 0===n||t.name&&"string"==typeof t.name||(t=(0,s.default)(this.get(e,n),t)),(!t.name||"string"!=typeof t.name)&&void 0===n)return"";var a=this.__normalize(t.name);for(var o in r[a]={},t)t.hasOwnProperty(o)&&(r[a][o]=t[o]);return i.default.setData(e,r),a}},{key:"delete",value:function(e,t){this.deleteAttachments(t,e),i.default.deleteData(e,t)}},{key:"updateAttachments",value:function(e,t){var n=i.default.getData("attachments",this.__normalize(e.name));if("object"===(void 0===n?"undefined":r(n))&&Object.keys(n).length>0){var a=n.attachedTo;return a.forEach((function(e){if(e.name===t.name)return!1})),a.push({name:t.name,type:t.type}),this.add("attachments",{name:e.name,type:e.type,attachedTo:a}),!0}return this.add("attachments",{name:e.name,type:e.type,attachedTo:[{name:t.name,type:t.type}]}),!0}},{key:"deleteAttachments",value:function(e,t){var n=this,r=i.default.getData("attachments");for(var a in r)r.hasOwnProperty(a)&&function(){var t=r[a],i=t.attachedTo;t.attachedTo.forEach((function(t,n){t.name===e&&i.splice(n,1)})),n.add("attachments",{name:t.name,attachedTo:i})}();return!!r[e]&&(r[e].attachedTo.forEach((function(r){var a=i.default.getData(r.type,r.name),o=a.attachment[t].indexOf(e),s=a.attachment[t];if(o<0)return!1;a.attachment[t].length<2&&(a.attachment[t]=[],n.add(r.type,{attachment:a.attachment},r.name)),s.splice(o,1),a.attachment[t]=s,n.add(r.type,{attachment:a.attachment},r.name)})),i.default.deleteData("attachments",e),!0)}},{key:"get",value:function(e,t){return void 0===t?i.default.getData(e):i.default.getData(e,t)}},{key:"__normalize",value:function(e){if("string"===!(void 0===e||r(e)))return!1;var t=e.toLowerCase().trim();return o.default.remove(t.split(" ").join("-").split("'").join("-"))}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.rootElement=null===document.querySelector("#notification-container")?document.querySelector("body"):document.querySelector("#notification-container"),this.notificationElement=null,this.textArea=null,this.notifNumber=0,this.activeTO=null,this.identifier=null===t?Math.random().toString(36).substring(7):t}return r(e,[{key:"add",value:function(){this.rootElement.hasChildNodes()&&(clearTimeout(this.activeTO),this.remove(this.rootElement.firstElementChild)),this.textArea=document.createElement("span"),this.notificationElement=document.createElement("div"),this.notificationElement.className="notification",this.notificationElement.id="notif-"+this.identifier+"-"+this.notifNumber,this.notificationElement.appendChild(this.textArea),this.rootElement.appendChild(this.notificationElement),this.notifNumber++}},{key:"display",value:function(e,t){var n=this;return this.textArea.innerHTML=t,!this.notificationElement.classList.contains(e)&&(this.notificationElement.classList.add(e),this.activeTO=setTimeout((function(){n.notificationElement.classList.toggle("active")}),200),this.activeTO=setTimeout((function(){n.notificationElement.classList.toggle("active")}),5e3),!0)}},{key:"remove",value:function(e){this.rootElement.removeChild(e)}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=o(n(0)),i=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.objectManager=new a.default,e.notif=new i.default("list"),window.addEventListener("load",e.exec.bind(e)),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"exec",value:function(){var e=this,t=document.querySelectorAll("[data-list-primary]");[].forEach.call(t,(function(t){var n=t.getAttribute("data-list-primary"),r=e.objectManager.get(n),a=t.firstElementChild;null!==a&&t.removeChild(a);var i=e.fillListArea(r,n);i&&t.appendChild(i)})),this.buildDistrictSelectors(),this.buildRegionSelectors()}},{key:"fillListArea",value:function(e,t){if(0===Object.keys(e).length)return!1;var n=document.createElement("ul");for(var r in e){var a=document.createElement("li"),i=document.createElement("a");i.href=e[r].link,i.target="_blank",i.innerHTML=e[r].name;var o=i.cloneNode(!0);if(o.href="#",o.className="delete-button",o.setAttribute("data-list",t),o.setAttribute("data-element",r),o.innerHTML="delete",this.attachDeleteEvent(o),a.appendChild(i),a.appendChild(o),e[r].hasOwnProperty("attachment")){var s=this.buildSublist(e[r].attachment);s.hasChildNodes()&&a.appendChild(s)}n.appendChild(a)}return n}},{key:"buildRegionSelectors",value:function(){var e=document.getElementById("cities-region-selector"),t=document.getElementById("division-region-selector");null!==e&&e.parentElement.removeChild(e),null!==t&&t.parentElement.removeChild(t);var n=document.createElement("select");n.id="cities-region-selector",n.name="region-selector";var r=document.querySelector("#city-attach-region-option"),a=r.querySelector('input[name="displayRegionsSelector"]'),i=document.querySelector("#district-attach-region-option"),o=i.querySelector('input[name="displayRegionsSelector"]'),s=this.objectManager.get("regions");for(var c in r.style.display="block",Object.keys(s).length<=0&&(r.style.display="none"),s)if(s.hasOwnProperty(c)){var l=document.createElement("option");l.value=c,l.innerHTML=s[c].name,n.appendChild(l)}var u=n.cloneNode(!0);u.id="division-region-selector",r.appendChild(n),i.appendChild(u),a.checked&&(n.style.display="inline"),o.checked&&(u.style.display="inline")}},{key:"buildDistrictSelectors",value:function(){var e=document.querySelector("#city-attach-district-option"),t=e.querySelector('input[name="displayDistrictsSelector"]'),n=document.getElementById("cities-district-selector");null!==n&&n.parentElement.removeChild(n);var r=document.createElement("select");r.id="cities-district-selector",r.name="district-selector";var a=this.objectManager.get("districts");for(var i in e.style.display="block",Object.keys(a).length<=0&&(e.style.display="none"),a)if(a.hasOwnProperty(i)){var o=document.createElement("option");o.value=i,o.innerHTML=a[i].name,r.appendChild(o)}e.appendChild(r),t.checked&&(r.style.display="inline")}},{key:"buildSublist",value:function(e){var t=this,n=document.createElement("ul");n.className="sublist";var r=function(r){e.hasOwnProperty(r)&&e[r].length>0&&e[r].forEach((function(e){var a=t.createLine(r,e);a&&n.appendChild(a)}))};for(var a in e)r(a);return n}},{key:"createLine",value:function(e,t){var n=document.createElement("li"),r=this.objectManager.get(e,t);if(void 0===r)return!1;var a=document.createElement("a");return a.href=r.link,a.target="_blank",a.innerHTML=r.name,n.appendChild(a),n}},{key:"attachDeleteEvent",value:function(e){var t=this;e.addEventListener("click",(function(n){n.preventDefault(),t.notif.add(),t.objectManager.delete(e.getAttribute("data-list"),e.getAttribute("data-element")),t.notif.display("warn","L'élément a bien été supprimé")}))}}]),t}(a.default);t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var a=n(6),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"setData",value:function(e,t){var n=this.getData(e);for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);localStorage.setItem(e,this.__serialize(n));var i=new a("storageChange",{detail:{groupType:e}});window.dispatchEvent(i)}},{key:"deleteData",value:function(e,t){if(localStorage.getItem(e)&&void 0===t)localStorage.removeItem(e);else{var n=this.getData(e);delete n[t],this.setDataGroup(e,n)}}},{key:"setDataGroup",value:function(e,t){localStorage.setItem(e,this.__serialize(t));var n=new a("storageChange",{detail:{groupType:e}});window.dispatchEvent(n)}},{key:"getData",value:function(e,t){if(null===localStorage.getItem(e))return{};var n=this.__deserialize(localStorage.getItem(e));return void 0!==t?n[t]:n}},{key:"getAllData",value:function(){var e=["cities","districts","regions"],t={};for(var n in localStorage)if(localStorage.hasOwnProperty(n)&&e.includes(n)){var r=this.__deserialize(localStorage[n]);t[n]=r}return t}},{key:"__serialize",value:function(e){return JSON.stringify(e)}},{key:"__deserialize",value:function(e){return JSON.parse(e)}}]),e}();t.default=i},function(e,t,n){const r=n(5);n(14);window.app=(()=>{for(const e in r){new(0,r[e].default.prototype.constructor)}})()},function(e,t,n){"use strict";e.exports={renderList:n(2),citiesForm:n(10),divisionsForm:n(11),storageObserver:n(12),editJson:n(13)}},function(e,t,n){(function(t){var n=t.CustomEvent;e.exports=function(){try{var e=new n("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(e){}return!1}()?n:"undefined"!=typeof document&&"function"==typeof document.createEvent?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=Boolean(t.bubbles),n.cancelable=Boolean(t.cancelable),n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n}}).call(this,n(7))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){t.remove=function(e){return e.replace(/[^\u0000-\u007e]/g,(function(e){return r[e]||e}))};for(var n=[{base:" ",chars:" "},{base:"0",chars:"߀"},{base:"A",chars:"ⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",chars:"Ꜳ"},{base:"AE",chars:"ÆǼǢ"},{base:"AO",chars:"Ꜵ"},{base:"AU",chars:"Ꜷ"},{base:"AV",chars:"ꜸꜺ"},{base:"AY",chars:"Ꜽ"},{base:"B",chars:"ⒷＢḂḄḆɃƁ"},{base:"C",chars:"ⒸＣꜾḈĆCĈĊČÇƇȻ"},{base:"D",chars:"ⒹＤḊĎḌḐḒḎĐƊƉᴅꝹ"},{base:"Dh",chars:"Ð"},{base:"DZ",chars:"ǱǄ"},{base:"Dz",chars:"ǲǅ"},{base:"E",chars:"ɛⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ"},{base:"F",chars:"ꝼⒻＦḞƑꝻ"},{base:"G",chars:"ⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ"},{base:"H",chars:"ⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",chars:"ⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",chars:"ⒿＪĴɈȷ"},{base:"K",chars:"ⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",chars:"ⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",chars:"Ǉ"},{base:"Lj",chars:"ǈ"},{base:"M",chars:"ⓂＭḾṀṂⱮƜϻ"},{base:"N",chars:"ꞤȠⓃＮǸŃÑṄŇṆŅṊṈƝꞐᴎ"},{base:"NJ",chars:"Ǌ"},{base:"Nj",chars:"ǋ"},{base:"O",chars:"ⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OE",chars:"Œ"},{base:"OI",chars:"Ƣ"},{base:"OO",chars:"Ꝏ"},{base:"OU",chars:"Ȣ"},{base:"P",chars:"ⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",chars:"ⓆＱꝖꝘɊ"},{base:"R",chars:"ⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",chars:"ⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",chars:"ⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"Th",chars:"Þ"},{base:"TZ",chars:"Ꜩ"},{base:"U",chars:"ⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",chars:"ⓋＶṼṾƲꝞɅ"},{base:"VY",chars:"Ꝡ"},{base:"W",chars:"ⓌＷẀẂŴẆẄẈⱲ"},{base:"X",chars:"ⓍＸẊẌ"},{base:"Y",chars:"ⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",chars:"ⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",chars:"ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑ"},{base:"aa",chars:"ꜳ"},{base:"ae",chars:"æǽǣ"},{base:"ao",chars:"ꜵ"},{base:"au",chars:"ꜷ"},{base:"av",chars:"ꜹꜻ"},{base:"ay",chars:"ꜽ"},{base:"b",chars:"ⓑｂḃḅḇƀƃɓƂ"},{base:"c",chars:"ｃⓒćĉċčçḉƈȼꜿↄ"},{base:"d",chars:"ⓓｄḋďḍḑḓḏđƌɖɗƋᏧԁꞪ"},{base:"dh",chars:"ð"},{base:"dz",chars:"ǳǆ"},{base:"e",chars:"ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇǝ"},{base:"f",chars:"ⓕｆḟƒ"},{base:"ff",chars:"ﬀ"},{base:"fi",chars:"ﬁ"},{base:"fl",chars:"ﬂ"},{base:"ffi",chars:"ﬃ"},{base:"ffl",chars:"ﬄ"},{base:"g",chars:"ⓖｇǵĝḡğġǧģǥɠꞡꝿᵹ"},{base:"h",chars:"ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",chars:"ƕ"},{base:"i",chars:"ⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",chars:"ⓙｊĵǰɉ"},{base:"k",chars:"ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",chars:"ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇɭ"},{base:"lj",chars:"ǉ"},{base:"m",chars:"ⓜｍḿṁṃɱɯ"},{base:"n",chars:"ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥлԉ"},{base:"nj",chars:"ǌ"},{base:"o",chars:"ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿꝋꝍɵɔᴑ"},{base:"oe",chars:"œ"},{base:"oi",chars:"ƣ"},{base:"oo",chars:"ꝏ"},{base:"ou",chars:"ȣ"},{base:"p",chars:"ⓟｐṕṗƥᵽꝑꝓꝕρ"},{base:"q",chars:"ⓠｑɋꝗꝙ"},{base:"r",chars:"ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",chars:"ⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛʂ"},{base:"ss",chars:"ß"},{base:"t",chars:"ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"th",chars:"þ"},{base:"tz",chars:"ꜩ"},{base:"u",chars:"ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",chars:"ⓥｖṽṿʋꝟʌ"},{base:"vy",chars:"ꝡ"},{base:"w",chars:"ⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",chars:"ⓧｘẋẍ"},{base:"y",chars:"ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",chars:"ⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],r={},a=0;a<n.length;a+=1)for(var i=n[a].chars,o=0;o<i.length;o+=1)r[i[o]]=n[a].base;t.replacementList=n,t.diacriticsMap=r},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,s,c=o(e),l=1;l<arguments.length;l++){for(var u in n=Object(arguments[l]))a.call(n,u)&&(c[u]=n[u]);if(r){s=r(n);for(var f=0;f<s.length;f++)i.call(n,s[f])&&(c[s[f]]=n[s[f]])}}return c}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=o(n(0)),i=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.form=document.getElementById("cities-form"),e.objectManager=new a.default,e.notif=new i.default("cities-form"),e.exec(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"exec",value:function(){this.bindEvents()}},{key:"bindEvents",value:function(){var e=this,t=this.form.querySelector('input[name="cityName"]'),n=this.form.querySelector('input[name="cityLink"]'),r=this.form.querySelector('input[name="displayDistrictsSelector"]'),a=this.form.querySelector('input[name="displayRegionsSelector"]');t.addEventListener("keyup",(function(){var n=t.parentElement.querySelector(".helper");t.value.length>0&&t.classList.contains("invalid")?e.removeErrors(t):t.value.length<=0&&!t.classList.contains("invalid")&&(n.innerHTML="Champ obligatoire",t.classList.add("invalid"))})),r.addEventListener("change",(function(){if(r.checked)return e.displayDistrictSelector(!0),!0;e.displayDistrictSelector(!1)})),a.addEventListener("change",(function(){if(a.checked)return e.displayRegionSelector(!0),!0;e.displayRegionSelector(!1)})),this.form.addEventListener("submit",(function(r){r.preventDefault();var a=e.form.querySelector('input[name="displayRegionsSelector"]'),i=e.form.querySelector('input[name="displayDistrictsSelector"]'),o=t.value,s=n.value,c=e.form.querySelector('select[name="region-selector"]').value,l=e.form.querySelector('select[name="district-selector"]').value,u=e.objectManager.get("regions",c),f=e.objectManager.get("districts",l);if(e.notif.add(),o.length<=0)e.throwErrors({fields:[{element:t,error:"required"}],errorMessage:"Remplissez les champs nécessaires"});else{var d=e.objectManager.add("cities",{name:o,link:s});if(!a.checked&&!i.checked)return e.objectManager.deleteAttachments(d,"cities"),void e.notif.display("success","Votre ville a bien été créée");if(a.checked&&Object.keys(u).length>0){var h=u.attachment.cities;h.indexOf(d)<0&&(h.push(d),e.objectManager.updateAttachments({name:d,type:"cities"},{name:c,type:"regions"})),e.objectManager.add("regions",{attachment:{cities:h,districts:u.attachment.districts}},c)}if(i.checked&&Object.keys(f).length>0){var p=f.attachment.cities;p.indexOf(d)<0&&(p.push(d),e.objectManager.updateAttachments({name:d,type:"cities"},{name:l,type:"districts"})),e.objectManager.add("districts",{attachment:{cities:p}},l)}e.notif.display("success","Votre ville a bien été créée"),e.form.reset(),e.displayRegionSelector(!1),e.displayDistrictSelector(!1)}}))}},{key:"displayDistrictSelector",value:function(e){var t=this.form.querySelector('select[name="district-selector"]');return null!==t&&(e?(t.style.display="inline",!0):void(t.style.display="none"))}},{key:"displayRegionSelector",value:function(e){var t=this.form.querySelector('select[name="region-selector"]');return null!==t&&(e?(t.style.display="inline",!0):void(t.style.display="none"))}},{key:"throwErrors",value:function(e){var t=e.fields,n=e.errorMessage;this.notif.display("error",n),t.forEach((function(e){var t=e.element.parentElement.querySelector(".helper");switch(e.error){case"required":e.element.classList.contains("invalid")||e.element.classList.add("invalid"),t.innerHTML="Champ obligatoire";break;default:e.element.classList.contains("invalid")||e.element.classList.add("invalid"),t.innerHTML="Erreur"}}))}},{key:"removeErrors",value:function(e){e.parentElement.querySelector(".helper").innerHTML="",e.classList.remove("invalid")}}]),t}(a.default);t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=o(n(0)),i=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.form=document.getElementById("divisions-form"),e.objectManager=new a.default,e.notif=new i.default("division-form"),e.exec(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"exec",value:function(){this.bindEvents()}},{key:"bindEvents",value:function(){var e=this,t=this.form.querySelector('input[name="divisionName"]'),n=this.form.querySelector('input[name="divisionLink"]'),r=this.form.querySelectorAll('input[name="divisionType"]'),a=this.form.querySelector('input[name="displayRegionsSelector"]');t.addEventListener("keyup",(function(){var n=t.parentElement.querySelector(".helper");t.value.length>0&&t.classList.contains("invalid")?e.removeErrors(t):t.value.length<=0&&!t.classList.contains("invalid")&&(n.innerHTML="Champ obligatoire",t.classList.add("invalid"))})),a.addEventListener("change",(function(){if(a.checked)return e.displayRegionSelector(!0),!0;e.displayRegionSelector(!1)})),[].forEach.call(r,(function(t){t.addEventListener("change",(function(){var n=e.objectManager.get("regions");if("districts"===t.value&&Object.keys(n).length>0)return e.displayCheckboxSelector(!0),!0;e.displayCheckboxSelector(!1)}))})),this.form.addEventListener("submit",(function(i){i.preventDefault();var o="regions",s=t.value,c=n.value,l=e.form.querySelector('select[name="region-selector"]').value,u=e.objectManager.get("regions",l);[].forEach.call(r,(function(e){e.checked&&(o=e.value)}));var f="regions"===o?{cities:[],districts:[]}:{cities:[]};if(e.notif.add(),s.length<=0)e.throwErrors({fields:[{element:t,error:"required"}],errorMessage:"Remplissez les champs nécessaires"});else{var d=e.objectManager.add(o,{name:s,link:c,attachment:f});if(a.checked&&"districts"===o&&Object.keys(u).length>0){var h=u.attachment.districts;h.indexOf(d)<0&&(h.push(d),e.objectManager.updateAttachments({name:d,type:"districts"},{name:l,type:"regions"})),e.objectManager.add("regions",{attachment:{cities:u.attachment.cities,districts:h}},l)}a.checked||"districts"!==o||e.objectManager.deleteAttachments(d,"districts");var p="regions"===o?"Votre région a bien été créée":"Votre département a bien été créé";e.notif.display("success",p),e.form.reset(),e.displayRegionSelector(!1)}}))}},{key:"displayRegionSelector",value:function(e){var t=this.form.querySelector('select[name="region-selector"]');return null!==t&&(e?(t.style.display="inline",!0):void(t.style.display="none"))}},{key:"displayCheckboxSelector",value:function(e){var t=this.form.querySelector('input[name="displayRegionsSelector"]'),n=this.form.querySelector('select[name="region-selector"]');return null!==t&&(e?(t.parentElement.style.display="block",!0):(t.checked=!1,n.style.display="none",void(t.parentElement.style.display="none")))}},{key:"throwErrors",value:function(e){var t=e.fields,n=e.errorMessage;t.forEach((function(e){var t=e.element.parentElement.querySelector(".helper");switch(e.error){case"required":e.element.classList.contains("invalid")||e.element.classList.add("invalid"),t.innerHTML="Champ obligatoire";break;default:e.element.classList.contains("invalid")||e.element.classList.add("invalid"),t.innerHTML="Erreur"}})),this.notif.display("error",n)}},{key:"removeErrors",value:function(e){e.parentElement.querySelector(".helper").innerHTML="",e.classList.remove("invalid")}}]),t}(a.default);t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),o=(r=i)&&r.__esModule?r:{default:r};var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.exec()}return a(e,[{key:"exec",value:function(){this.bindEvents()}},{key:"bindEvents",value:function(){window.addEventListener("storageChange",(function(e){(new o.default).exec()}))}}]),e}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(3),o=(r=i)&&r.__esModule?r:{default:r};var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data={},this.dlButton=document.getElementById("download-json"),this.bindEvents()}return a(e,[{key:"bindEvents",value:function(){this.dlButton.addEventListener("click",this.fillJsonfile.bind(this))}},{key:"fillJsonfile",value:function(){var e=JSON.stringify(o.default.getAllData()),t=JSON.stringify({jsonData:e}),n=new XMLHttpRequest;n.open("post","/api/writeJson"),n.setRequestHeader("Content-Type","application/json"),n.responseType="text",n.addEventListener("load",(function(){if(200!==n.status)throw new Error("request api failed");window.location.href=n.response})),n.send(t)}}]),e}();t.default=s},function(e,t,n){}]);
//# sourceMappingURL=app.js.map