/*!
 * 
 *  growl-js package version 1.0.11
 *  (c) 2020 Ananda Masri
 *  Released under the MIT license
 *  auroraweb.ca/giving-back/growl
 *
 */
(self.webpackChunkgrowl_js=self.webpackChunkgrowl_js||[]).push([[518],{869:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ready:()=>ready,loaded:()=>loaded,$cache:()=>$cache,isInIframe:()=>isInIframe,isTouchDevice:()=>isTouchDevice,isMobile:()=>isMobile,isVisible:()=>isVisible,getViewportOffset:()=>getViewportOffset,onTopZIndex:()=>onTopZIndex,getZIndex:()=>getZIndex,getAppliedStyle:()=>getAppliedStyle,webpSupport:()=>webpSupport,screenResolution:()=>screenResolution,hash:()=>hash});const ready=()=>new Promise((resolve=>{"loading"!==document.readyState?resolve($cache()):document.addEventListener("DOMContentLoaded",(()=>{resolve($cache())}))})),loaded=()=>new Promise((resolve=>{"complete"===document.readyState?resolve($cache()):window.addEventListener("load",(()=>{resolve($cache())}))})),selectorCache={};function $cache(){return selectorCache.hasOwnProperty("$body")&&selectorCache.$body.length||(selectorCache.$window=jQuery(window),selectorCache.$document=jQuery(document),selectorCache.$body=jQuery("body")),selectorCache}function isInIframe(){return window.location!==window.parent.location}let cachedIsTouchDevice;function isTouchDevice(){if("boolean"==typeof cachedIsTouchDevice)return cachedIsTouchDevice;if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)return cachedIsTouchDevice=!0,cachedIsTouchDevice;const query=["("," -webkit- -moz- -o- -ms- ".split(" ").join("touch-enabled),("),"heartz",")"].join("");return cachedIsTouchDevice=!!function(query){return cachedIsTouchDevice=window.matchMedia(query).matches,cachedIsTouchDevice}(query),cachedIsTouchDevice}function isMobile(){return/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())}function isVisible(el){if(el instanceof jQuery&&(el=el[0]),"none"===getAppliedStyle(el,"display")||"hidden"===getAppliedStyle(el,"visibility")||parseFloat(getAppliedStyle(el,"opacity"))<.1)return!1;const rect=el.getBoundingClientRect();return rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth)}function getViewportOffset($element){if(!($element=jQuery($element)).length)return void console.error("function getViewportOffset(element) expects a DOM element or jQuery object!");const offset=$element.offset(),scroll={},$win=$cache().$window;scroll.left=$win.scrollLeft(),scroll.top=$win.scrollTop();const left=offset.left-scroll.left,top=offset.top-scroll.top;return{top:top,right:$win.outerWidth()-left-$element.outerWidth(),bottom:$win.height()-top-$element.outerHeight(),left:left}}function onTopZIndex(){let zTop=0;const elements=document.getElementsByTagName("*");for(let i=0;i<elements.length;i++){let zIndex=getZIndex(elements[i]);zIndex&&zIndex>zTop&&(zTop=zIndex)}return zTop}function getZIndex(element,recursive){const zIndex=parseInt(getAppliedStyle(element,"z-Index"))||0;return recursive&&0===zIndex?getZIndex(element.parentNode,!0):zIndex}function getAppliedStyle(element,style){return window.getComputedStyle(element).getPropertyValue(style)}async function webpSupport(){if(!self.createImageBitmap)return!1;const blob=await fetch("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=").then((r=>r.blob()));return createImageBitmap(blob).then((()=>!0),(()=>!1))}function screenResolution(){const pixelDensity=window.outerWidth*window.outerHeight;return pixelDensity>15e5?"hi":pixelDensity>5e5?"med":"lo"}function hash(content){let hash="";if(0===content.length)return hash;for(let i=0;i<content.length;i++){hash=(hash<<5)-hash+content.charCodeAt(i),hash&=hash}return hash}}}]);