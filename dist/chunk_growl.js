/*!
 * 
 *  growl-js package version 1.0.17
 *  (c) 2020 Ananda Masri
 *  Released under the MIT license
 *  auroraweb.ca/giving-back/growl
 *
 */
"use strict";(self.webpackChunkgrowl_js=self.webpackChunkgrowl_js||[]).push([[534],{465:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>growl});let growlMessageCount=0;async function growl(options){void 0===window.jQuery&&(window.jQuery=await __webpack_require__.e(729).then(__webpack_require__.t.bind(__webpack_require__,755,23)),window.jQuery=window.jQuery.default),void 0===window.anime&&(window.anime=await __webpack_require__.e(342).then(__webpack_require__.bind(__webpack_require__,30)),window.anime=window.anime.default);const domUtils=await __webpack_require__.e(518).then(__webpack_require__.bind(__webpack_require__,869));var string;"string"==typeof(options=options||{}).message&&options.message.length?options.message=(string=options.message,decodeURIComponent(string.replace(/%2526/g,"&").replace(/%2520/g," ").replace(/%252520/g," ").replace(/\n/g,"<br>"))):(options.message="Missing message content!",options.type="error",options.duration=0),options.overwrite=options.overwrite||!1;const messageLength=options.message.length;growlMessageCount++;const $body=jQuery("body");let icon,durationMultiplier;switch(options.type){case"success":icon='<svg class="icon text-success" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">\n                        <path d="M0,172v-172h172v172z" fill="none"/>\n                        <path d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM124.45347,72.85347l-43.344,43.344c-1.07787,1.07787 -2.53413,1.67987 -4.05347,1.67987c-1.51933,0 -2.98133,-0.602 -4.05347,-1.67987l-19.7972,-19.7972c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693c2.24173,-2.24173 5.8652,-2.24173 8.10693,0l15.74373,15.74373l39.29053,-39.29053c2.24173,-2.24173 5.8652,-2.24173 8.10693,0c2.24173,2.24173 2.24173,5.8652 0,8.10693z"/>\n                    </svg>',durationMultiplier=30;break;case"danger":case"error":icon='<svg class="icon text-danger" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">\n                        <path d="M0,172v-172h172v172z" fill="none"/>\n                        <path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM114.66667,111.08333c0,9.89717 -8.0195,17.91667 -17.91667,17.91667h-15.0715c-4.37167,0 -8.31333,-1.68417 -11.34483,-4.37167l-0.5805,-0.48017c-0.13617,-0.129 -0.27233,-0.26517 -0.40133,-0.40133l-24.50283,-24.50283c-1.01767,-1.01767 -1.01767,-2.68033 0,-3.698v0c3.17483,-3.17483 8.32767,-3.17483 11.5025,0l8.1485,8.1485v-49.9445c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v21.5c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-28.66667c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v28.66667c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-28.66667c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333v28.66667c0,1.978 1.60533,3.58333 3.58333,3.58333v0c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-14.33333c0,-1.978 1.60533,-3.58333 3.58333,-3.58333v0c1.978,0 3.58333,1.60533 3.58333,3.58333z"/>\n                    </svg>',durationMultiplier=60;break;case"warning":icon='<svg class="icon text-warning" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">\n                        <path d="M0,172v-172h172v172z" fill="none"/>\n                        <path d="M167.29688,133.1863l-66.51563,-115.20072c-8.14003,-14.08353 -21.42247,-14.08353 -29.5625,0l-66.51562,115.20072c-8.14003,14.08353 -1.47296,25.58293 14.78125,25.58293h133.03125c16.25421,0 22.89543,-11.4994 14.78125,-25.58293zM76.85217,50.67488c2.40324,-2.58413 5.42668,-3.8762 9.14783,-3.8762c3.72115,0 6.74459,1.26622 9.14784,3.82452c2.35156,2.53245 3.5661,5.73678 3.5661,9.58714c0,3.28185 -4.96154,27.57271 -6.61538,45.22235h-11.96454c-1.44712,-17.64964 -6.84796,-41.94051 -6.84796,-45.22235c0,-3.79868 1.21454,-6.97717 3.56611,-9.53546zM94.96695,134.65926c-2.50661,2.42908 -5.50421,3.66947 -8.96695,3.66947c-3.46274,0 -6.46033,-1.24038 -8.96695,-3.66947c-2.50661,-2.45493 -3.74699,-5.40084 -3.74699,-8.88942c0,-3.46274 1.24038,-6.46034 3.74699,-8.96695c2.50662,-2.50661 5.50421,-3.74699 8.96695,-3.74699c3.46274,0 6.46034,1.24038 8.96695,3.74699c2.50661,2.50661 3.74699,5.50421 3.74699,8.96695c0,3.48858 -1.24038,6.43449 -3.74699,8.88942z"/>\n                    </svg>',durationMultiplier=50;break;default:icon='<svg class="icon text-info" viewBox="0 0 172 172" xmlns="http://www.w3.org/2000/svg" focusable="false">\n                        <path d="M0,172v-172h172v172z" fill="none"/>\n                        <path d="M86,6.88c-43.69832,0 -79.12,35.42168 -79.12,79.12c0,43.69832 35.42168,79.12 79.12,79.12c43.69832,0 79.12,-35.42168 79.12,-79.12c0,-43.69832 -35.42168,-79.12 -79.12,-79.12zM86,37.84c5.70008,0 10.32,4.61992 10.32,10.32c0,5.70008 -4.61992,10.32 -10.32,10.32c-5.70008,0 -10.32,-4.61992 -10.32,-10.32c0,-5.70008 4.61992,-10.32 10.32,-10.32zM99.76,130.72h-6.88h-13.76h-6.88v-6.88h6.88v-44.72h-6.88v-6.88h6.88h13.76v6.88v44.72h6.88z"/>\n                    </svg>',options.type="info",durationMultiplier=40}options.message=icon+'</span><div class="message">'+options.message+'</div><div style="clear:both;"></div>';const onTop=domUtils.onTopZIndex()+1;let $growlBox,growlOffset={},targetSpace={},$target=jQuery(options.target);if($target.length&&(targetSpace=domUtils.getViewportOffset($target),("object"!=typeof targetSpace||!domUtils.isVisible($target)||targetSpace.top<100&&targetSpace.right<100&&targetSpace.bottom<100&&targetSpace.left<100)&&(options.target=!1,$target=jQuery())),$target.length){let targetId="growl-"+$target.prop("id");targetId=targetId||"noTargetId";let $existingGrowl=jQuery("div.growlBox."+targetId);if($growlBox=jQuery('<div id="growlBox'+growlMessageCount+'" class="growlBox '+targetId+" "+options.type+'" style="position:absolute;"></div>'),$growlBox.append('<div class="content" style="position:relative; word-wrap:break-word;">'+options.message+"</div>"),$growlBox.appendTo($body),improveGrowlAspectRatio($growlBox),"noTargetId"!==targetId&&$existingGrowl.length&&!options.overwrite){if($existingGrowl=$existingGrowl.last(),$existingGrowl.find("div.message").text()===$growlBox.find("div.message").text())return void $growlBox.remove();growlOffset=$existingGrowl.offset(),growlOffset.top+=$existingGrowl.outerHeight()+15}else{$existingGrowl.length&&options.overwrite&&closeGrowl($existingGrowl),$growlBox.prepend('<div class="bubble"><div class="bubble"></div></div>');const $bubbles=$growlBox.find("div.bubble"),$largeBubble=$bubbles.last(),$smallBubble=$bubbles.first(),bubbleSize=Math.sqrt($growlBox.outerHeight()*$growlBox.outerWidth())/4;$largeBubble.css({width:bubbleSize,height:bubbleSize,"border-radius":bubbleSize/2}),$smallBubble.css({width:bubbleSize/2,height:bubbleSize/2,"border-radius":bubbleSize/4}),anime({targets:$bubbles.toArray(),opacity:[{value:[0,1],duration:1500}]});const OFFSET=20,GROWL_WIDTH=$growlBox.outerWidth(),WINDOW_WIDTH=jQuery(window).width(),targetOffset=$target.offset();if(targetSpace.right>targetSpace.left){$smallBubble.css("left","-20px"),$largeBubble.css("left","5px");let leftOffset=targetOffset.left+$target.outerWidth()+OFFSET;growlOffset.left=WINDOW_WIDTH-leftOffset<GROWL_WIDTH?leftOffset-GROWL_WIDTH:leftOffset,$growlBox.addClass("right"),$growlBox.css("margin","0 10px 0 0")}else{$smallBubble.css("left",GROWL_WIDTH+"px"),$largeBubble.css("left",-bubbleSize/1.5+"px");let leftOffset=targetOffset.left-GROWL_WIDTH-OFFSET;growlOffset.left=leftOffset<OFFSET?OFFSET:leftOffset,$growlBox.addClass("left"),$growlBox.css("margin","0 0 0 10px")}targetSpace.top>targetSpace.bottom?($smallBubble.css("top",$growlBox.outerHeight()+"px"),$largeBubble.css("top",-bubbleSize/1.5+"px"),growlOffset.top=targetOffset.top-$growlBox.outerHeight()-OFFSET,$growlBox.addClass("above")):($largeBubble.css("top","5px"),$smallBubble.css("top","-20px"),growlOffset.top=targetOffset.top+$target.outerHeight()+OFFSET,$growlBox.addClass("below"))}$growlBox.css({top:growlOffset.top+"px",left:growlOffset.left+"px","z-index":onTop}),$target.on("remove",(function(){$target.length||closeGrowl($growlBox)}))}else{let $growlNoticeboard=jQuery("#growlNoticeboard");$growlNoticeboard.length||($growlNoticeboard=jQuery('<div id="growlNoticeboard"></div>').appendTo($body),domUtils.isVisible($growlNoticeboard)||$growlNoticeboard.css({top:"10px",right:"10px"})),options.overwrite&&($growlNoticeboard.children("div.growlBox").each((function(){closeGrowl(this)})),$growlNoticeboard.empty()),$growlNoticeboard.css("z-index",onTop),$growlBox=jQuery('<div id="growlBox'+growlMessageCount+'" class="growlBox '+options.type+'" style="position:relative;"></div>'),$growlBox.append('<div class="content" style="position:relative; word-wrap:break-word;">'+options.message+"</div>"),$growlBox.appendTo($growlNoticeboard),improveGrowlAspectRatio($growlBox)}switch(options.duration){case!1:case"false":case 0:case"0":options.duration=0;break;case void 0:case"undefined":options.duration=1e3+messageLength*durationMultiplier;break;default:options.duration*=1e3}if(0!==options.duration&&options.duration>=2e3){$growlBox.append('<div class="progress" style="width:99%"></div>'),$growlBox.append('<div style="clear:both"></div>');const $progressBar=$growlBox.find(".progress");anime({targets:$progressBar[0],width:0,easing:"linear",duration:options.duration,complete:function(){$progressBar.remove()}})}await async function($growlBox,durationMs){const easeInDuration=400,autoCloseGrowl=!!durationMs;durationMs=durationMs&&durationMs>1e3?durationMs-easeInDuration:1e3,$growlBox.on("click",(function(evt){closeGrowl(evt.target)})),await anime({targets:$growlBox[0],opacity:[{value:[0,1],duration:easeInDuration}],scale:[{value:[0,1],duration:easeInDuration},{value:1,duration:durationMs}],easing:"easeOutElastic(1, 0.6)"}).finished,autoCloseGrowl&&!0&&closeGrowl($growlBox)}($growlBox,options.duration)}function improveGrowlAspectRatio($growlBox){let width=$growlBox.width();const aspectRatio=width/$growlBox.height();width>250&&aspectRatio>3&&(width=1.5*width/Math.sqrt(aspectRatio),$growlBox.width(width))}function closeGrowl($element){const $growlBox=($element=jQuery($element)).closest("div.growlBox");anime({targets:$growlBox[0],opacity:0,easing:"easeOutExpo",duration:700,complete:function(){$growlBox.remove()}})}}}]);