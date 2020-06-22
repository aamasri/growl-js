const $window = jQuery(window);


// is the specified element visible (css display/visibility/opacity and viewport scroll position)
export function isVisible(el) {
	let $el;
	if (el.first()) {  //test is jquery collection
		$el = el;
		el = el.get(0)
	} else
		$el = $(el);

	//is object hidden
	if ($el.css('display') === 'none' || $el.css('visibility') === 'hidden' || !$el.css('opacity'))
		return false;

  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) && /*or $window.height() */
    rect.right <= (window.innerWidth || document. documentElement.clientWidth) /*or $window.width() */
  )
}




// takes a jQuery object and returns the offset from the visible viewport
export function positionVisible($obj) {
	const offset = $obj.offset();
	const scroll = {};

	scroll.left = $window.scrollLeft();
	scroll.top = $window.scrollTop();

	const left = offset.left - scroll.left;
	const top = offset.top - scroll.top;
	const right = $window.outerWidth() - left - $obj.outerWidth();
	const bottom = $window.height() - top - $obj.outerHeight();

	return { top: top, right: right, bottom: bottom, left: left };
}




/* Get the min/max z-indices of the document.
 *
 * @returns {Object}
 */
export function zIndexRange() {
	let highestZ = 0;
	let lowestZ = 0;
	const elements = document.getElementsByTagName('*');

	for (let i = 0; i < elements.length; i++) {
		let zIndex = getZIndex(elements[i]);

		if (zIndex) {
			if (zIndex > highestZ)
				highestZ = zIndex;
			else if (zIndex < lowestZ)
				lowestZ = zIndex;
		}
	}

	return { highest: highestZ, lowest: lowestZ };
}





/* Get the z-index of the the specified element.
 * The recursive option will
 *
 * @param {Element} element
 * @param { boolean | undefined } [recursive=undefined] - whether to traverse parents in search of z-index
 * @returns {number} - the z-index
 */
function getZIndex(element, recursive) {
	let zIndex;

	if (window.getComputedStyle)	// modern browsers
		zIndex = parseInt(window.getComputedStyle(element,null).getPropertyValue('z-Index'));

	else if (element.currentStyle)	// old browsers
		zIndex = parseInt(element.currentStyle.zIndex);

	zIndex = zIndex || 0;

	return (recursive && zIndex === 0) ? getZIndex(element.parentNode, true) : zIndex;
}





// reliably detects browser webp image support
export async function webpSupport() {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());
	return createImageBitmap(blob).then(() => true, () => false);
}




/* For determining the image resolution required
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