!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.VkRnmExt=r():e.VkRnmExt=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="build",r(r.s=2)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.DEFAULT_RENAMES={geexup:"God"}},,function(e,r,t){"use strict";function n(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function o(){var e=0,r=[],t=Array.from(document.querySelectorAll(".im-mess-stack--lnk:not(.renamed)")),o=Array.from(document.querySelectorAll(".friends_field_title > a:not(.renamed)")),a=Array.from(document.querySelectorAll(".post_author > a.author:not(.renamed)"));a.push.apply(a,n(Array.from(document.querySelectorAll(".feedback_header > a.author:not(.renamed)")))),a.push.apply(a,n(Array.from(document.querySelectorAll("a.mem_link:not(.renamed)"))));var l=Array.from(document.querySelectorAll(".reply_author > a.author:not(.renamed)"));l.push.apply(l,n(Array.from(document.querySelectorAll(".reply_author > a.reply_to:not(.renamed)")))),l.push.apply(l,n(Array.from(document.querySelectorAll("a.wall_reply_greeting:not(.renamed)")))),r.push.apply(r,n(t)),r.push.apply(r,n(o)),r.push.apply(r,n(a)),r.push.apply(r,n(l)),r.forEach(function(r){var t=r.href.split("/").filter(function(e,r,t){return r===t.length-1})[0];void 0!==u[t]&&(r.innerText=u[t],e++),r.classList.add("renamed")}),e>0&&console.log("[Rename] "+e+" users was renamed")}var a=t(0),u={};chrome.runtime.sendMessage({method:"getLocalStorage",key:"RENAMES_OBJECT"},function(e){u=JSON.parse(e.data)||a.DEFAULT_RENAMES,o(),setInterval(o,300)})}])});