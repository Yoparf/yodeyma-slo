/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
//global variables
var responsiveflag = false;

$(document).ready(function(){
	headerToMenuMobile();
	highdpiInit();
	responsiveResize();
	$(window).resize(responsiveResize);
	if (navigator.userAgent.match(/Android/i))
	{
		var viewport = document.querySelector('meta[name="viewport"]');
		viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
		window.scrollTo(0, 1);
	}
	blockHover();
	if (typeof quickView !== 'undefined' && quickView)
		quick_view();
	dropDown();

	if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product']))
	{
		bindGrid();

 		$(document).on('change', '.selectProductSort', function(e){
			if (typeof request != 'undefined' && request)
				var requestSortProducts = request;
 			var splitData = $(this).val().split(':');
			if (typeof requestSortProducts != 'undefined' && requestSortProducts)
				document.location.href = requestSortProducts + ((requestSortProducts.indexOf('?') < 0) ? '?' : '&') + 'orderby=' + splitData[0] + '&orderway=' + splitData[1];
    	});

		$(document).on('change', 'select[name="n"]', function(){
			$(this.form).submit();
		});

		$(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
			if (this.value != '')
				location.href = this.value;
		});

		$(document).on('change', 'select[name="currency_payement"]', function(){
			setCurrency($(this).val());
		});
	}

	$(document).on('click', '.back', function(e){
		e.preventDefault();
		history.back();
	});
	
	jQuery.curCSS = jQuery.css;
	if (!!$.prototype.cluetip)
		$('a.cluetip').cluetip({
			local:true,
			cursor: 'pointer',
			dropShadow: false,
			dropShadowSteps: 0,
			showTitle: false,
			tracking: true,
			sticky: false,
			mouseOutClose: true,
			fx: {             
		    	open:       'fadeIn',
		    	openSpeed:  'fast'
			}
		}).css('opacity', 0.8);

	if (!!$.prototype.fancybox)
		$.extend($.fancybox.defaults.tpl, {
			closeBtn : '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		});
	//Nuevas direcciones alert call
	$('#new-address-call').click(function(e){
		e.preventDefault();
		$('#new-address-call-alert').fadeIn();
	});
	//Botones más y menos búsqueda predictiva busqueda predictiva
	$('#search_block_top').on('click','.b2b-quantity-more', function(e) {
		e.preventDefault();
		$product_id = $(this).attr('data-id');
		$product_id_quantity = $('#ajax_id_product_quantity_'+$product_id).val();
		$product_id_quantity++;
		$('#ajax_id_product_quantity_'+$product_id).val($product_id_quantity);
	});
	$('#search_block_top').on('click','.b2b-quantity-less', function(e) {
		e.preventDefault();
		$product_id = $(this).attr('data-id');
		$product_id_quantity = $('#ajax_id_product_quantity_'+$product_id).val();
		$product_id_quantity--;
		if($product_id_quantity < 1) {
			$product_id_quantity = 1;
		}
		$('#ajax_id_product_quantity_'+$product_id).val($product_id_quantity);
	});
	//Botones más y menos product list
	//$('.product_list').on('click','.b2b-quantity-more', function(e) {
	$('#product-list-content').on('click','.b2b-quantity-more', function(e) {
		e.preventDefault();
		$product_id = $(this).attr('data-id');
		$product_id_quantity = $('#category_id_product_quantity_'+$product_id).val();
		$product_id_quantity++;
		$('#category_id_product_quantity_'+$product_id).val($product_id_quantity);
		//Cambiamos el precio
		units_product_price($(this),$product_id_quantity);
	});
	$('#product-list-content').on('click','.b2b-quantity-less', function(e) {
		e.preventDefault();
		$product_id = $(this).attr('data-id');
		$product_id_quantity = $('#category_id_product_quantity_'+$product_id).val();
		$product_id_quantity--;
		if($product_id_quantity < 1) {
			$product_id_quantity = 1;
		}
		$('#category_id_product_quantity_'+$product_id).val($product_id_quantity);
		//Cambiamos el precio
		units_product_price($(this),$product_id_quantity);
	});

    // Veiss Mis datos menu
    $( ".myaccount-link-yodeymab2b li" ).each(function( index ) {
        $( this ).removeClass("active");            
    });

    if ($('.alert').length >0 ){
        $('html, body').animate({
            scrollTop: $(".alert").offset().top
        }, 1000);
    }    
    if (page_name == 'history')
        $('li#history').addClass("active");
    else if (page_name == 'identity')
        $('li#identity').addClass("active");                
    else if (page_name == 'addresses')
        $('li#addresses').addClass("active");                
    else if (page_name == 'last-order')
        $('li#last-order').addClass("active");
    else if (page_name == 'invoices')
        $('li#invoices').addClass("active");
    else if (page_name == 'addresses')
        $('li#addresses').addClass("active");
    else if (page_name == 'module-b2bdevoluciones-form')
        $('li#devoluciones').addClass("active");

	// Mostrar / Ocultar contraseña
	$(".toggle-password").click(function() {

		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
		input.attr("type", "text");
		} else {
		input.attr("type", "password");
		}
	});

});
/***********************************************************************/
//@veiss: iban funcion calcular precio varias unidades
/***********************************************************************/
/*function units_product_price(element,product_quantity) {
	var price_unit = parseFloat(element.parents('.product-container').find('.price').attr('data-price'));
	var price_string = element.parents('.product-container').find('.price').html();
	var price_string_broken = price_string.split(' ');
	var price_float_def = parseFloat(price_unit * product_quantity).toFixed(2);
	var price_float_def_string = price_float_def.toString().replace('.',',') + ' ' + price_string_broken[1];
	element.parents('.product-container').find('.price').html(price_float_def_string);
}*/
function units_product_price(element,product_quantity) {
	var price_unit = parseFloat(element.parents('.product-container').find('.price').attr('data-price'));
	var price_string = element.parents('.product-container').find('.price').html();
	var price_string_broken = price_string.split(' ');
	var price_float_def = parseFloat(price_unit * product_quantity).toFixed(2);
	var price_float_def_string = price_float_def.toString().replace('.',',') + ' ' + price_string_broken[1];
	var price_float_def_florines = price_float_def.toString().replace('.',',') + ' Ft';
	var price_float_def_dinar = price_float_def.toString().replace('.',',') + ' din.';
	var price_float_def_rublo = price_float_def.toString().replace('.',',') + ' руб';
	var price_float_def_izquierda = price_float_def.toString().replace('.',',');
	var current_url = window.location.pathname;
	var current_url_string_broken = current_url.split('/');
	//@Borja: se comprueba si el precio tiene millares, ya que incluye un espacio como en Hungary, Russia o Serbia
	if (current_url_string_broken[1] == 'hungary'){
		element.parents('.product-container').find('.price').html(price_float_def_florines);
	} else if (current_url_string_broken[1] == 'serbia') {
		element.parents('.product-container').find('.price').html(price_float_def_dinar);
	} else if (current_url_string_broken[1] == 'russia') {
		element.parents('.product-container').find('.price').html(price_float_def_rublo);
	} else {
		//@Borja: se comprueba si la moneda va a la izquierda como UK, NL o Irlanda.
		if (current_url_string_broken[1] == 'united-kingdom'){
			element.parents('.product-container').find('.price').html('&pound; ' +price_float_def_izquierda);
		} else if (current_url_string_broken[1] == 'holland' || current_url_string_broken[1] == 'ireland') {
			element.parents('.product-container').find('.price').html('&euro; ' +price_float_def_izquierda);
		} else {
			element.parents('.product-container').find('.price').html(price_float_def_string);
		}
	}
}
/***********************************************************************/
//@veiss: FIN iban funcion calcular precio varias unidades
/***********************************************************************/

