const $window = jQuery(window);


//is the element visible (css display/visibility/opacity and viewport scroll position)
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




//takes a jQuery object and returns the offset from the visible viewport
export function positionVisible($obj) {
	const offset = $obj.offset();
	const scroll = {};

	scroll.left = $window.scrollLeft();
	scroll.top = $window.scrollTop();

	const left = offset.left - scroll.left;
	const top = offset.top - scroll.top;
	const right = $window.outerWidth() - left - $obj.outerWidth();
	const bottom = $window.height() - top - $obj.outerHeight();

	return { top:top, right:right, bottom:bottom, left:left };
}




export function zIndexRange() {
	let highestZ = 0;
	let lowestZ = 0;
	let oneFound = false;
	const elements = document.getElementsByTagName('*');

	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].style.position && elements[i].style.zIndex) {
				if (oneFound) {
					let ii = parseInt(elements[i].style.zIndex);
					if (ii > highestZ) {
						highestZ = ii;
					}
					if (ii < lowestZ) {
						lowestZ = ii;
					}
				} else {
					highestZ = lowestZ = parseInt(elements[i].style.zIndex);
					oneFound = true;
				}
			}
		}
	}

	return { 'highestZ': highestZ, 'lowestZ': lowestZ };
}