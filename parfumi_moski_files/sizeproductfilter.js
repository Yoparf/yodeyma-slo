$(document).ready(function() {
	
	paginationButton(false);
    
	// show loading
	showLoading();
	// initial request (necesario para que funcione el infinitescroll)
	madeRequest({
		'category': $('#filter-sizes').data('category'),
		'size'    : $('#volumen').val(),
		'p': 1,
	});
	
	$(document).on('click', '#filter-sizes div input', function(e){
        
		// show loading
        showLoading();
        // button styles
        setButtonsBackgrounds();

		sizeproductfilterResetAnotherFiltersModulesButtons();

        $this = $(this);
        $('#volumen').val($this.data('name'));
		
		var params = {
            'category': $('#filter-sizes').data('category'),
            'size'    : $('#volumen').val(),
            'p': 1, //$('#p').val(),
        };

        madeRequest(params);
        e.preventDefault();
    });

});

function madeRequest(params){
    // ajax call
    $.ajax({
        type: 'GET',
        url: $('#sizeproductfilter_url_ajax').find('input').val(), // + '?rand=' + new Date().getTime(),
        data: params,
        dataType: 'json',
		cache: false, // @todo see a way to use cache and to add a timestamps parameter to refresh cache each 10 minutes for example
		success: function(result)
        {
            if (result.productList) {
				$('.product_list').replaceWith(utf8_decode(result.productList));
			} else {
				$('.product_list').html('');
			}

			if ($.browser.msie) { // Fix bug with IE8 and aliasing
				$('.product_list').css('filter', '');
			}

			if (result.pagination.search(/[^\s]/) >= 0) {
				var pagination = $('<div/>').html(result.pagination)
				var pagination_bottom = $('<div/>').html(result.pagination_bottom);

				if ($('<div/>').html(pagination).find('#pagination').length) {
					$('#pagination').show();
					$('#pagination').replaceWith(pagination.find('#pagination'));
				} else {
					$('#pagination').hide();
				}

				if ($('<div/>').html(pagination_bottom).find('#pagination_bottom').length) {
					$('#pagination_bottom').show();
					$('#pagination_bottom').replaceWith(pagination_bottom.find('#pagination_bottom'));
				} else {
					$('#pagination_bottom').hide();
				}

			} else {
				$('#pagination').hide();
				$('#pagination_bottom').hide();
			}

			paginationButton(result.nbRenderedProducts, result.nbAskedProducts);

            // reside
            resizeProductContainers();

            // hide loading
            hideLoading();


			// url 
			current_friendly_url = result.current_friendly_url;
			// Currente page url
			if (typeof(current_friendly_url) === 'undefined') {
				current_friendly_url = '#';
			}
			if (current_friendly_url == '#') {
				current_friendly_url = '#/';
			}
			window.location.href = current_friendly_url;
			if (current_friendly_url != '#/show-all') {
				$('div.clearfix.selector1').show();
			}

            // Scroll to top
            $('html, body').animate({
                scrollTop: $("#page").offset().top
            }, 1000);
        }
    });
}

function setButtonsBackgrounds() {
    var button = $('.filter-button .radio span').closest('.filter-button');
	button.css('background-color', 'white');
	button.children('label').css('color', '#000000');
	
    var checkedButton = $('.filter-button .radio span.checked').closest('.filter-button')
	checkedButton.css('background-color', '#000000');
    checkedButton.children('label').css('color', 'white');
}

function showLoading() {
    $('.product_list').prepend($('#sizeproductfilter_ajax_loader').html());
    $('.product_list').css('opacity', '0.7');
}

function hideLoading() {
    $('.product_list').css('opacity', '1');
}

function resizeProductContainers() {
    setTimeout(function () {
        var heights = $(".product_list .ajax_block_product").map(function () {
            return $(this).height();
        }).get();
		var maxHeight = Math.max.apply(null, heights);
		$(".product_list .product-container").height(maxHeight);
    }, 300);
}

function paginationButton(nbProductsIn) {
	if (typeof(current_friendly_url) === 'undefined')
		current_friendly_url = '#';

	$('div.pagination a').not(':hidden').each(function () {
		var page = 1;
        var href = $(this).attr('href');
        if (href.search('&p=') != -1) {
			page = href.replace(/^.*&p=(\d+).*$/, '$1');
		} else if (href.search('\\?p=') != -1) {
			page = href.replace(/^.*\\?p=(\d+).*$/, '$1');
		}

		var location = window.location.href.replace(/#.*$/, '');
		$(this).attr('href', location+current_friendly_url.replace(/\/page-(\d+)/, '')+'/page-'+page);
	});

	$('div.pagination li').not('.current, .disabled, .truncate').each(function () {
		var nbPage = 0;
		if ($(this).hasClass('pagination_next'))
			nbPage = parseInt($('div.pagination li.current').children().children().html())+ 1;
		else if ($(this).hasClass('pagination_previous'))
			nbPage = parseInt($('div.pagination li.current').children().children().html())- 1;

		$(this).children().children().on('click', function(e)
		{
			e.preventDefault();
			if (nbPage == 0) {
				p = parseInt($(this).html()) + parseInt(nbPage);
			} else {
				p = nbPage;
			}
			
			params = {
				'p': p,
				'category': $('#filter-sizes').data('category'),
				'size'    : $('#volumen').val()
			};
			
			// show loading
			showLoading();
			madeRequest(params);
			nbPage = 0;
		});
	});

	//product count refresh
	if(nbProductsIn!=false){
		if(isNaN(nbProductsIn) == 0) {
			// add variables
			var productCountRow = $('.product-count').html();
			var nbPage = parseInt($('div.pagination li.current').children().children().html());
			var nb_products = nbProductsIn;

			if ($('#nb_item option:selected').length == 0)
				var nbPerPage = nb_products;
			else
				var nbPerPage = parseInt($('#nb_item option:selected').val());

			isNaN(nbPage) ? nbPage = 1 : nbPage = nbPage;
			nbPerPage*nbPage < nb_products ? productShowing = nbPerPage*nbPage :productShowing = (nbPerPage*nbPage-nb_products-nbPerPage*nbPage)*-1;
			nbPage==1 ? productShowingStart=1 : productShowingStart=nbPerPage*nbPage-nbPerPage+1;


			//insert values into a .product-count
			productCountRow = $.trim(productCountRow);
			productCountRow = productCountRow.split(' ');
			productCountRow[1] = productShowingStart;
			productCountRow[3] = productShowing;
			productCountRow[5] = nb_products;
			productCountRow = productCountRow.join(' ');
			$('.product-count').html(productCountRow);
			$('.product-count').show();
		}
		else {
			$('.product-count').hide();
		}
	}
}

/**
 * Copy of the php function utf8_decode() (blocklayered.js)
 */
 function utf8_decode (utfstr) {
	var res = '';
	for (var i = 0; i < utfstr.length;) {
		var c = utfstr.charCodeAt(i);

		if (c < 128)
		{
			res += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224))
		{
			var c1 = utfstr.charCodeAt(i+1);
			res += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
			i += 2;
		}
		else
		{
			var c1 = utfstr.charCodeAt(i+1);
			var c2 = utfstr.charCodeAt(i+2);
			res += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
			i += 3;
		}
	}
	return res;
}

function sizeproductfilterResetAnotherFiltersModulesButtons() {
	if ($('#categoryproductfilter-list').length) {
		$('#categoryproductfilter-list li a ').removeClass('active');
	}
}