/***********************************************************************/
//@veiss: iban opciones de la cabecera el menú movil
/***********************************************************************/
function headerToMenuMobile () {

	var link_user_info = $('.header_user_info').html();
	var link_to_phone = $('#header_links li').html();

	var $menu_movil = $('#responsiveAccordion');

	$menu_movil.append('<li class="mobile-user-info">'+link_user_info+'</li>');
	$menu_movil.append('<li class="mobile-menu-phone"><span>'+link_to_phone+'</span></li>');

}
/***********************************************************************/
//@veiss: FIN iban opciones de la cabecera el menú movil
/***********************************************************************/

function highdpiInit()
{
	if($('.replace-2x').css('font-size') == "1px")
	{		
		var els = $("img.replace-2x").get();
		for(var i = 0; i < els.length; i++)
		{
			src = els[i].src;
			extension = src.substr( (src.lastIndexOf('.') +1) );
			src = src.replace("." + extension, "2x." + extension);
			
			var img = new Image();
			img.src = src;
			img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
		}
	}
}

function responsiveResize()
{
	if ($(document).width() <= 767 && responsiveflag == false)
	{
		accordion('enable');
	    accordionFooter('enable');
		responsiveflag = true;	
	}
	else if ($(document).width() >= 768)
	{
		accordion('disable');
		accordionFooter('disable');
	    responsiveflag = false;
	}


	if (typeof page_name != 'undefined' && in_array(page_name, ['category'])){
		resizeCatimg();
	}
}

