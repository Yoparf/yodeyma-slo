/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
 (function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)





 $(document).ready(function() {


 	$(".megamenu_style2 .main_menu_link").equalHeights2();
	$(".submenu").css('top',  $("#megamenuiqit").height() + 5 + "px");


 	$(window).resize(function() {
 		$(".megamenu_style2 .main_menu_link").css("height","auto");
 		$(".megamenu_style2 .main_menu_link").equalHeights2();
 		$(".submenu").css('top',  $("#megamenuiqit").height() + 5 + "px");
 		$('#megamenuiqit .has_submenu').each(function(index){ 
 			$(this).find('.submenu').css( "left", 0+"px" );
 		});
 		megaMenuWidthCn();
 	});

 	$(document).on('mouseenter', '.product_menu_container', function(e){
			$(this).find(".img_1").stop().fadeIn("fast");	
	});

	$(document).on('mouseleave', '.product_menu_container', function(e){
			$(this).find(".img_1").stop().fadeOut("fast");
	});


 	$("#megamenuiqit .mainmegamenu").hoverIntent(
 	{
 		over: makeTall,
 		out: makeShort,
 		timeout: 80
 	});



 	$("#megamenuiqit .has_submenu2").hoverIntent(
 	{
 		over: makeTall2,
 		out: makeShort2,
 		timeout: 150
 	});

 	$("#megamenuiqit .has_submenu3").hoverIntent(
 	{
 		over: makeTall3,
 		out: makeShort3,
 		timeout: 150
 	});


 	function makeTall3(){
 		$(this).find('.another_cats2').slideDown(300);
 	}

 	function makeShort3(){   
 		$(this).find('.another_cats2').slideUp(300);
 	}

 	function makeShort2(){   
 		$(this).find('.another_cats').fadeOut(300);
 	}



 	function makeTall2(){
 		$(this).find('.another_cats').css('left', 100);
 		$(this).find('.another_cats').show();
 		var sspos = $(this).find('.another_cats').offset().left;
 		$(this).find('.another_cats').hide();
 		if (sspos  + 200 > $(window).width()) {       
 			$(this).find('.another_cats').css('left', -200);        
 		}   
 		$(this).find('.another_cats').fadeIn(300);

 	}
 	function makeShort2(){   
 		$(this).find('.another_cats').fadeOut(300);
 	}




 	function makeTall(){
 		$(this).find(".main_menu_link").addClass("linkHover");
 		if ( $(this).hasClass("has_submenu") ) {
 			$(".submenu").css('top',  $("#megamenuiqit").height() + 5 + "px");
 			var comparewidth = $('#megamenuiqit').outerWidth();
 			var elwidth = ($(this).width()/2)-12;
 			var submenu = $(this).find('.submenu');
 			var subwidth = submenu.outerWidth();
 			var position = $(this).position();

 			if(subwidth==comparewidth)
 			{
 				submenu.css( "left", 0+"px" );
 				$(this).find('.submenu_triangle').css( "left", position.left+elwidth+"px" );
 				$(this).find('.submenu_triangle2').css( "left", position.left+elwidth-1+"px" );

 			}
 			else if((comparewidth-subwidth)<position.left){

 				submenu.css( "left", (comparewidth-subwidth)+"px" );

 				$(this).find('.submenu_triangle').css( "left", position.left-(comparewidth-subwidth)+elwidth+"px" );
 				$(this).find('.submenu_triangle2').css( "left", position.left-(comparewidth-subwidth)+elwidth-1+"px" );
 			}
 			else{
 				submenu.css( "left", position.left+"px" );
 				$(this).find('.submenu_triangle').css( "left", elwidth+"px" );
 				$(this).find('.submenu_triangle2').css( "left", elwidth-1+"px" );
 			}		

 			$(this).find(".submenu").fadeIn(200);
 			$(this).find(".right_panel ").css('min-height', $(this).find(".left_panel").height()-20+'px');
 		}}
 		function makeShort(){   
 			$(this).find(".submenu").fadeOut(200);
 			$(this).find(".main_menu_link").removeClass("linkHover");
 		}



 		function megaMenuWidthCn()
 		{

 			var comparewidth = $('#megamenuiqit').outerWidth();
 			$('#megamenuiqit .has_submenu').each(function(index){
 				var elwidth = ($(this).width()/2)-12;
 				var submenu = $(this).find('.submenu');
 				var subwidth = submenu.outerWidth();
 				var position = $(this).position();

 				if(subwidth==comparewidth)
 				{
 					submenu.css( "left", 0+"px" );
 					$(this).find('.submenu_triangle').css( "left", position.left+elwidth+"px" );
 					$(this).find('.submenu_triangle2').css( "left", position.left+elwidth-1+"px" );

 				}
 				else if((comparewidth-subwidth)<position.left){

 					submenu.css( "left", (comparewidth-subwidth)+"px" );

 					$(this).find('.submenu_triangle').css( "left", position.left-(comparewidth-subwidth)+elwidth+"px" );
 					$(this).find('.submenu_triangle2').css( "left", position.left-(comparewidth-subwidth)+elwidth-1+"px" );
 				}
 				else{
 					submenu.css( "left", position.left+"px" );
 					$(this).find('.submenu_triangle').css( "left", elwidth+"px" );
 					$(this).find('.submenu_triangle2').css( "left", elwidth-1+"px" );
 				}		
 			});

}

$('#responsiveAccordion li:has(ul)').each(function() {
	$(this).prepend('<div class="responsiveInykator">+</div>');
});

$("#responsiveMenuShower").click(function(){
	$("#responsiveAccordion").toggleClass("showedmenu");
});

$("#responsiveAccordion > li .responsiveInykator").on("click", function(event){

	if(false == $(this).parent().next().is(':visible')) {
		
		$('#responsiveAccordion > ul').slideUp(300);
	}
	if($(this).text()=="+")
		$(this).text("-");
	else
		$(this).text("+");
	$(this).parent().children('ul').slideToggle(300);
});

$('#responsiveAccordion > ul:eq(0)').show();

});