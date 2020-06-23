/*
 * growl.js
 * (c) 2020 Ananda Masri
 * Released under the MIT license
 * auroraweb.ca/giving-back/growl
 */

import './growl.styl';

// module scope vars
const debug = false;
let growlMessageCount = 0;


/* launches a popup notification with options
 *
 * options object
 * 		message: 		[STRING] 			the (HTML) message content to display
 * 		type:			[STRING] 			(optional) the type of message ie. success, error, warning, info (default)
 * 		target: 		[STRING] 			(optional) target element (DOM element, css selector string, or jQuery object) to attach the growl notification, else will be appended to #growlNoticeboard
 * 		duration:		[NUMBER] 			(optional) how long the message is displayed (in seconds). 0 implies forever (ie dismissed by end-user).  Default: automatic
 * 		overwrite:		[BOOLEAN]  			(optional) make this growl message replace any existing message on the specified target
 *
 *
 * @param {Object.<string, {
 *      message: string,
 *      type: string
 *      target: string | undefined,
 *      duration: number | undefined,
 *      overwrite: boolean | undefined,
 *
 * }>} options
 *
 * @returns {void}
 */
export default async function growl(options) {
    // lazy load of dependencies
    if (window.jQuery === undefined) {
        window.jQuery = await import(/* webpackChunkName: "jquery" */ 'jquery');
        window.jQuery = window.jQuery.default;
    }

    if (debug) console.log('checking window.jQuery loaded', window.jQuery);

    if (window.anime === undefined) {
        window.anime = await import(/* webpackChunkName: "anime" */ 'animejs/lib/anime.es.js');
        window.anime = window.anime.default;
    }

    const domUtils = await import(/* webpackChunkName: "dom-utils" */ '@aamasri/dom-utils');

    if (debug) console.log('checking window.anime loaded', window.anime);

    options = options || {};

    // warn if no message supplied
    if (typeof options.message !== 'string' || !options.message.length) {
        options.message = 'Missing message content!';
        options.type = 'error';
        options.duration = 0;   // persistent (provides a means to examine the growl DOM)
    } else
        options.message = decode(options.message);

    options.overwrite = options.overwrite || false;
    const messageLength = options.message.length;	// before message includes icon
    growlMessageCount++;
    const $body = jQuery('body');

    // select icon for known message types
    let icon, durationMultiplier;
    switch (options.type) {
        case 'success':
            icon = `<svg class="icon text-success" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">
                        <path d="M0,172v-172h172v172z" fill="none"/>
                        <path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM124.45347,72.85347l-43.344,43.344c-1.07787,1.07787 -2.53413,1.67987 -4.05347,1.67987c-1.51933,0 -2.98133,-0.602 -4.05347,-1.67987l-19.7972,-19.7972c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693c2.24173,-2.24173 5.8652,-2.24173 8.10693,0l15.74373,15.74373l39.29053,-39.29053c2.24173,-2.24173 5.8652,-2.24173 8.10693,0c2.24173,2.24173 2.24173,5.8652 0,8.10693z"/>
                    </svg>`;
            durationMultiplier = 30;
            break;

        case 'danger':
        case 'error':
            icon = `<svg class="icon text-danger" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">
                        <path d="M0,172v-172h172v172z" fill="none"/>
                        <path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM114.66667,111.08333c0,9.89717 -8.0195,17.91667 -17.91667,17.91667h-15.0715c-4.37167,0 -8.31333,-1.68417 -11.34483,-4.37167l-0.5805,-0.48017c-0.13617,-0.129 -0.27233,-0.26517 -0.40133,-0.40133l-24.50283,-24.50283c-1.01767,-1.01767 -1.01767,-2.68033 0,-3.698v0c3.17483,-3.17483 8.32767,-3.17483 11.5025,0l8.1485,8.1485v-49.9445c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v21.5c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-28.66667c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v28.66667c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-28.66667c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v28.66667c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-14.33333c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333z"/>
                    </svg>`;
            durationMultiplier = 60;
            break;

        case 'warning':
            icon = `<svg class="icon text-warning" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">
                        <path d="M0,172v-172h172v172z" fill="none"/>
                        <path d="M167.29688,133.1863l-66.51563,-115.20072c-8.14003,-14.08353 -21.42247,-14.08353 -29.5625,0l-66.51562,115.20072c-8.14003,14.08353 -1.47296,25.58293 14.78125,25.58293h133.03125c16.25421,0 22.89543,-11.4994 14.78125,-25.58293zM76.85217,50.67488c2.40324,-2.58413 5.42668,-3.8762 9.14783,-3.8762c3.72115,0 6.74459,1.26622 9.14784,3.82452c2.35156,2.53245 3.5661,5.73678 3.5661,9.58714c0,3.28185 -4.96154,27.57271 -6.61538,45.22235h-11.96454c-1.44712,-17.64964 -6.84796,-41.94051 -6.84796,-45.22235c0,-3.79868 1.21454,-6.97717 3.56611,-9.53546zM94.96695,134.65926c-2.50661,2.42908 -5.50421,3.66947 -8.96695,3.66947c-3.46274,0 -6.46033,-1.24038 -8.96695,-3.66947c-2.50661,-2.45493 -3.74699,-5.40084 -3.74699,-8.88942c0,-3.46274 1.24038,-6.46034 3.74699,-8.96695c2.50662,-2.50661 5.50421,-3.74699 8.96695,-3.74699c3.46274,0 6.46034,1.24038 8.96695,3.74699c2.50661,2.50661 3.74699,5.50421 3.74699,8.96695c0,3.48858 -1.24038,6.43449 -3.74699,8.88942z"/>
                    </svg>`;
            durationMultiplier = 50;
            break;

        default:
            icon = `<svg class="icon text-info" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">
                        <path d="M0,172v-172h172v172z" fill="none"/>
                        <path d="M86,6.88c-43.69832,0 -79.12,35.42168 -79.12,79.12c0,43.69832 35.42168,79.12 79.12,79.12c43.69832,0 79.12,-35.42168 79.12,-79.12c0,-43.69832 -35.42168,-79.12 -79.12,-79.12zM86,37.84c5.70008,0 10.32,4.61992 10.32,10.32c0,5.70008 -4.61992,10.32 -10.32,10.32c-5.70008,0 -10.32,-4.61992 -10.32,-10.32c0,-5.70008 4.61992,-10.32 10.32,-10.32zM99.76,130.72h-6.88h-13.76h-6.88v-6.88h6.88v-44.72h-6.88v-6.88h6.88h13.76v6.88v44.72h6.88z"/>
                    </svg>`;
            options.type = 'info';
            durationMultiplier = 40;
    }

    // merge icon into message content
    options.message = icon + '</span><div class="message">' + options.message + '</div><div style="clear:both;"></div>';

    const onTop = domUtils.onTopZIndex();
    let $growlBox;
    let growlOffset = {};
    let targetSpace = {};

    // cancel any specified target that's not actually visible in the viewport
    let $target = jQuery(options.target);
    if ($target.length) {
        targetSpace = domUtils.getViewportOffset($target);

        if (targetSpace.top < 0 || targetSpace.left < 0) {
            options.target = false;
            $target = jQuery();
        }
    }

    // setup growl on a target
    if ($target.length) {
        // position growl relative to specified target element

        // determine the growl id for this target
        let targetId = 'growl-' + $target.prop('id');		// the growl prefix avoids collision with assignValue() server calls
        targetId = (targetId) ? targetId : 'noTargetId';

        // get any existing growl associated with this target (before creating the new one)
        let $existingGrowl = jQuery('div.growlBox.' + targetId);

        // create the new growl message box & insert the growl message content - position:relative allows content to show on top of bubbles
        $growlBox = jQuery('<div id="growlBox' + growlMessageCount + '" class="growlBox '+targetId+' '+options.type+'" style="position:absolute;"></div>');
        $growlBox.append('<div class="content" style="position:relative; word-wrap:break-word;">'+options.message+'</div>');
        $growlBox.appendTo($body);


        improveGrowlAspectRatio($growlBox);

        // existing growl message for the specified target - if so position this message imediately under existing message (or replace if "overwrite" option set)
        if (targetId !== 'noTargetId' && $existingGrowl.length && !options.overwrite) {
            $existingGrowl = $existingGrowl.last();
            // don't show the same message again
            if ($existingGrowl.find('div.message').text() === $growlBox.find('div.message').text()) {
                $growlBox.remove();
                // console.info('second growl with same target id ('+targetId+') suppressed.' );
                return;
            }
            // position this message immediately under existing message
            growlOffset = $existingGrowl.offset();
            growlOffset.top += $existingGrowl.outerHeight() + 15;
        } else {
            // no existing growl message for specified target or overwrite mode set
            if ($existingGrowl.length && options.overwrite)
                closeGrowl($existingGrowl);

            // insert the thought bubbles - not essential but nice touch
            $growlBox.prepend('<div class="bubble"><div class="bubble"></div></div>');
            const $bubbles = $growlBox.find('div.bubble');
            const $largeBubble = $bubbles.last();
            const $smallBubble = $bubbles.first();
            const bubbleSize = Math.sqrt($growlBox.outerHeight() * $growlBox.outerWidth()) / 4;
            $largeBubble.css({'width':bubbleSize, 'height':bubbleSize, 'border-radius':bubbleSize/2 });
            $smallBubble.css({'width':bubbleSize/2, 'height':bubbleSize/2, 'border-radius':bubbleSize/4 });

            // chain animate bubbles & growl box so that they appear one after another
            anime({
                targets: $bubbles.toArray(),
                opacity: [
                    { value: [ 0, 1 ], duration: 1500 },
                ]
            });

            const OFFSET = 20;
            const GROWL_WIDTH = $growlBox.outerWidth();
            const WINDOW_WIDTH = jQuery(window).width();
            const targetOffset = $target.offset();

            // move the growl box over the specified target (but ensure message display inside the browser visible area)
            if (targetSpace.right > targetSpace.left) {
                // more space on the right of the target
                $smallBubble.css('left', '-20px');
                $largeBubble.css('left', '5px');
                let leftOffset = targetOffset.left + $target.outerWidth() + OFFSET;
                growlOffset.left = ((WINDOW_WIDTH - leftOffset) < GROWL_WIDTH) ? leftOffset - GROWL_WIDTH : leftOffset;
                $growlBox.addClass('right');
                $growlBox.css('margin', '0 10px 0 0');
            } else {
                // show growl to left of target
                $smallBubble.css('left', GROWL_WIDTH + 'px');
                $largeBubble.css('left', - bubbleSize/1.5 + 'px');
                let leftOffset = targetOffset.left - GROWL_WIDTH - OFFSET;
                growlOffset.left = (leftOffset < OFFSET) ? OFFSET : leftOffset;
                $growlBox.addClass('left');
                $growlBox.css('margin', '0 0 0 10px');
            }
            if (targetSpace.top > targetSpace.bottom) {
                // more space above target)
                $smallBubble.css('top', $growlBox.outerHeight() + 'px');
                $largeBubble.css('top', -bubbleSize/1.5 + 'px');
                growlOffset.top = targetOffset.top - $growlBox.outerHeight() - OFFSET;
                $growlBox.addClass('above');
            } else {
                // show growl below target
                $largeBubble.css('top', '5px');
                $smallBubble.css('top', '-20px');
                growlOffset.top = targetOffset.top + $target.outerHeight() + OFFSET;
                $growlBox.addClass('below');
            }
        }

        // apply the calculated position & z-index to the new growl message
        $growlBox.css({ 'top': growlOffset.top + 'px', 'left': growlOffset.left + 'px', 'z-index': onTop });

        // remove the growl box if it's target element disappears
        $target.on('remove', function () {
            if (!$target.length)
                closeGrowl($growlBox);
        });
    } else {
        // no specified target or specified target is scrolled outside the viewport
        let $growlNoticeboard = jQuery('#growlNoticeboard');

        // no target element specified - display the message on the growl noticeboard
        if (!$growlNoticeboard.length) {
            $growlNoticeboard = jQuery('<div id="growlNoticeboard"></div>').appendTo($body);

            // if $growlNoticeboard is not visible in the viewport then position it in top/right corner
            if (!domUtils.isVisible($growlNoticeboard))
                $growlNoticeboard.css({ 'top':'10px', 'right':'10px' });
        }

        // create the growl box
        if (options.overwrite) {
            $growlNoticeboard.children('div.growlBox').each(function() {
                closeGrowl(this);
            });
            $growlNoticeboard.empty();
        }

        $growlNoticeboard.css('z-index', onTop);	// position noticeboard on top

        // create growl, it's message content and append it to noticeboard
        $growlBox = jQuery('<div id="growlBox' + growlMessageCount + '" class="growlBox '+options.type+'" style="position:relative;"></div>');
        $growlBox.append('<div class="content" style="position:relative; word-wrap:break-word;">'+options.message+'</div>');
        $growlBox.appendTo($growlNoticeboard);

        improveGrowlAspectRatio($growlBox);
    }


    // normalize growl message duration in mS
    switch (options.duration) {
        case false:
        case 'false':
        case 0:
        case '0':
            options.duration = 0;		// user must dismiss the growl manually
            break;

        case undefined:
        case 'undefined':
            options.duration = 1000 + (messageLength * durationMultiplier);	// auto duration based on message length
            break;

        default:
            options.duration *= 1000;	// seconds ---> ms
            break;
    }


    // add a countdown display (only if the message has a finite duration and will be around for a while)
    if (options.duration !== 0 && options.duration >= 2000) {
        $growlBox.append('<div class="progress" style="width:99%"></div>');

        // force growl box to enclose floated elements like the countdown and the disable tutorial button
        $growlBox.append('<div style="clear:both"></div>');

        const $progressBar = $growlBox.find('.progress');

        // animate progress bar
        anime({
            targets: $progressBar[0],
            width: 0,
            easing: 'linear',
            duration: options.duration,
            complete: function() {
                $progressBar.remove();
            },
        });
    }

    await popupGrowl($growlBox, options.duration);
}