function blockHover(status)
{
	$(document).off('mouseenter').on('mouseenter', '.product-container', function(e){

			$(this).addClass("hovered");
			$(this).find(".img_1").stop().fadeIn("fast");
			$(this).find(".availability-slidein").stop().slideUp("fast");
			$(this).find(".functional-buttons-grid").stop().slideDown("fast");
			
			
	});

	$(document).off('mouseleave').on('mouseleave', '.product-container', function(e){
			$(this).removeClass("hovered");
			$(this).find(".img_1").stop().fadeOut("fast");
			$(this).find(".functional-buttons-grid").stop().slideUp("fast");
			$(this).find(".availability-slidein").stop().slideDown("fast");
	});
}

function is_touch_device() {
	if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
		return true;
	} else {
		return false; }
};


function quick_view()
{
	$(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e) 
	{
		e.preventDefault();
		var url = this.rel;
		if (url.indexOf('?') != -1)
			url += '&';
		else
			url += '?';

		if (!!$.prototype.fancybox)
			$.fancybox({
				'padding':  0,
				'width':    1087,
				'height':   610,
				'type':     'iframe',
				'href':     url + 'content_only=1'
			});
	});
}

function bindGrid()
{

	var view = $.totalStorage('display');
	
	if (!view && (typeof displayList != 'undefined') && displayList)
		view = 'list';

	if (view && view != 'grid')
		display(view);
	else
		$('.display').find('li#grid').addClass('selected');
	
	$(document).on('click', '#grid', function(e){
		e.preventDefault();
		$('ul.product_list').animate({ opacity: 0 }, 400);
		setTimeout(function() { display('grid'); }, 400)
		$('ul.product_list').animate({ opacity: 1 }, 400);
	});

	$(document).on('click', '#list', function(e){
		e.preventDefault();
		$('ul.product_list').animate({ opacity: 0 }, 400)
		setTimeout(function() {display('list');  }, 400)
		$('ul.product_list').animate({ opacity: 1 }, 400);
	});
}

