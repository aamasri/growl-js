/**
 * @fileOverview A collection of DOM utils to add syntactic sugar and supplement jQuery.
 * @author Ananda Masri
 * @version 1.0.0
 */

"use strict";



/**
 * Defer execution until after document ready.
 *
 * Usage:
 *     import { ready } from 'dom-utils';
 *     ready().then(function() { ... });
 */
export const ready = () => new Promise((resolve) => {
	if (document.readyState !== 'loading')
		resolve($cache());
	else
		document.addEventListener('DOMContentLoaded', () => {
			resolve($cache());
		});
});


/**
 * Defer execution until after window has fully loaded (including images).
 *
 * Usage:
 * 	   import { loaded } from 'dom-utils';
 *     loaded().then(function() { ... });
 */
export const loaded = () => new Promise((resolve) => {
	if (document.readyState === 'complete')
		resolve($cache());
	else
		window.addEventListener('load', () => {
			resolve($cache());
		});
});




// jQuery selector cache
/**
 * Caches the jQuery window, document, & body elements.
 *
 * @returns {Object}
 */
const selectorCache = {};
export function $cache() {
	if (selectorCache.hasOwnProperty('$body') && selectorCache.$body.length)
		return selectorCache;

	selectorCache.$window = jQuery(window);
	selectorCache.$document = jQuery(document);
	selectorCache.$body = jQuery('body');

	return selectorCache;
}



/**
 * Whether the current window is actually a child window (contained in an iframe).
 *
 * @returns {boolean}
 */
export function isInIframe() {
	return window.location !== window.parent.location;
}


/**
 * Whether this device has a touch screen.
 *
 * @returns {boolean}
 */
let cachedIsTouchDevice;
export function isTouchDevice() {
	if (typeof cachedIsTouchDevice === 'boolean')
		return cachedIsTouchDevice;

	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
		cachedIsTouchDevice = true;
		return cachedIsTouchDevice;
	}

	// include the 'heartz' as a way to have a non matching MQ to help terminate the join
	// https://git.io/vznFH
	const mq = function (query) {
		cachedIsTouchDevice = window.matchMedia(query).matches;
		return cachedIsTouchDevice;
	};

	const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
	const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
	cachedIsTouchDevice = !!mq(query);
	return cachedIsTouchDevice;
}





/**
 * Whether this device is a recognized mobile device.
 *
 * @returns {boolean}
 */
export function isMobile() {
	return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
}





/**
 * Whether the specified element is visible (ie. css display/visibility/opacity and viewport scroll position).
 *
 * @param {Element | Node | ParentNode | jQuery} el
 * @returns {boolean}
 */
export function isVisible(el) {
	if (el instanceof jQuery)
		el = el[0];

	//is object hidden
	if (getAppliedStyle(el, 'display') === 'none' || getAppliedStyle(el, 'visibility') === 'hidden' || parseFloat(getAppliedStyle(el, 'opacity')) < 0.1)
		return false;

	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}





/** Returns the specified element's offset from the visible viewport.
 *
 * @param {Element | jQuery} $element
 * @returns {Object}
 */
export function getViewportOffset($element) {
	$element = jQuery($element);
	const offset = $element.offset();
	const scroll = {};
	const $win = $cache().$window;

	scroll.left = $win.scrollLeft();
	scroll.top = $win.scrollTop();

	const left = offset.left - scroll.left;
	const top = offset.top - scroll.top;
	const right = $win.outerWidth() - left - $element.outerWidth();
	const bottom = $win.height() - top - $element.outerHeight();

	return { top: top, right: right, bottom: bottom, left: left };
}




/** Get the highest z-index in the document.
 *
 * @returns {number}
 */
export function onTopZIndex() {
	let zTop = 0;
	const elements = document.getElementsByTagName('*');

	for (let i = 0; i < elements.length; i++) {
		let zIndex = getZIndex(elements[i]);

		if (zIndex && zIndex > zTop)
			zTop = zIndex;
	}

	return zTop;
}





/**
 * Get the z-index of the the specified element.
 * The recursive option will traverse the parent tree (z-index includes descendents)
 *
 * @param {Element | Node | ParentNode} element
 * @param {boolean | undefined} [recursive=undefined] - whether to traverse parents in search of z-index
 * @returns {number} - the z-index
 */
function getZIndex(element, recursive) {
	const zIndex = parseInt(getAppliedStyle(element, 'z-Index')) || 0;

	return (recursive && zIndex === 0) ? getZIndex(element.parentNode, true) : zIndex;
}





/**
 * Get the computed style of the the specified element and style.
 *
 * @param {Element | Node | ParentNode} element
 * @param {string} style - eg. 'z-index' or 'margin'
 * @returns {string} - the style value
 */
export function getAppliedStyle(element, style) {
	return window.getComputedStyle(element).getPropertyValue(style);
}





/**
 * Whether the browser supports webp images.
 *
 * @returns {boolean}
 */
export async function webpSupport() {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());
	return createImageBitmap(blob).then(() => true, () => false);
}




/**
 * Part of a system to determine the best image resolution for a given device.
 *
 * @returns {string} - lo|med|hi
 */
export function screenResolution() {
	const pixelDensity = window.outerWidth * window.outerHeight;
	// iPhone SE:  320 x 568	 182k	lo
	// iPhone 8:   375 x 667     250k   lo
	// iPhone 8+:  414 x 736     305k   lo
	// iPad":      768 x 1024    786k   med
	// iPad Pro+:  1024 x 1365   1.4M   med
	// my desktop: 1024 x 1920   2M     hi
	// my 4k:      3200 x 1800   5.8M   hi

	if (pixelDensity > 1500000)
		return 'hi';

	else if (pixelDensity > 500000)
		return 'med';

	return 'lo';
}