// improve growl box aspect ratio
function improveGrowlAspectRatio($growlBox) {
    const $message = $growlBox.find('.message');

    let width = $growlBox.width();
    const height = $growlBox.height();
    const aspectRatio = width / height;
    if (debug) console.debug(`growl box has a width of ${width} and aspect ratio of ${aspectRatio}`);

    if (width > 250 && aspectRatio > 3) {
        width = width * 1.5 / Math.sqrt(aspectRatio);
        $growlBox.width(width);
        if (debug) console.debug(`squared up growl box width`, $message.css('width'));
    }
}





async function popupGrowl($growlBox, durationMs) {
    const easeInDuration = 400;
    const autoCloseGrowl = !!durationMs;
    durationMs = (durationMs && durationMs > 1000) ? durationMs - easeInDuration : 1000;

    // close on click on growl message
    $growlBox.on('click', function(evt) {
        closeGrowl(evt.target);
    });

    // popup animation followed by message duration delay
    await anime({
            targets: $growlBox[0],
            opacity: [
                { value: [ 0, 1 ], duration: easeInDuration },
            ],
            scale: [
                { value: [ 0, 1 ], duration: easeInDuration },
                { value: 1, duration: durationMs },	// delay growl removal
            ],
            easing: 'easeOutElastic(1, 0.6)'
    }).finished;

    if (autoCloseGrowl && !debug)
        closeGrowl($growlBox);
}



function closeGrowl($element) {
    $element = jQuery($element);
    const $growlBox = $element.closest('div.growlBox');

    // remove the growl message
    anime({
        targets: $growlBox[0],
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 700,
        complete: function() {
            $growlBox.remove();
        },
    });
}



// this function is compatible with php's urlencode (use this instead of decodeURIComponent)
function decode(string) {
    return decodeURIComponent(string.replace(/%2526/g, '&').replace(/%2520/g, ' ').replace(/%252520/g, ' ').replace(/\n/g, '<br>'));
}