function display(view)
{
	if (view == 'list')
	{
		$('ul.product_list').removeClass('grid').addClass('list row');
		$('.product_list > li').removeClass('col-xs-12 col-ms-'+grid_size_ms2+' col-sm-'+grid_size_sm2+' col-md-'+grid_size_md2+' col-lg-'+grid_size_lg2).addClass('col-xs-12');
		$('.product_list > li').each(function(index, element) {
			html = '';
			html = '<div class="product-container"><div class="row">';
				html += '<div class="left-block col-xs-5 col-md-3"><div class="product-image-container">' + $(element).find('.left-block .product_img_link')[0].outerHTML + '</div></div>';
				html += '<div class="center-block col-xs-7 col-md-6">';
					html += '<h5 itemprop="name">'+ $(element).find('h5').html() + '</h5>';
					html += '<span class="product-reference">'+ $(element).find('.product-reference').html() + '</span>';
					var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) { 
						html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">'+ rating + '</div>';
					}
					html += '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>';
					html += '<p class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
					var colorList = $(element).find('.color-list-container').html();
					if (colorList != null) {
						html += '<div class="color-list-container">'+ colorList +'</div>';
					}
					var availability = $(element).find('.availability').html();	// check : catalog mode is enabled
					if (availability != null) {
						html += '<span class="availability">'+ availability +'</span>';
					}
				html += '</div>';	
				html += '<div class="right-block col-xs-12 col-md-3"><div class="right-block-content"><div class="row">';
					var price = $(element).find('.content_price').html();       // check : catalog mode is enabled
					if (price != null) { 
						html += '<div class="content_price col-xs-6 col-md-12">'+ price + '</div>';
					}
					html += '<div class="button-container col-xs-6 col-md-12">'+ $(element).find('.button-container').html() +'</div>';
					html += '<div class="functional-buttons functional-buttons-list  col-xs-12 col-md-12 clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
				html += '</div></div>';
			html += '</div></div>';
		$(element).html(html);
		});		
		$('.display').find('li#list').addClass('selected');
		$('.display').find('li#grid').removeAttr('class');
		$.totalStorage('display', 'list');
	}
	else 
	{
		$('ul.product_list').removeClass('list').addClass('grid row');
		$('.product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-ms-'+grid_size_ms2+' col-sm-'+grid_size_sm2+' col-md-'+grid_size_md2+' col-lg-'+grid_size_lg2);
		$('.product_list > li').each(function(index, element) {
		html = '';
		html += '<div class="product-container">';
			var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
			var avatext =''
				if (availability != null) {
					avatext += '<span class="availability availability-slidein">'+ availability +'</span>';
				}
			html += '<div class="left-block"><div class="product-image-container">' + $(element).find('.left-block .product_img_link')[0].outerHTML + '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>' +  '<div class="functional-buttons functional-buttons-grid clearfix">' + $(element).find('.functional-buttons').html() + '</div>' + avatext + '</div></div>';
			html += '<div class="right-block">';
				html += '<h5 itemprop="name" class="product-name-container">'+ $(element).find('h5').html() + '</h5>';
				html += '<span class="product-reference">'+ $(element).find('.product-reference').html() + '</span>';
				var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
					if (price != null) { 
						html += '<div class="content_price">'+ price + '</div>';
					}	
				var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) { 
						html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">'+ rating + '</div>';
					}
				html += '<p itemprop="description" class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
				html += '<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" class="button-container">'+ $(element).find('.button-container').html() +'</div>';
				var colorList = $(element).find('.color-list-container').html();
				if (colorList != null) {
					html += '<div class="color-list-container">'+ colorList +'</div>';
				}
				
			html += '</div>';
		html += '</div>';		
		$(element).html(html);
		});
		$('.display').find('li#grid').addClass('selected');
		$('.display').find('li#list').removeAttr('class');
		$.totalStorage('display', 'grid');
	}	
}

function dropDown() 
{
	elementClick = '#header .current, #center-layered-nav .layered_subtitle_heading';
	elementSlide =  'ul.toogle_content';       
	activeClass = 'active';	

	$(document).on('click', elementClick, function(e){
		e.stopPropagation();
		var subUl = $(this).next(elementSlide);
		if(subUl.is(':hidden'))
		{
			subUl.show();
			$(this).addClass(activeClass);	
		}
		else
		{
			subUl.hide();
			$(this).removeClass(activeClass);
		}
		$(elementClick).not(this).next(elementSlide).hide();
		$(elementClick).not(this).removeClass(activeClass);
		e.preventDefault();	
	});

	$(document).on('click', elementSlide, function(e){
		e.stopPropagation();
	});

	$(document).on('click', function(e){
		e.stopPropagation();
		var elementHide = $(elementClick).next(elementSlide);
		$(elementHide).hide();
		$(elementClick).removeClass('active');
	});
}

function accordionFooter(status)
{
	if(status == 'enable')
	{
		$('#footer .footer-block h4').on('click', function(){
			$(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
		})
		$('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
	}
	else
	{
		$('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
		$('#footer').removeClass('accordion');
	}
}

function resizeCatimg()
{
	var div = $('.content_scene_cat_bg');
	var image = new Image;
	$(image).load(function(){
	    var width  = image.width;
	    var height = image.height;
		var ratio = parseFloat(height / width);
		var calc = Math.round(ratio * parseInt(div.outerWidth(false)));
		div.css('min-height', calc);
	});
	if (div.length) {
		image.src = div.css('background-image').replace(/url\("?|"?\)$/ig, '');
	}
}

function accordion(status)
{
	leftColumnBlocks = $('#left_column');
	if(status == 'enable')
	{
		$('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').on('click', function(){
			$(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
		})
		$('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
	}
	else
	{
		$('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
		$('#left_column, #right_column').removeClass('accordion');
	}
}

//Plugin para hacer Scroll el de prestashop no funciona en la últimas versiones de Chrome
(function( $ ) {
 
    $.fn.scrollToYodeyma = function( where ) {
 
    	var object_to_scroll = $(where);
    	var distance_to_scroll = object_to_scroll.offset().top;
    	var time_to_scroll = 1200;

    	$('html, body').animate({
    		scrollTop: distance_to_scroll
    	},time_to_scroll);
 
    };
 
}( jQuery ));